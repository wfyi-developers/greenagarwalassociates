import { T as TSS_SERVER_FUNCTION, y as createServerFn } from "./worker-entry-CTY6q2YU.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const FEEDS = [{
  tag: "RBI",
  url: "https://www.rbi.org.in/pressreleases_rss.xml"
}, {
  tag: "RBI",
  url: "https://www.rbi.org.in/notifications_rss.xml"
}];
const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};
function decodeEntities(input) {
  return input.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&#8377;/g, "₹").replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, "–").replace(/&#8216;|&#8217;|&lsquo;|&rsquo;/g, "'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/\s+/g, " ").trim();
}
function parseFeed(xml, tag) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const out = [];
  for (const item of items) {
    const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
    const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    if (!titleMatch) continue;
    const text = decodeEntities(titleMatch[1]);
    if (!text) continue;
    const link = linkMatch ? decodeEntities(linkMatch[1]) : "https://www.rbi.org.in";
    let label = "";
    let sortKey = 0;
    if (dateMatch) {
      const m = dateMatch[1].match(/(\d{1,2})\s+(\w{3})\s+(\d{4})/);
      if (m) {
        const day = Number(m[1]);
        const month = MONTHS[m[2]] ?? 0;
        const year = Number(m[3]);
        label = `${day} ${m[2]}`;
        sortKey = new Date(year, month, day).getTime();
      }
    }
    out.push({
      tag,
      text,
      date: label,
      link,
      ...sortKey ? {
        sortKey
      } : {}
    });
  }
  return out;
}
const getRegulatoryUpdates_createServerFn_handler = createServerRpc({
  id: "57e40e39c816a3a6f20ec8b5e05c6ec9a88f62521c3e52fc01d3438a86e1ca45",
  name: "getRegulatoryUpdates",
  filename: "src/lib/rbi-updates.ts"
}, (opts) => getRegulatoryUpdates.__executeServer(opts));
const getRegulatoryUpdates = createServerFn({
  method: "GET"
}).handler(getRegulatoryUpdates_createServerFn_handler, async () => {
  try {
    const responses = await Promise.allSettled(FEEDS.map(async (feed) => {
      const res = await fetch(feed.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (GreenAgarwal site updates)"
        }
      });
      if (!res.ok) throw new Error(`RBI feed ${feed.url} returned ${res.status}`);
      const xml = await res.text();
      return parseFeed(xml, feed.tag);
    }));
    const all = responses.flatMap((r) => r.status === "fulfilled" ? r.value : []).map((u) => u);
    all.sort((a, b) => (b.sortKey ?? 0) - (a.sortKey ?? 0));
    const seen = /* @__PURE__ */ new Set();
    const deduped = [];
    for (const u of all) {
      if (seen.has(u.text)) continue;
      seen.add(u.text);
      deduped.push({
        tag: u.tag,
        text: u.text,
        date: u.date,
        link: u.link
      });
      if (deduped.length >= 6) break;
    }
    return deduped;
  } catch {
    return [];
  }
});
export {
  getRegulatoryUpdates_createServerFn_handler
};

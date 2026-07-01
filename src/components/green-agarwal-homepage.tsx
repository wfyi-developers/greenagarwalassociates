import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRegulatoryUpdates, type RegulatoryUpdate } from '@/lib/rbi-updates';
import {
  Phone, Mail, Clock, Linkedin, ArrowRight, ArrowUpRight, MapPin, X,
  Briefcase, Calculator, ShieldCheck, FileText, Building2, BookOpen,
  ClipboardCheck, Award, LifeBuoy, Factory, Rocket, ShoppingBag,
  HeartPulse, UserSquare2, HandHeart, Home, CheckCircle2, Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Green_Agarwal from '@/assets/Green_Agarwal.avif';
import greenagarwal from '@/assets/greenagarwal.jpg';
import green_agarwal from '@/assets/green_agarwal.jpg';
import officeInterior from '@/assets/office-interior.jpg';
import teamWorking from '@/assets/team-working.jpg';
import teamImage4 from '@/assets/team-image4.jpg';
import teamMeeting from '@/assets/team-meeting.jpg';
import ledgerDetail from '@/assets/ledger-detail.jpg';
import teamImage from '@/assets/team-image.jpg';

const dotGridBg = {
  backgroundImage: `radial-gradient(circle, var(--ga-line) 1.2px, transparent 1.2px)`,
  backgroundSize: '24px 24px',
};

const sans = { fontFamily: "'Inter', system-ui, sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

const services = [
  { icon: Receipt, title: 'ITR Filing', desc: 'Accurate and timely income tax return filing for individuals, businesses and professionals.' },
  { icon: Briefcase, title: 'Financial Advisory', desc: 'Strategic guidance on capital structure, investments and long-term financial planning.' },
  { icon: Calculator, title: 'Tax Planning & Compliance', desc: 'Direct and indirect tax planning aligned with current legislation and your business goals.' },
  { icon: ShieldCheck, title: 'Audit & Assurance', desc: 'Statutory, internal and tax audits conducted with rigour and professional independence.' },
  { icon: FileText, title: 'GST Services', desc: 'Registration, return filing, reconciliation and representation across GST matters.' },
  { icon: Building2, title: 'Company Formation', desc: 'Incorporation of companies, LLPs and partnerships with full ROC compliance support.' },
  { icon: BookOpen, title: 'Accounting', desc: 'Accurate, timely books of account maintained to statutory and management standards.' },
  { icon: ClipboardCheck, title: 'Bookkeeping', desc: 'Day-to-day transaction recording, reconciliation and MIS for businesses of every size.' },
  { icon: Award, title: 'Certification', desc: 'Statutory certifications and attestations issued by qualified Chartered Accountants.' },
  { icon: LifeBuoy, title: 'Support Services', desc: 'Ongoing compliance, advisory and representation as your business evolves.' },
];

const industries = [
  { icon: Factory, name: 'Manufacturing' },
  { icon: Rocket, name: 'Startups' },
  { icon: ShoppingBag, name: 'Retail' },
  { icon: HeartPulse, name: 'Healthcare' },
  { icon: UserSquare2, name: 'Professionals' },
  { icon: HandHeart, name: 'NGOs' },
  { icon: Home, name: 'Real Estate' },
];

const strengths = [
  { title: 'Personalised Advisory', desc: 'Every engagement is led by a partner who knows your business by name.' },
  { title: 'Timely Compliance', desc: 'Statutory deadlines tracked and met without reminders from your end.' },
  { title: 'Ethical Practice', desc: 'Work conducted strictly within ICAI guidelines and the Code of Ethics.' },
  { title: 'Experienced Professionals', desc: 'A team trained across taxation, audit, advisory and regulatory matters.' },
  { title: 'Transparent Communication', desc: 'Clear scope, clear fees, and proactive updates at every stage.' },
  { title: 'Technology-driven', desc: 'Modern accounting and compliance platforms for accuracy and visibility.' },
];

const process = [
  { n: '01', t: 'Understand Your Requirement', d: 'A confidential consultation to map your business, structure and objectives.' },
  { n: '02', t: 'Review Documents', d: 'Detailed review of financial records, agreements and prior filings.' },
  { n: '03', t: 'Strategic Advice', d: 'A written plan with options, implications and our recommended approach.' },
  { n: '04', t: 'Execution', d: 'Filings, audits and certifications delivered to professional standards.' },
  { n: '05', t: 'Ongoing Support', d: 'Continuous compliance, advisory and representation as you grow.' },
];

const stats = [
  { v: '500+', l: 'Clients served' },
  { v: '15+', l: 'Years of practice' },
  { v: '1,000+', l: 'Assignments completed' },
  { v: '100%', l: 'Professional ethics' },
];

const insights = [
  {
    cat: 'Income Tax',
    title: 'Relief under section 157',
    excerpt: 'Salary income, by its very nature, is not always received uniformly across financial years. Employees may receive arrears of salary, gratuity, commuted pension, or other payments that relate to past years but are taxable in the year of receipt.',
    read: '7 min read',
    link: 'https://fylflix.wfyi.ai/blogs/relief-under-section-157',
  },
  {
    cat: 'Income Tax',
    title: 'ITR Filing Guide for Digital Creators, YouTubers and Affiliate Earners',
    excerpt: 'The creator economy has grown rapidly, but many digital earners still remain unsure about how to report their income in the Income Tax Return.',
    read: '7 min read',
    link: 'https://fylflix.wfyi.ai/blogs/itr-filing-guide-for-digital-creators-youtubers-and-affiliate-earners',
  },
  {
    cat: 'Income Tax',
    title: 'Income escaping assessment- where department reopens your case',
    excerpt: 'Imagine you have filed your income tax return, received your electronic acknowledgment, and thought everything was fully settled. Then, down the line, the department reopens your case.',
    read: '5 min read',
    link: 'https://fylflix.wfyi.ai/blogs/income-escaping-assessment-where-department-reopens-your-case',
  },
];

const updates: RegulatoryUpdate[] = [
  { tag: 'RBI', text: 'RBI revises priority sector lending norms for small finance banks.', date: '24 Jun', link: '' },
  { tag: 'GST', text: 'CBIC clarifies treatment of post-supply discounts under GST.', date: '22 Jun', link: '' },
  { tag: 'Income Tax', text: 'Extended due date notified for certain audit reports.', date: '20 Jun', link: '' },
  { tag: 'SEBI', text: 'SEBI updates disclosure framework for listed entities.', date: '18 Jun', link: '' },
  { tag: 'MCA', text: 'MCA introduces simplified form for small company annual filing.', date: '15 Jun', link: '' },
];

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex h-12 items-center justify-center rounded-md ${light ? 'bg-white px-1.5' : ''}`}>
        <img src="/ca-logo.webp" alt="The Institute of Chartered Accountants of India" className="h-9 w-auto object-contain" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`text-[14px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ga-ink'}`} style={display}>
          Green Agarwal
        </span>
        <span className={`text-[10px] tracking-[0.15em] uppercase ${light ? 'text-white/60' : 'text-ga-ink-muted'}`}>
          & Associates
        </span>
      </div>
    </div>
  );
}

export function GreenAgarwalHomepage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  // Live regulatory updates pulled from RBI's public RSS feeds (no API key needed).
  // Falls back to the curated static list while loading or if the feed is unreachable.
  const { data: liveUpdates } = useQuery({
    queryKey: ['rbi-updates'],
    queryFn: () => getRegulatoryUpdates(),
    staleTime: 1000 * 60 * 30,
  });
  const regulatoryUpdates = liveUpdates && liveUpdates.length > 0 ? liveUpdates : updates;

  useEffect(() => {
    if (popupDismissed) return;
    const t = setTimeout(() => setPopupOpen(true), 8000);
    return () => clearTimeout(t);
  }, [popupDismissed]);

  return (
    <div className="min-h-screen bg-ga-bg text-ga-ink" style={sans}>
      {/* Top bar */}
      <div className="hidden md:block border-b border-ga-line bg-white">
        <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-between px-6 text-[12px] text-ga-ink-muted">
          <div className="flex items-center gap-5">
            <a href="tel:+919217373942" className="flex items-center gap-1.5 hover:text-ga-forest"><Phone className="h-3 w-3" /> +91 92173 73942</a>
            <a href="mailto:info@greenagarwalandassociates.com" className="flex items-center gap-1.5 hover:text-ga-forest"><Mail className="h-3 w-3" /> info@greenagarwalandassociates.com</a>
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Mon–Sat · 10:00–19:00</span>
          </div>
          <a href="https://www.linkedin.com/in/ca-green-agarwal-634b0128/" className="flex items-center gap-1.5 hover:text-ga-forest"><Linkedin className="h-3 w-3" /> LinkedIn</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-ga-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-30 max-w-[1240px] items-center justify-between px-6">
          <a href="#" aria-label="Green Agarwal & Associates — home" className="flex items-center">
            <img
              src="/ca-logo.webp"
              alt="Green Agarwal & Associates"
              className="w-[240px] h-auto object-contain"
            />
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-[14px] text-ga-ink/80">
            <a href="#about" className="hover:text-ga-forest">About</a>
            <a href="#services" className="hover:text-ga-forest">Services</a>
            <a href="#industries" className="hover:text-ga-forest">Industries</a>
            <a href="#knowledge" className="hover:text-ga-forest">Knowledge Bank</a>
            <a href="#contact" className="hover:text-ga-forest">Contact</a>
          </nav>
          <a href="#contact">
            <Button className="rounded-full bg-ga-forest hover:bg-ga-forest-soft text-white text-[13px] h-10 px-5">
              Book consultation <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ga-line" style={dotGridBg}>
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-12 gap-12 px-6 py-16 lg:py-24">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-ga-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ga-forest">
              <span className="h-1.5 w-1.5 rounded-full bg-ga-gold" /> Chartered Accountants · since 2017
            </span>
            <h1 className="mt-6 text-[40px] sm:text-[56px] lg:text-[68px] font-normal leading-[1.05] tracking-tight text-ga-ink" style={display}>
              Financial clarity.<br />
              Professional integrity.<br />
              <span className="italic text-ga-forest">Trusted advisory.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ga-ink-muted">
              Helping businesses, entrepreneurs and individuals navigate taxation, auditing, accounting and regulatory compliance with confidence. 15+ years in practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact">
                <Button className="h-12 rounded-full bg-ga-forest text-white hover:bg-ga-forest-soft px-6 text-[14px] font-medium">
                  Book consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" className="h-12 rounded-full border-ga-line bg-white text-ga-ink hover:bg-ga-bg px-6 text-[14px] font-medium">
                  Explore services
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl border border-ga-line bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.18)]">
              <img src={green_agarwal} alt="Founding Partner, Green Agarwal & Associates" width={1024} height={1280} className="h-full w-full object-cover aspect-[4/5]" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-xl border border-ga-line bg-white px-4 py-3 shadow-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ga-forest/10 text-ga-forest">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[12px] text-ga-ink-muted">ICAI registered </div>
                <div className="text-[13px] font-medium text-ga-ink" style={display}>Independent CA firm</div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-ga-line bg-white">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-ga-line px-px">
          {['Established 2017', 'ICAI registered', 'Based in Delhi NCR', 'Business advisory', 'Tax experts', 'Audit professionals'].map(t => (
            <div key={t} className="bg-white px-4 py-5 text-center text-[12px] uppercase tracking-[0.14em] text-ga-ink-muted">{t}</div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-12 gap-12 px-6 items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-ga-line">
              <img src={teamWorking} alt="Green Agarwal & Associates office, New Delhi" width={1600} height={1100} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">About the firm</span>
            <h2 className="mt-3 text-[34px] lg:text-[44px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
              A practice built on judgement, discretion and discipline.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ga-ink-muted">
              Green Agarwal &amp; Associates is an independent Chartered Accountancy firm based in New Delhi, offering taxation, auditing, accounting, regulatory compliance, company incorporation and business advisory services. Since 2017, we have worked with businesses and professionals across multiple sectors, delivering practical financial solutions tailored to their needs.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ga-ink-muted">
              Our work is anchored in the standards set by the Institute of Chartered Accountants of India — and in a quieter principle: that clients deserve advice they can act on, explained in language they actually understand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
             
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-ga-line bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Services</span>
              <h2 className="mt-3 text-[34px] lg:text-[44px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
                A complete advisory practice<br className="hidden md:block" /> under one roof.
              </h2>
            </div>
            <p className="text-[15px] text-ga-ink-muted max-w-sm">
              From statutory compliance to long-term financial strategy, each engagement is led by a qualified Chartered Accountant.
            </p>
          </div>
          <div className="grid gap-px bg-ga-line border border-ga-line rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {services.map(s => (
              <div key={s.title} className="group bg-white p-7 transition-colors hover:bg-ga-bg">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ga-forest/10 text-ga-forest">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[19px] font-medium text-ga-ink" style={display}>{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ga-ink-muted">{s.desc}</p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-20 lg:py-28" style={dotGridBg}>
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Industries served</span>
            <h2 className="mt-3 text-[34px] lg:text-[44px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
              Sector experience that shapes our advice.
            </h2>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
            {industries.map(i => (
              <div key={i.name} className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-ga-line bg-white px-4 py-7 text-center transition-all hover:border-ga-forest/30 hover:-translate-y-0.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ga-bg text-ga-forest">
                  <i.icon className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-medium text-ga-ink">{i.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-ga-line bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-12 gap-12 px-6">
          <div className="lg:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Why Green Agarwal</span>
            <h2 className="mt-3 text-[34px] lg:text-[44px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
              Measurable strengths, not slogans.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ga-ink-muted">
              We work the way a professional firm should — quietly, thoroughly, and with the discretion your matters require.
            </p>
          </div>
          <div className="lg:col-span-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {strengths.map(s => (
              <div key={s.title} className="flex gap-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ga-forest" />
                <div>
                  <h3 className="text-[16px] font-semibold text-ga-ink">{s.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ga-ink-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
   {/* Founder */}
<section className="py-20 lg:py-28 bg-ga-bg">
  <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 px-6 items-center">
    
    {/* Text */}
    <div className="lg:col-span-5 order-2 lg:order-1">
      <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">
        Founder message
      </span>

      <h2
        className="mt-3 text-[32px] lg:text-[40px] leading-[1.1] tracking-tight text-ga-ink"
        style={display}
      >
        CA. Founding Partner
      </h2>

      <p className="mt-3 text-[14px] text-ga-ink-muted">
        FCA · B.Com (Hons) · 15+ years in practice
      </p>

      <blockquote
        className="mt-6 border-l-2 border-ga-gold pl-5 text-[17px] italic leading-relaxed text-ga-ink/90"
        style={display}
      >
        "Our role is not to translate the law for clients — it is to help them make confident decisions with it. Everything else follows from that."
      </blockquote>

      <div className="mt-7 grid grid-cols-2 gap-4 text-[13.5px]">
        <div>
          <div className="text-ga-ink-muted">Specialisation</div>
          <div className="mt-1 text-ga-ink">Direct Tax · Audit · Advisory</div>
        </div>

        <div>
          <div className="text-ga-ink-muted">Memberships</div>
          <div className="mt-1 text-ga-ink">ICAI · ICSI Affiliate</div>
        </div>
      </div>
    </div>

    {/* Images */}
    <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-[minmax(0,3fr)_minmax(0,1.8fr)] gap-4 items-stretch">
      
      <div className="min-w-0 overflow-hidden rounded-2xl border border-ga-line aspect-[4/5]">
        <img
          src={green_agarwal}
          alt="Founding partner portrait"
          width={1280}
          height={1180}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 grid grid-rows-2 gap-4">
        <div className="min-h-0 overflow-hidden rounded-2xl border border-ga-line">
          <img
            src={teamImage}
            alt="Audit work in progress"
            width={1200}
            height={1200}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-h-0 overflow-hidden rounded-2xl border border-ga-line">
          <img
            src={teamImage4}
            alt="Team review"
            width={1600}
            height={1100}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>

  </div>
</section>

      {/* Process */}
      <section className="border-y border-ga-line bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-14 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Our process</span>
            <h2 className="mt-3 text-[34px] lg:text-[44px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
              A clear path from first call to ongoing support.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <div key={p.n} className="relative">
                <div className="text-[56px] leading-none text-ga-forest/15" style={display}>{p.n}</div>
                <h3 className="mt-3 text-[17px] font-medium text-ga-ink" style={display}>{p.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ga-ink-muted">{p.d}</p>
                {i < process.length - 1 && (
                  <div className="absolute top-7 right-0 hidden lg:block h-px w-6 bg-ga-line" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ga-forest text-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 lg:grid-cols-4 gap-y-10 px-6">
          {stats.map(s => (
            <div key={s.l} className="text-center border-l border-white/15 first:border-l-0 lg:border-l">
              <div className="text-[48px] lg:text-[60px] leading-none tracking-tight" style={display}>{s.v}</div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge Bank */}
      <section id="knowledge" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Knowledge Bank</span>
              <h2 className="mt-3 text-[34px] lg:text-[44px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
                Insights, and guides<br className="hidden md:block" /> for businesses and professionals.
              </h2>
            </div>
            <a href="https://fylflix.wfyi.ai/blogs" className="text-[13px] font-medium text-ga-forest inline-flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((p) => (
              <a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-ga-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ga-forest/10 text-ga-forest">
                  <FileText className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[19px] leading-snug text-ga-ink" style={display}>{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ga-ink-muted line-clamp-4">{p.excerpt}</p>
                <div className="mt-auto pt-6 flex items-center justify-between text-[12.5px] text-ga-ink-muted border-t border-ga-line/70">
                  <span className="inline-flex items-center gap-1.5 mt-4"><Clock className="h-3.5 w-3.5" /> {p.read}</span>
                  <span className="mt-4 text-ga-forest font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Read <ArrowRight className="h-3 w-3" /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory updates */}
      <section className="border-y border-ga-line bg-ga-bg py-20 lg:py-28" style={dotGridBg}>
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Latest regulatory updates</span>
            <h2 className="mt-3 text-[34px] lg:text-[44px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
              What changed this fortnight.
            </h2>
            <p className="mt-4 text-[14px] text-ga-ink-muted">
              Pulled live from the Reserve Bank of India's official press release and notification feeds.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-ga-line bg-white divide-y divide-ga-line">
            {regulatoryUpdates.map(u => (
              <a
                href={u.link || '#'}
                target={u.link ? '_blank' : undefined}
                rel={u.link ? 'noopener noreferrer' : undefined}
                key={u.text}
                className="group flex items-start gap-5 px-6 py-5 hover:bg-ga-bg transition-colors"
              >
                <span className="mt-0.5 inline-flex h-6 min-w-[64px] items-center justify-center rounded-full bg-ga-forest/10 px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ga-forest">
                  {u.tag}
                </span>
                <p className="flex-1 text-[15px] leading-relaxed text-ga-ink">{u.text}</p>
                <span className="hidden sm:block text-[12px] text-ga-ink-muted whitespace-nowrap">{u.date}</span>
                <ArrowUpRight className="h-4 w-4 text-ga-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation banner */}
      <section className="bg-ga-ink text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1.2px, transparent 1.2px)`, backgroundSize: '24px 24px' }} />
        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          <h2 className="text-[36px] lg:text-[52px] leading-[1.1] tracking-tight" style={display}>
            Need professional financial guidance?
          </h2>
          <p className="mt-5 text-[16px] text-white/70 max-w-xl mx-auto">
            Schedule a confidential consultation with our Chartered Accountants. We typically respond within one business day.
          </p>
          <a href="#contact" className="mt-9 inline-block">
            <Button className="h-12 rounded-full bg-white text-ga-ink hover:bg-ga-bg px-7 text-[14px] font-medium">
              Book consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-12 gap-12 px-6">
          <div className="lg:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Contact</span>
            <h2 className="mt-3 text-[34px] lg:text-[42px] leading-[1.1] tracking-tight text-ga-ink" style={display}>
              Visit, call, or write to us.
            </h2>
            <div className="mt-8 space-y-5 text-[14.5px]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-ga-forest shrink-0" />
                <div>
                  <div className="text-ga-ink font-medium">Office</div>
                  <a
                    href="https://www.google.com/maps/place/382,+100+Feet+Rd,+Ghitorni,+New+Delhi,+Delhi+110030/@28.4947272,77.1452193,19z/data=!3m1!4b1!4m6!3m5!1s0x390d1ef6608d5a5b:0x6991790ee6f410b8!8m2!3d28.494726!4d77.145863!16s%2Fg%2F11yc1w3tmd?entry=tts&g_ep=EgoyMDI1MDkxNS4wIPu8ASoASAFQAw%3D%3D&skid=9229bd4f-68ed-43e0-9c22-0e8f5361639c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ga-ink-muted hover:text-ga-forest"
                  >
                    WFYI Technology, Shanti Swarup, Basement Floor,<br />
                    100 Feet Road, Ghitorni, New Delhi — 110030
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-ga-forest shrink-0" />
                <div>
                  <div className="text-ga-ink font-medium">Phone</div>
                  <a href="tel:+919217373942" className="text-ga-ink-muted hover:text-ga-forest">+91 92173 73942</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-ga-forest shrink-0" />
                <div>
                  <div className="text-ga-ink font-medium">Email</div>
                  <a href="mailto:info@greenagarwalandassociates.com" className="text-ga-ink-muted hover:text-ga-forest">info@greenagarwalandassociates.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-ga-forest shrink-0" />
                <div>
                  <div className="text-ga-ink font-medium">Office hours</div>
                  <div className="text-ga-ink-muted">Mon–Sat · 10:00 to 19:00 IST</div>
                </div>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-ga-line aspect-[16/9] bg-ga-bg">
              <iframe
                title="Office map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.1408%2C28.4912%2C77.1509%2C28.4982&layer=mapnik&marker=28.494726%2C77.145863"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
          <ConsultationForm className="lg:col-span-7" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ga-line bg-ga-ink text-white/80">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 md:grid-cols-4 gap-10 px-6 py-14">
          <div className="col-span-2 md:col-span-1">
            <Logo light />
            <p className="mt-4 text-[13.5px] leading-relaxed text-white/60">
              Independent Chartered Accountancy practice based in New Delhi. Member firm of the Institute of Chartered Accountants of India.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white mb-4">Quick links</div>
            <ul className="space-y-2.5 text-[13.5px] text-white/60">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#knowledge" className="hover:text-white">Knowledge Bank</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white mb-4">Services</div>
            <ul className="space-y-2.5 text-[13.5px] text-white/60">
              <li>ITR filing</li>
              <li>Tax planning &amp; compliance</li>
              <li>Audit &amp; assurance</li>
              <li>GST services</li>
              <li>Company formation</li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white mb-4">Contact</div>
            <ul className="space-y-2.5 text-[13.5px] text-white/60">
              <li>WFYI Technology, Shanti Swarup, Basement Floor, 100 Feet Road, Ghitorni, New Delhi — 110030</li>
              <li><a href="tel:+919217373942" className="hover:text-white">+91 92173 73942</a></li>
              <li><a href="mailto:info@greenagarwalandassociates.com" className="hover:text-white">info@greenagarwalandassociates.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1240px] flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-5 text-[12px] text-white/50">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span>ICAI registered firm</span>
            </div>
            <div>© {new Date().getFullYear()} Green Agarwal &amp; Associates. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a
        href="https://api.whatsapp.com/send?phone=919217373942&text=Hello%20FylFlix%20by%20WFYI%20Technology.%20I%20want%20to%20book%20my%20free%20tax%20consultation%20call%20with%20tax%20expert%20to%20plan%20my%20taxes%20and%20ITR%20Filing"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-ga-success text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>

      {/* Delayed consultation popup */}
      {popupOpen && !popupDismissed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ga-ink/40 backdrop-blur-sm px-4" onClick={() => { setPopupOpen(false); setPopupDismissed(true); }}>
          <div className="relative w-full max-w-md rounded-2xl border border-ga-line bg-white p-7 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setPopupOpen(false); setPopupDismissed(true); }}
              className="absolute right-4 top-4 text-ga-ink-muted hover:text-ga-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="text-[11px] uppercase tracking-[0.2em] text-ga-forest">Free consultation</div>
            <h3 className="mt-2 text-[24px] leading-tight text-ga-ink" style={display}>Speak with a Chartered Accountant</h3>
            <p className="mt-2 text-[14px] text-ga-ink-muted">Share your requirement and we will respond within one business day.</p>
            <PopupForm onDone={() => { setPopupOpen(false); setPopupDismissed(true); }} />
          </div>
        </div>
      )}
    </div>
  );
}

const BOOK_A_CALL_URL = 'https://fylflix-pre-production.up.railway.app/api/v1/leads/book-free-call';

async function bookACall(payload: { name: string; email: string; phone: string }) {
  const res = await fetch(BOOK_A_CALL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res;
}

function ConsultationForm({ className = '' }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ref] = useState(() => 'GA-' + Math.random().toString(36).slice(2, 8).toUpperCase());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await bookACall({ name, email, phone });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`rounded-2xl border border-ga-line bg-ga-bg p-7 lg:p-10 ${className}`}>
      <h3 className="text-[24px] leading-tight text-ga-ink" style={display}>Book a consultation</h3>
      <p className="mt-2 text-[14px] text-ga-ink-muted">All enquiries are kept strictly confidential.</p>
      {submitted ? (
        <div className="mt-6 rounded-xl border border-ga-forest/30 bg-ga-forest/5 p-5">
          <div className="flex items-center gap-2 text-ga-forest text-[14px] font-medium">
            <CheckCircle2 className="h-4 w-4" /> Request received
          </div>
        </div>
      ) : (
        <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="ga-name" className="text-[12.5px] text-ga-ink">Full name</Label>
            <Input id="ga-name" required maxLength={100} value={name} onChange={e => setName(e.target.value)} className="h-11 bg-white border-ga-line rounded-lg" />
          </div>
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="ga-phone" className="text-[12.5px] text-ga-ink">Phone</Label>
            <Input id="ga-phone" type="tel" required maxLength={20} value={phone} onChange={e => setPhone(e.target.value)} className="h-11 bg-white border-ga-line rounded-lg" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="ga-email" className="text-[12.5px] text-ga-ink">Email</Label>
            <Input id="ga-email" type="email" required maxLength={255} value={email} onChange={e => setEmail(e.target.value)} className="h-11 bg-white border-ga-line rounded-lg" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="ga-service" className="text-[12.5px] text-ga-ink">Service required</Label>
            <select id="ga-service" required className="h-11 w-full rounded-lg border border-ga-line bg-white px-3 text-[14px] text-ga-ink">
              <option value="">Select a service</option>
              {services.map(s => <option key={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="ga-msg" className="text-[12.5px] text-ga-ink">Brief description</Label>
            <textarea id="ga-msg" rows={4} maxLength={1000} className="w-full rounded-lg border border-ga-line bg-white p-3 text-[14px] text-ga-ink" />
          </div>
          {error && <p className="sm:col-span-2 text-[13px] text-red-600">{error}</p>}
          <div className="sm:col-span-2">
            <Button type="submit" disabled={submitting} className="h-12 w-full sm:w-auto rounded-full bg-ga-forest hover:bg-ga-forest-soft text-white px-7 text-[14px] disabled:opacity-60">
              {submitting ? 'Submitting…' : <>Submit request <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function PopupForm({ onDone }: { onDone: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await bookACall({ name, email, phone });
      onDone();
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
      <Input required placeholder="Full name" maxLength={100} value={name} onChange={e => setName(e.target.value)} className="h-11 border-ga-line rounded-lg" />
      <Input required type="tel" placeholder="Phone" maxLength={20} value={phone} onChange={e => setPhone(e.target.value)} className="h-11 border-ga-line rounded-lg" />
      <Input required type="email" placeholder="Email" maxLength={255} value={email} onChange={e => setEmail(e.target.value)} className="h-11 border-ga-line rounded-lg" />
      <select required className="h-11 w-full rounded-lg border border-ga-line bg-white px-3 text-[14px] text-ga-ink">
        <option value="">Service required</option>
        {services.map(s => <option key={s.title}>{s.title}</option>)}
      </select>
      {error && <p className="text-[13px] text-red-600">{error}</p>}
      <Button type="submit" disabled={submitting} className="h-11 w-full rounded-full bg-ga-forest hover:bg-ga-forest-soft text-white text-[14px] disabled:opacity-60">
        {submitting ? 'Submitting…' : 'Request consultation'}
      </Button>
    </form>
  );
}

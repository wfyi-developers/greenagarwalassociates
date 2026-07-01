import { createFileRoute } from '@tanstack/react-router';
import { GreenAgarwalHomepage } from '@/components/green-agarwal-homepage';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return <GreenAgarwalHomepage />;
}

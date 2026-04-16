import { LocaleProvider } from '@/contexts/LocaleContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}

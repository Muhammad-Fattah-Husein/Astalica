import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FabricSelector from '@/components/FabricSelector';
import Services from '@/components/Services';
import NewsSection, { ArticleItem } from '@/components/NewsSection';
import ContactSection from '@/components/ContactSection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { executeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  let initialArticles: ArticleItem[] = [];
  try {
    const result = await executeDb<ArticleItem[]>('query', 'News', null, { status: 'published' });
    if (result.success && Array.isArray(result.data)) {
      initialArticles = result.data.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  } catch (err) {
    console.error('Failed to fetch initial news on SSR:', err);
  }

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 w-full flex flex-col focus:outline-none">
        <Hero />
        <About />
        <FabricSelector />
        <Services />
        <NewsSection initialArticles={initialArticles} />
        <ContactSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

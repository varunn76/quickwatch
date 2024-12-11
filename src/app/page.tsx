import ButtonWrapper from '@/components/ButtonWrapper';
import LandingPage from '@/components/LandingPage';
import LandingPagePoster from '@/components/LandingPagePoster';
import SearchForm from '@/components/SearchForm';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <div className='overflow-x-clip bg-black-300'>
      <LandingPage query={query} />
    </div>
  );
}

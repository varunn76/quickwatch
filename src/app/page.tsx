import LandingPage from '@/components/LandingPage';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <div className='h-full overflow-x-clip bg-black-300'>
      <LandingPage query={query} />
    </div>
  );
}

export const POSTERDATA = [
  { className: 'top-[0px] left-[10px] lg:left-[120px] xl:left-[210px]' },
  {
    className:
      'top-[50px] right-[10px] md:top-[0px] lg:right-[120px] xl:right-[210px]',
  },
  {
    className:
      'top-[320px] left-[10px] md:top-[150px] md:left-[200px] lg:left-[300px] xl:top-[120px] xl:left-[520px]',
  },
  {
    className:
      'top-[380px] md:top-[150px] right-[10px] md:right-[200px] lg:right-[300px]  xl:right-[480px]',
  },
  {
    className: 'md:top-[450px]  lg:left-[100px] xl:top-[350px] xl:left-[340px]',
  },
  {
    className:
      ' md:top-[450px] lg:right-[100px] xl:top-[350px] xl:right-[300px]',
  },
  {
    className:
      ' md:top-[520px]  lg:left-[430px] xl:top-[350px] xl:left-[710px]',
  },
];

export const fetchPopular = async () => {
  const response = await fetch('/api/popular');
  if (!response.ok) {
    throw new Error(`Failed to fetch popular data: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data.results.slice(0, 10);
};

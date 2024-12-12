export const stringToSlug = (title: string) => {
  const newTitle = title.trim().replace(/\s+/g, ' ');
  const slug = newTitle
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  return slug;
};

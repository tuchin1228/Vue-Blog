export default function (content) {
  if (!content) return '';

  const contents = content.replace(/<[^>]*>/gi, '').replace(/&nbsp;/g, '，');

  if (contents.length > 50) {
    return `${contents.slice(0, 50)}...`;
  }
  return contents;
}

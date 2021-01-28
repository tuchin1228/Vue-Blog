export default function (content) {
  if (!content) return '';

  //   const contents = content.replace(/<figure>/g);
  const contents = content.replace(/<[^>]*>/gi, '').replace(/&nbsp;/g, '，');
  console.log(contents);
  //   .replace(/]*?>[\s\S]*?<\/figure>/gi, '');
  //   const contents = content.replace(/]*?>[\s\S]*?<\/figure>/gi, '');

  if (contents.length > 50) {
    return `${contents.slice(0, 50)}...`;
  }
  return contents;
}

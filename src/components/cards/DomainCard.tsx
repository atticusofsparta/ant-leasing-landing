import { useEffect, useState } from 'react';

function DomainCard({ url, domain }: { url: string; domain: string }) {
  const [image, setImage] = useState<string>(
    'https://arweave.net/DOwkxvmB8-6CthRSS1LsLP-0hAXHjYcS0y5EexyxOGs',
  );
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetaTags();
  }, [domain, url]);

  // fetch meta tags from target domain to display preview
  async function fetchMetaTags() {
    try {
      setLoading(true);
      const response = await fetch(url);
      const text = await response.text();

      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(text, 'text/html');

      const metaTags = htmlDoc.getElementsByTagName('meta');

      for (let i = 0; i < metaTags.length; i++) {
        const tag = metaTags[i];
        if (
          tag.getAttribute('property') === 'og:image' ||
          tag.getAttribute('property') === 'image'
        ) {
          setImage(tag.getAttribute('content') || '');
        }
        if (
          tag.getAttribute('property') === 'og:description' ||
          tag.getAttribute('property') === 'description'
        ) {
          setDescription(tag.getAttribute('content') || '');
        }
        if (
          tag.getAttribute('property') === 'og:title' ||
          tag.getAttribute('property') === 'title'
        ) {
          setTitle(tag.getAttribute('content') || '');
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <a
      className="flex flex-row gap-6 rounded-lg border-2 border-primary bg-foreground p-4 hover:border-matrix"
      href={url}
      target="_blank"
    >
      {loading ? (
        <></>
      ) : (
        <img alt="preview image" src={image} width="220px" height="150" />
      )}
      <div className="flex h-full flex-col gap-2">
        <span className="text-2xl text-matrix">{domain}</span>
        <span className="text-md text-secondary">{title}</span>
        <span className="text-sm text-secondary">{description}</span>
      </div>
    </a>
  );
}

export default DomainCard;

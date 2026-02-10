import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, canonical }) => {
  const siteName = "3-sonli Texnikum";

  const fullTitle = title
    ? `${title} — ${siteName}`
    : `${siteName} — Rasmiy sayt`;

  const metaImage = image || "/logo.png";
  const url = canonical || "https://texnikum3son.vercel.app/";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;

import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image }) => {
  const siteName = "Sizning Texnikum Nomi";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standart Meta teglar */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Google va Ijtimoiy tarmoqlar (Open Graph) uchun */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || "/og-image.jpg"} />
      <meta property="og:type" content="website" />

      {/* Twitter kartalari */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;

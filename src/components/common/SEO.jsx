import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image }) => {
  // 1. BU YERGA TEXNIKUMINGIZNING RASTIY NOMINI YOZING
  const siteName = "3-sonli Texnikum";

  // Sarlavha shunday ko'rinadi: "Bosh Sahifa | 3-sonli Texnikum"
  const fullTitle = `${title} | ${siteName}`;

  // Agar rasm berilmasa, avtomatik "logo.png" yoki boshqa rasmni oladi
  const defaultImage = "/logo.png"; // public papkasida logo bo'lsa
  const metaImage = image || defaultImage;

  return (
    <Helmet>
      {/* --- STANDART META TEGLAR --- */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* --- OPEN GRAPH (Facebook, Telegram, LinkedIn uchun) --- */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      {/* Sayt manzili avtomatik olinadi */}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content={siteName} />

      {/* --- TWITTER CARD (Twitter/X uchun) --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;

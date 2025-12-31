import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next"; // i18n import

const QuickLinks = () => {
  const { t } = useTranslation();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/quicklinks");
        const incomingData = res.data?.data || res.data;

        if (Array.isArray(incomingData)) {
          setLinks(incomingData);
        } else {
          setLinks([]);
        }
      } catch (err) {
        console.error("Xatolik:", err);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-10 gap-3">
        <LucideIcons.Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          {t("loading")}...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(links) && links.length > 0 ? (
          links.map((link) => {
            const IconComponent = LucideIcons[link.icon] || LucideIcons.Link;

            return (
              <a
                key={link._id}
                href={link.url}
                target={link.isExternal ? "_blank" : "_self"}
                rel="noreferrer"
                className="group flex flex-col items-center text-center p-6 rounded-3xl border border-slate-100 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon qismi - Fon ranglari olib tashlandi */}
                <div className="w-16 h-16 flex items-center justify-center mb-4 text-slate-400 group-hover:text-emerald-600 transition-colors duration-300">
                  <IconComponent size={40} strokeWidth={1.5} />
                </div>

                <h3 className="text-sm font-black text-slate-700 uppercase tracking-wide group-hover:text-emerald-600 transition-colors duration-300">
                  {link.title}
                </h3>
              </a>
            );
          })
        ) : (
          <div className="col-span-full text-center text-slate-400 py-10 font-medium italic">
            {t("no_links_available")}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickLinks;

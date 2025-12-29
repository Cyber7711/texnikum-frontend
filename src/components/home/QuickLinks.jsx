import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import * as LucideIcons from "lucide-react";

const QuickLinks = () => {
  const [links, setLinks] = useState([]); // Boshlang'ich qiymat massiv
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/quicklinks");

        // Ma'lumotni xavfsiz olish
        const incomingData = res.data?.data || res.data;

        if (Array.isArray(incomingData)) {
          setLinks(incomingData);
        } else {
          setLinks([]); // Agar massiv kelmasa, bo'sh massiv o'rnatamiz
        }
      } catch (err) {
        console.error("Xatolik:", err);
        setLinks([]); // Xato bo'lsa ham massiv bo'lib qolsin
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div className="text-center py-10">Yuklanmoqda...</div>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* links?.map - ixtiyoriy zanjirlash (optional chaining) ishlatamiz */}
          {Array.isArray(links) && links.length > 0 ? (
            links.map((link) => {
              const IconComponent = LucideIcons[link.icon] || LucideIcons.Link;

              return (
                <a
                  key={link._id}
                  href={link.url}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                </a>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Hozircha havolalar mavjud emas.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;

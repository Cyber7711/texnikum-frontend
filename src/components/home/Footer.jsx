import {
  Send,
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Bus,
  Globe,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1128] text-white py-10">
      {" "}
      {/* py-17 dan py-10 ga tushirildi (kichikroq) */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* 1-USTUN: LOGO VA IJTIMOIY TARMOQLAR (To'liq markazda) */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-[#0a1128] font-black text-xl">TEX</span>
              </div>
              <h3 className="text-sm font-bold leading-tight uppercase tracking-widest text-blue-400">
                3-SON POLITEXNIKUM
              </h3>
            </div>

            <div className="flex gap-3 mt-2">
              <SocialLink
                icon={<Send size={16} />}
                color="bg-sky-500"
                href="#"
              />
              <SocialLink
                icon={<Facebook size={16} />}
                color="bg-blue-700"
                href="#"
              />
              <SocialLink
                icon={<Instagram size={16} />}
                color="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600"
                href="#"
              />
              <SocialLink
                icon={<Youtube size={16} />}
                color="bg-red-600"
                href="#"
              />
            </div>
          </div>

          {/* 2-USTUN: BOG'LANISH (Matnlar kichraytirildi) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold mb-5 border-b border-white/10 pb-2 w-fit">
              Bog'lanish
            </h3>
            <ul className="space-y-3 text-gray-400 text-[13px]">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="text-blue-400 shrink-0" size={16} />
                <span>Samarqand viloyati, Past Darg'om tumani</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="text-blue-400 shrink-0" size={16} />
                <span>+998 77 ### ## ##</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="text-blue-400 shrink-0" size={16} />
                <a
                  href="mailto:info@texnikum.uz"
                  className="hover:text-white transition"
                >
                  info@texnikum.uz
                </a>
              </li>
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Clock className="text-blue-400 shrink-0" size={16} />
                <div>
                  <p>Ish vaqti: 08:30 - 14:00</p>
                  <p className="text-red-500/80 text-[11px] font-medium">
                    Shanba - Yakshanba dam olish
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* 3-USTUN: XARITA (Balandligi kamaytirildi) */}
          <div className="w-full h-[180px] rounded-xl overflow-hidden shadow-lg border border-white/10 opacity-80 hover:opacity-100 transition">
            <iframe
              title="TEXNIKUM MAP"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.1!2d66.9!3d39.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM2JzAwLjAiTiA2NsKwNTQnMDAuMCJF!5e0!3m2!1suz!2s!4v1620000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* COPY RIGHT (Kichikroq va o'rtada) */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
            © 2025 3-SON POLITEXNIKUM. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, color, href }) => (
  <a
    href={href}
    className={`${color} w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-md`}
  >
    {icon}
  </a>
);

export default Footer;

import {
  Send,
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-[#0a1128] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Orqa fon bezagi - Premium "Glow" effekti */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* 1-USTUN: LOGO (O'zgartirilmagan qism) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-20 h-20 mb-6  flex items-center justify-center shadow-2xl">
                <Logo />
              </div>
              <h3 className="text-sm font-bold leading-tight uppercase tracking-widest text-blue-400">
                {t("footer_school_name")}
              </h3>
            </div>

            <div className="flex gap-4">
              <SocialLink
                icon={<Send size={18} />}
                color="hover:bg-sky-500"
                href="#"
              />
              <SocialLink
                icon={<Facebook size={18} />}
                color="hover:bg-blue-600"
                href="#"
              />
              <SocialLink
                icon={<Instagram size={18} />}
                color="hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600"
                href="#"
              />
              <SocialLink
                icon={<Youtube size={18} />}
                color="hover:bg-red-600"
                href="#"
              />
            </div>
          </div>

          {/* 2-USTUN: FOYDALI HAVOLALAR (Struktura boyitildi) */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-10 italic">
              {t("useful_links") || "Foydali havolalar"}
            </h4>
            <ul className="space-y-5">
              <li>
                <FooterLink to="/news">
                  {t("nav_news") || "Yangiliklar"}
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/info?tab=docs">
                  {t("nav_docs") || "Hujjatlar"}
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/apply">
                  {t("nav_apply") || "Ariza topshirish"}
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/teachers">
                  {t("nav_teachers") || "O'qituvchilar"}
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* 3-USTUN: BOG'LANISH */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-10 italic">
              {t("contact")}
            </h4>
            <ul className="space-y-6">
              <ContactItem
                icon={<MapPin size={18} />}
                title={t("footer_address")}
              />
              <ContactItem
                icon={<Phone size={18} />}
                title="+998 77 ### ## ##"
              />
              <ContactItem icon={<Mail size={18} />} title="info@texnikum.uz" />
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-2xl text-emerald-400 border border-white/5">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                    {t("work_hours")}
                  </p>
                  <p className="text-sm font-black text-white italic tracking-tight">
                    08:30 - 17:00
                  </p>
                  <p className="text-rose-500 text-[9px] font-black uppercase tracking-tighter mt-1 italic">
                    {t("weekend_off")}
                  </p>
                </div>
              </div>
            </ul>
          </div>

          {/* 4-USTUN: XARITA */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-10 italic">
              {t("location") || "Joylashuv"}
            </h4>
            <div className="w-full h-56 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group relative bg-slate-900">
              <iframe
                title="TEXNIKUM MAP"
                // Bu yerga o'zingizning haqiqiy Google Maps embed kodingizni qo'ying
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.5357973862547!2d66.6060399!3d39.7276138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4da1230dbe72c9%3A0x2af1ecde46316d06!2sAgro%20sanoat%20kolleji!5e0!3m2!1suz!2s!4v1767535653993!5m2!1suz!2s"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "grayscale(1) invert(0.92) contrast(1.2) opacity(0.7)", // Dizaynga moslashish uchun
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-[#0a1128]/40 pointer-events-none group-hover:bg-transparent transition-all duration-700"></div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.25em] italic">
            © {new Date().getFullYear()} {t("footer_school_name")}.{" "}
            {t("all_rights_reserved")}.
          </p>
          <div className="flex items-center gap-3 px-6 py-2.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <ShieldCheck size={14} className="text-emerald-400 shadow-glow" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
              Official Website
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Yordamchi komponentlar
const SocialLink = ({ icon, color, href }) => (
  <a
    href={href}
    className={`w-11 h-11 rounded-[1.1rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-500 hover:text-white hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)] ${color}`}
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-slate-400 hover:text-emerald-400 font-black uppercase italic text-[11px] tracking-[0.15em] transition-all duration-300 flex items-center gap-3 group"
  >
    <div className="w-0 group-hover:w-5 h-[2px] bg-emerald-500 transition-all duration-500"></div>
    {children}
  </Link>
);

const ContactItem = ({ icon, title }) => (
  <li className="flex items-start gap-5 group cursor-default">
    <div className="p-3.5 bg-white/5 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 border border-white/5 shadow-inner">
      {icon}
    </div>
    <span className="text-xs font-black text-slate-300 group-hover:text-white transition-colors leading-relaxed tracking-tight italic mt-1 uppercase">
      {title}
    </span>
  </li>
);

export default Footer;

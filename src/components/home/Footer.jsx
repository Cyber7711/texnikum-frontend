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
  Landmark,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-[#0a1930] text-slate-300 pt-20 pb-8 overflow-hidden border-t border-slate-800 font-sans">
      {/* Orqa fon bezagi - Rasmiy yorug'lik */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* 1-USTUN: LOGO VA IJTIMOIY TARMOQLAR */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="mb-2 w-full flex justify-center lg:justify-start">
              <Logo />
            </div>

            <p className="text-sm font-medium leading-relaxed text-slate-400 max-w-xs">
              Sifatli ta'lim, zamonaviy kasb-hunar va porloq kelajak sari qadam.
              Biz bilan o'z yo'lingizni toping.
            </p>

            <div className="flex gap-3 pt-2">
              <SocialLink icon={<Send size={16} />} href="#" label="Telegram" />
              <SocialLink
                icon={<Facebook size={16} />}
                href="#"
                label="Facebook"
              />
              <SocialLink
                icon={<Instagram size={16} />}
                href="#"
                label="Instagram"
              />
              <SocialLink
                icon={<Youtube size={16} />}
                href="#"
                label="YouTube"
              />
            </div>
          </div>

          {/* 2-USTUN: FOYDALI HAVOLALAR */}
          <div className="flex flex-col items-center lg:items-start lg:pl-8">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white mb-6 flex flex-col gap-2">
              {t("useful_links", "FOYDALI HAVOLALAR")}
              <span className="w-8 h-1 bg-amber-400 rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <FooterLink to="/news">
                  {t("nav_news", "Yangiliklar va E'lonlar")}
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/documents">
                  {t("nav_docs", "Me'yoriy hujjatlar")}
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/apply">
                  {t("nav_apply", "Onlayn ariza topshirish")}
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/teachers">
                  {t("nav_teachers", "Pedagogik jamoa")}
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/management">
                  {t("nav_management", "Rahbariyat")}
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* 3-USTUN: BOG'LANISH */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white mb-6 flex flex-col gap-2">
              {t("contact", "BOG'LANISH")}
              <span className="w-8 h-1 bg-amber-400 rounded-full"></span>
            </h4>
            <ul className="space-y-5 w-full max-w-xs">
              <ContactItem
                icon={<MapPin size={16} />}
                title="Samarqand viloyati, Pastdarg'om tumani"
              />
              <ContactItem
                icon={<Phone size={16} />}
                title="+998 66 123 45 67"
              />
              <ContactItem icon={<Mail size={16} />} title="info@texnikum.uz" />

              <li className="flex items-start gap-4 pt-2">
                <div className="p-2.5 bg-white/5 rounded-lg text-amber-400 border border-white/5 shrink-0 mt-1">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">
                    {t("work_hours", "ISH VAQTI")}
                  </p>
                  <p className="text-sm font-bold text-white tracking-wide">
                    Dush - Juma: 08:30 - 17:00
                  </p>
                  <p className="text-slate-400 text-[10px] mt-1">
                    Shanba va Yakshanba dam olish
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* 4-USTUN: XARITA */}
          <div className="flex flex-col items-center lg:items-start w-full">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white mb-6 flex flex-col gap-2">
              {t("location", "JOYLASHUV")}
              <span className="w-8 h-1 bg-amber-400 rounded-full"></span>
            </h4>
            <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-[#0f2341] relative group">
              <iframe
                title="TEXNIKUM MAP"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789!2d66.9!3d39.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM2JzAwLjAiTiA2NsKwNTQnMDAuMCJF!5e0!3m2!1sen!2suz!4v1600000000000!5m2!1sen!2suz"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(0.8) contrast(1.1) opacity(0.9)", // Map biroz jiddiyroq ko'rinishi uchun
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            {t("footer_school_name", "3-SON TEXNIKUMI")}.{" "}
            {t("all_rights_reserved", "BARCHA HUQUQLAR HIMOYALANGAN")}.
          </p>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
              DAVLAT TA'LIM MUASSASASI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Yordamchi komponentlar
const SocialLink = ({ icon, href, label }) => (
  <a
    href={href}
    title={label}
    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-1 shadow-sm"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-slate-400 hover:text-blue-400 font-bold text-sm transition-colors duration-300 flex items-center gap-2 group"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></span>
    {children}
  </Link>
);

const ContactItem = ({ icon, title }) => (
  <li className="flex items-start gap-4">
    <div className="p-2.5 bg-white/5 rounded-lg text-blue-400 border border-white/5 shrink-0 mt-0.5">
      {icon}
    </div>
    <span className="text-sm font-medium text-slate-300 leading-snug pt-1">
      {title}
    </span>
  </li>
);

export default Footer;

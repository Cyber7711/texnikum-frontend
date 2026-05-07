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
  Maximize2, // Mapni kengaytirish belgisi
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  let clickCount = 0;
  const handleSecretEntry = () => {
    clickCount++;
    if (clickCount === 5) {
      navigate("/portal-v2-auth-gate-99");
    }
    setTimeout(() => {
      clickCount = 0;
    }, 2000);
  };

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1534.2678976930576!2d66.60365805029866!3d39.72761384494017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4da1230dbe72c9%3A0x2af1ecde46316d06!2sAgro%20sanoat%20kolleji!5e0!3m2!1suz!2s!4v1778125913190!5m2!1suz!2s";

  return (
    <footer className="relative bg-[#0a1930] text-slate-300 pt-20 pb-8 overflow-hidden border-t border-slate-800/50 font-sans">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* 1-USTUN: BRANDING */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            <Logo />
            <p className="text-sm font-medium leading-relaxed text-slate-400 text-center lg:text-left max-w-xs">
              Sifatli ta'lim, zamonaviy kasb-hunar va porloq kelajak sari qadam.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Send size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Facebook size={18} />} href="#" />
            </div>
          </div>

          {/* 2-USTUN: NAVIGATSIYA */}
          <div className="flex flex-col items-center lg:items-start lg:pl-10">
            <FooterHeader title="STRUKTURA" />
            <ul className="space-y-4">
              <FooterLink to="/news">Yangiliklar</FooterLink>
              <FooterLink to="/teachers">Pedagogik jamoa</FooterLink>
              <FooterLink to="/apply">Onlayn ariza</FooterLink>
            </ul>
          </div>

          {/* 3-USTUN: ALOQA */}
          <div className="flex flex-col items-center lg:items-start">
            <FooterHeader title="BOG'LANISH" />
            <div className="space-y-6 w-full">
              <ContactItem
                icon={<MapPin size={18} />}
                text="Pastdarg'om tumani, Samarqand"
              />
              <ContactItem
                icon={<Phone size={18} />}
                text="+998 66 123 45 67"
              />
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <Clock size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Ish vaqti
                  </span>
                </div>
                <p className="text-sm font-bold text-white">08:30 - 17:00</p>
              </div>
            </div>
          </div>

          {/* 4-USTUN: INTERAKTIV MAP */}
          <div className="flex flex-col items-center lg:items-start w-full">
            <FooterHeader title="JOYLASHUV" />
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f2341]">
              {/* Iframe o'zi interaktiv bo'ladi */}
              <iframe
                title="Google Maps Interaktiv"
                src={googleMapUrl}
                className="w-full h-full border-0 grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Map ustidagi kichik ko'rsatkich (ixtiyoriy) */}
              <div className="absolute top-3 right-3 p-2 bg-[#0a1930]/80 backdrop-blur-md rounded-lg border border-white/10 pointer-events-none">
                <Maximize2 size={14} className="text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p
            onClick={handleSecretEntry}
            className="text-[10px] text-slate-500 font-bold uppercase tracking-[2px] cursor-pointer select-none"
          >
            © {new Date().getFullYear()} 3-SON TEXNIKUMI
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 rounded-full border border-blue-500/10">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-200/70">
              Davlat muassasasi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper komponentlar o'sha-o'sha qoladi (FooterHeader, SocialLink, FooterLink, ContactItem)
const FooterHeader = ({ title }) => (
  <div className="mb-8 text-center lg:text-left">
    <h4 className="text-[11px] font-black uppercase tracking-[3px] text-white mb-2">
      {title}
    </h4>
    <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mx-auto lg:mx-0" />
  </div>
);

const SocialLink = ({ icon, href }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-slate-400 hover:text-blue-400 font-bold text-sm transition-all flex items-center gap-3"
  >
    <div className="w-1 h-1 rounded-full bg-blue-600" />
    {children}
  </Link>
);

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center gap-4">
    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-blue-400">
      {icon}
    </div>
    <span className="text-sm font-semibold text-slate-400">{text}</span>
  </div>
);

export default Footer;

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Star,
  GraduationCap,
  ImageOff,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next"; // i18n import
import axiosClient from "../../api/axiosClient";

const Teachers = () => {
  const { t, i18n } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axiosClient.get("/teachers");
        const data = res.data.data || res.data.result || res.data;
        setTeachers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const getImageUrl = (photo, fullname) => {
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    if (photo && !photo.includes("http") && photo.length > 20) {
      return `https://${CUSTOM_DOMAIN}/${photo}/-/scale_crop/600x600/smart/-/quality/smart/-/format/auto/`;
    }
    if (photo && photo.startsWith("http")) return photo;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullname
    )}&background=10b981&color=fff&size=512`;
  };

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            {t("pedagogical_team_badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6 tracking-tight">
            {t("our_teachers_title")}
          </h1>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 text-lg">{t("teachers_subtitle")}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[450px] bg-slate-100 animate-pulse rounded-[2.5rem]"
              ></div>
            ))}
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-24 text-slate-400 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <GraduationCap size={80} className="mx-auto mb-6 opacity-20" />
            <p className="text-2xl font-bold">{t("no_teachers_found")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-slate-100 overflow-hidden group"
              >
                {/* IMAGE AREA */}
                <div className="h-72 relative overflow-hidden bg-slate-50">
                  <img
                    src={getImageUrl(teacher.photo, teacher.fullname)}
                    alt={teacher.fullname}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-xl uppercase tracking-widest border border-emerald-400/20">
                      {/* Fanni tarjima qilish yoki bazadagi qiymatni ko'rsatish */}
                      {teacher.subject}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-emerald-600 transition-colors">
                    {teacher.fullname}
                  </h3>
                  <div className="flex items-center text-slate-400 text-sm mb-6">
                    <Star
                      size={16}
                      className="text-amber-400 fill-amber-400 mr-2"
                    />
                    <span className="font-semibold">
                      {teacher.experience} {t("years_experience")}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`mailto:${teacher.email}`}
                      className="flex-1 bg-slate-50 hover:bg-emerald-600 text-slate-400 hover:text-white h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-slate-100"
                    >
                      <Mail size={20} />
                    </a>
                    <a
                      href={`tel:${teacher.phone}`}
                      className="flex-1 bg-slate-50 hover:bg-blue-600 text-slate-400 hover:text-white h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-slate-100"
                    >
                      <Phone size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;

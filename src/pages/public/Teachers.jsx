import { useEffect, useState } from "react";
import { Mail, Phone, Star, GraduationCap } from "lucide-react";
import axiosClient from "../../api/axiosClient"; // Yo'lni o'zingizga moslang

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ma'lumotlarni yuklash
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axiosClient.get("/teachers");
        // Backenddan keladigan javob formatiga qarab moslashtiramiz
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

  // Rasmni aniqlash funksiyasi (Uploadcare UUID yoki UI-Avatars)
  const getImageUrl = (photo, fullname) => {
    // 1. Agar rasm Uploadcare UUID bo'lsa (bo'sh joylarsiz, uzun string)
    if (photo && !photo.includes("http") && photo.length > 20) {
      // CDN orqali rasmni 400x400 o'lchamda va qirqib olamiz (smart crop)
      return `https://ucarecdn.com/${photo}/-/scale_crop/400x400/smart/`;
    }

    // 2. Agar tayyor link bo'lsa
    if (photo && photo.startsWith("http")) {
      return photo;
    }

    // 3. Rasm bo'lmasa - Ism bosh harflaridan avatar yasash
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullname
    )}&background=0D9488&color=fff&size=256`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Sarlavha */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">
            Pedagogik Jamoamiz
          </h1>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600">
            Bizning tajribali o'qituvchilarimiz bilan tanishing
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-96 bg-slate-200 animate-pulse rounded-[2rem]"
              ></div>
            ))}
          </div>
        ) : teachers.length === 0 ? (
          /* Bo'sh holat */
          <div className="text-center py-20 text-slate-400">
            <GraduationCap size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-medium">
              O'qituvchilar ro'yxati hozircha bo'sh.
            </p>
          </div>
        ) : (
          /* Asosiy ro'yxat */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 overflow-hidden group"
              >
                {/* Rasm qismi */}
                <div className="h-64 relative overflow-hidden bg-slate-100">
                  <img
                    src={getImageUrl(teacher.photo, teacher.fullname)}
                    alt={teacher.fullname}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        teacher.fullname
                      )}&background=random`;
                    }}
                  />
                  {/* Fan nomi ustida */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider uppercase">
                      {teacher.subject || "FAN"}
                    </span>
                  </div>
                </div>

                {/* Ma'lumot qismi */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition">
                    {teacher.fullname}
                  </h3>

                  <div className="flex items-center text-slate-500 text-sm mb-5">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400 mr-1.5"
                    />
                    <span className="font-medium">
                      {teacher.experience
                        ? `${teacher.experience} yil tajriba`
                        : "Tajribali mutaxassis"}
                    </span>
                  </div>

                  {/* Aloqa tugmalari */}
                  <div className="flex space-x-2">
                    <a
                      href={`mailto:${teacher.email}`}
                      className="flex-1 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 py-2.5 rounded-xl flex justify-center transition border border-slate-100"
                      title="Email yozish"
                    >
                      <Mail size={18} />
                    </a>
                    <a
                      href={`tel:${teacher.phone}`}
                      className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 py-2.5 rounded-xl flex justify-center transition border border-slate-100"
                      title="Qo'ng'iroq qilish"
                    >
                      <Phone size={18} />
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

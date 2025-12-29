import { useEffect, useState } from "react";
import { Mail, Phone, Star, GraduationCap, Loader2 } from "lucide-react";
import axiosClient from "../../api/axiosClient";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axiosClient.get("/teachers");
        const data = res.data.result || res.data.data || res.data;
        setTeachers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Rasmni aniqlash funksiyasi
  const getImageUrl = (photo, fullname) => {
    // UUID formatini tekshirish (36 belgili standart UUID)
    const isUUID = photo && photo.length >= 32 && !photo.includes("/");

    if (isUUID) {
      // CDN linkini parametrlarsiz tekshirib ko'ring, keyin crop qo'shing
      return `https://ucarecdn.com/${photo}/-/scale_crop/400x400/smart/`;
    }

    // Agar bazada to'liq link saqlangan bo'lsa
    if (photo && photo.startsWith("http")) {
      return photo;
    }

    // Rasm bo'lmasa yoki xato bo'lsa UI-Avatars
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullname
    )}&background=random&color=fff`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight uppercase">
            Pedagogik Jamoamiz
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-96 bg-gray-200 animate-pulse rounded-3xl"
              ></div>
            ))}
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <GraduationCap size={48} className="mx-auto mb-2 opacity-50" />
            <p>O'qituvchilar ro'yxati hozircha bo'sh.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="h-64 relative overflow-hidden bg-gray-200">
                  <img
                    src={getImageUrl(
                      teacher.photo || teacher.image,
                      teacher.fullname
                    )}
                    alt={teacher.fullname}
                    onError={(e) => {
                      // Agar rasm 404 bersa, avatarga o'zgartiradi (Loop bo'lmasligi uchun)
                      if (!e.target.src.includes("ui-avatars")) {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          teacher.fullname
                        )}&background=888&color=fff`;
                      }
                    }}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {teacher.subject?.toUpperCase() || "FAN"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition">
                    {teacher.fullname}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-5">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400 mr-1.5"
                    />
                    <span className="font-medium">
                      {teacher.experience} yil tajriba
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`mailto:${teacher.email}`}
                      className="flex-1 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 py-2 rounded-xl flex justify-center transition border border-gray-100"
                    >
                      <Mail size={18} />
                    </a>
                    <a
                      href={`tel:${teacher.phone}`}
                      className="flex-1 bg-gray-50 hover:bg-green-50 text-gray-500 hover:text-green-600 py-2 rounded-xl flex justify-center transition border border-gray-100"
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

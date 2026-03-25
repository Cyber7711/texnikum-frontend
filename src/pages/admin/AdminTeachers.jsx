import { useEffect, useState } from "react";
import {
  UserPlus,
  Trash2,
  Mail,
  Phone,
  Save,
  X,
  Loader2,
  BookOpen,
  Clock,
  Edit3,
  ImagePlus,
  CheckCircle2,
  User,
  RefreshCw,
} from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const initialForm = {
    fullname: "",
    subject: "Boshqa",
    experience: "",
    email: "",
    phone: "+998",
    photo: null,
  };

  const [formData, setFormData] = useState(initialForm);

  const subjects = [
    "Matematika",
    "Fizika",
    "Informatika",
    "Tarix",
    "Ingliz tili",
    "Ona tili va adabiyot",
    "Kimyo",
    "Biologiya",
    "Jismoniy tarbiya",
    "Boshqa",
  ];

  // 1. FETCH TEACHERS
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/teachers");
      const incomingData = res.data?.data || res.data?.result || res.data;
      setTeachers(Array.isArray(incomingData) ? incomingData : []);
    } catch (err) {
      toast.error("Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // 2. PHONE VALIDATION
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value.startsWith("998")) value = "998" + value;
    value = value.substring(0, 12);

    let formatted = "+";
    if (value.length > 0) formatted += value.substring(0, 3);
    if (value.length > 3) formatted += " " + value.substring(3, 5);
    if (value.length > 5) formatted += " " + value.substring(5, 8);
    if (value.length > 8) formatted += " " + value.substring(8, 10);
    if (value.length > 10) formatted += " " + value.substring(10, 12);

    setFormData({ ...formData, phone: formatted });
  };

  // 3. IMAGE HANDLERS
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("Faqat rasm fayllari (JPG, PNG) yuklash mumkin!");
      }
      if (file.size > 5 * 1024 * 1024) {
        return toast.error("Rasm hajmi 5MB dan oshmasligi kerak!");
      }
      setFormData({ ...formData, photo: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, photo: null });
    setImagePreview(null);
  };

  // 4. EDIT CLICK
  const handleEditClick = (teacher) => {
    setIsEdit(true);
    setSelectedId(teacher._id);

    setFormData({
      fullname: teacher.fullname,
      subject: teacher.subject,
      experience: teacher.experience,
      email: teacher.email,
      phone: teacher.phone,
      photo: null,
    });

    // Barcha ehtimoliy kalitlarni aniqlash
    const existingImage =
      teacher.photoUrl || teacher.imageUrl || teacher.photo || teacher.image;
    setImagePreview(
      existingImage && existingImage.includes("http") ? existingImage : null,
    );

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 5. SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.fullname.trim().length < 5) {
      return toast.error("Iltimos, to'liq ism-sharifni kiriting");
    }

    setBtnLoading(true);

    const data = new FormData();
    data.append("fullname", formData.fullname.trim());
    data.append("subject", formData.subject);
    data.append("experience", formData.experience);
    data.append("email", formData.email.trim().toLowerCase());
    data.append("phone", formData.phone.replace(/\s/g, ""));

    // Rasm bo'lsa yuborish
    if (formData.photo) {
      // ⚠️ MUHIM: Backend qaysi nomni kutadi? Odatda 'file' yoki 'photo'
      data.append("file", formData.photo);
    }

    try {
      if (isEdit) {
        // Tahrirlash (PUT yoki PATCH)
        await axiosClient.put(`/teachers/${selectedId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Muvaffaqiyatli yangilandi");
      } else {
        // Yangi qo'shish
        await axiosClient.post("/teachers", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Yangi o'qituvchi qo'shildi");
      }
      resetForm();
      fetchTeachers();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

  // 6. DELETE HANDLER
  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatdan ham o'chirmoqchimisiz?")) return;
    try {
      await axiosClient.delete(`/teachers/${id}`);
      setTeachers((prev) => prev.filter((t) => t._id !== id));
      toast.success("O'chirildi");
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
    setFormData(initialForm);
    setImagePreview(null);
  };

  // 7. AVATAR HELPER
  const getAvatar = (teacher) => {
    const url =
      teacher.photoUrl || teacher.imageUrl || teacher.photo || teacher.image;

    // Agar haqiqiy Supabase/Tashqi URL bo'lsa, o'zini qaytaramiz
    if (url && url.includes("http")) return url;

    // Rasm bo'lmasa, Ismidan chiroyli avatar yasaymiz
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      teacher.fullname || "User",
    )}&background=10b981&color=fff&size=512`;
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* HEADER SECTION */}
      <div className="bg-[#0a1128] p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center text-white relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            Ustozlar <span className="text-emerald-500">Markazi</span>
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Jami faol ustozlar: {teachers.length}
          </div>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`relative z-10 mt-6 md:mt-0 px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl active:scale-95 flex items-center gap-3 italic ${
            showForm
              ? "bg-slate-700 text-white"
              : "bg-emerald-600 text-white hover:bg-emerald-500"
          }`}
        >
          {showForm ? <X size={18} /> : <UserPlus size={18} />}
          {showForm ? "Bekor qilish" : "Yangi xodim qo'shish"}
        </button>
      </div>

      {/* FORM SECTION */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 mb-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* LEFT SIDE: IMAGE PREVIEW */}
              <div className="lg:col-span-1 flex flex-col space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Profil surati
                </label>
                <div className="relative w-full aspect-square border-4 border-dashed border-slate-100 rounded-[2.5rem] overflow-hidden group bg-slate-50 hover:bg-emerald-50/30 hover:border-emerald-200 transition-all shadow-inner">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400?text=Rasm+Xatosi";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                        <label className="cursor-pointer p-4 bg-white text-emerald-600 rounded-2xl shadow-xl hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110">
                          <RefreshCw size={24} />
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-4 bg-white text-rose-500 rounded-2xl shadow-xl hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-6 text-center">
                      <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                        <ImagePlus size={32} />
                      </div>
                      <span className="text-sm font-black text-slate-600 uppercase tracking-widest">
                        Rasmni yuklang
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">
                        Max 5MB (JPEG, PNG)
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE: INPUTS */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    F.I.O (Ism Sharif)
                  </label>
                  <div className="relative">
                    <input
                      required
                      placeholder="Ism sharifni kiriting"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-slate-700"
                      value={formData.fullname}
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                    />
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Mutaxassislik fani
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-slate-700 cursor-pointer appearance-none"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <BookOpen
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Ish tajribasi (yil)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      required
                      placeholder="Masalan: 5"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-slate-700"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                    />
                    <Clock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Elektron pochta (ixtiyoriy)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-slate-700"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Telefon raqami
                  </label>
                  <div className="relative">
                    <input
                      required
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-black text-slate-700"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-8 border-t border-slate-100 pt-8">
              <button
                disabled={btnLoading}
                className="w-full md:w-auto px-12 py-4 bg-[#0a1128] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] italic shadow-2xl active:scale-[0.98] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
              >
                {btnLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={18} className="text-emerald-500" />
                )}
                {isEdit ? "O'zgarishlarni saqlash" : "Ustozni tizimga qo'shish"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* LIST SECTION */}
      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-emerald-500" size={48} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Ma'lumotlar yuklanmoqda...
            </span>
          </div>
        ) : teachers.length === 0 ? (
          <div className="py-32 text-center">
            <User size={64} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 font-bold uppercase tracking-widest">
              Hozircha ustozlar qo'shilmagan
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[9px] uppercase tracking-[0.3em] font-black text-slate-400 italic">
                <tr>
                  <th className="p-8">O'qituvchi / Tajriba</th>
                  <th className="p-8">Mutaxassisligi</th>
                  <th className="p-8">Aloqa Ma'lumotlari</th>
                  <th className="p-8 text-right">Boshqaruv</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {teachers.map((t) => (
                  <tr
                    key={t._id}
                    className="group hover:bg-emerald-50/10 transition-all"
                  >
                    <td className="p-8">
                      <div className="flex items-center gap-6">
                        <img
                          src={getAvatar(t)}
                          alt={t.fullname}
                          className="w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              t.fullname || "User",
                            )}&background=10b981&color=fff`;
                          }}
                        />
                        <div>
                          <div className="font-black text-slate-800 text-lg tracking-tighter italic uppercase leading-tight">
                            {t.fullname}
                          </div>
                          <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2">
                            Tajriba: {t.experience} yil
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 font-black text-[11px] uppercase italic text-slate-500">
                      <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-fit">
                        <BookOpen size={14} className="text-emerald-500" />{" "}
                        {t.subject}
                      </div>
                    </td>
                    <td className="p-8 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                          <Mail size={14} />
                        </div>
                        {t.email || "Kiritilmagan"}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-black text-slate-900">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">
                          <Phone size={14} />
                        </div>
                        {t.phone}
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(t)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
                          title="Tahrirlash"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
                          title="O'chirish"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeachers;

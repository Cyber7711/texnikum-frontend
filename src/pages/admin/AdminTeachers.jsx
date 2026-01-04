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
  UploadCloud,
  CheckCircle2,
  User,
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

  const initialForm = {
    fullname: "",
    subject: "Boshqa",
    experience: "",
    email: "",
    phone: "+998 ",
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

  // 1. MA'LUMOTLARNI YUKLASH
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

  // Telefon raqamini formatlash (+998 90 123 45 67)
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
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        if (key === "phone") {
          data.append(key, formData[key].replace(/\s/g, ""));
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    try {
      if (isEdit) {
        await axiosClient.patch(`/teachers/${selectedId}`, data);
        toast.success("Ma'lumotlar yangilandi");
      } else {
        await axiosClient.post("/teachers", data);
        toast.success("Yangi o'qituvchi qo'shildi");
      }
      resetForm();
      fetchTeachers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

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
  };

  const getImageUrl = (photo, fullname) => {
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    if (photo && !photo.includes("http")) {
      return `https://${CUSTOM_DOMAIN}/${photo}/-/scale_crop/150x150/smart/`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullname
    )}&background=random&color=fff`;
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

      {/* FORM SECTION (INTEGRATSIYA QILINDI) */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
          >
            {/* F.I.O Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                F.I.O
              </label>
              <div className="relative">
                <input
                  required
                  placeholder="Ism sharifni kiriting"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
              </div>
            </div>

            {/* Subject Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Mutaxassislik fani
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold cursor-pointer appearance-none"
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
                />
              </div>
            </div>

            {/* Experience Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Ish tajribasi (yil)
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  placeholder="Masalan: 5"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
                <Clock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Elektron pochta
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="example@mail.com"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Telefon raqami
              </label>
              <div className="relative">
                <input
                  required
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-black"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Profil surati
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.files[0] })
                  }
                />
                <label
                  htmlFor="file-upload"
                  className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl cursor-pointer border-2 border-dashed transition-all font-bold italic text-sm ${
                    formData.photo
                      ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  <UploadCloud size={20} />
                  {formData.photo ? formData.photo.name : "Rasmni yuklang"}
                </label>
              </div>
            </div>

            <button
              disabled={btnLoading}
              className="md:col-span-2 bg-[#0a1128] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] italic shadow-2xl active:scale-[0.98] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {btnLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={18} className="text-emerald-500" />
              )}
              {isEdit ? "O'zgarishlarni saqlash" : "Ustozni tizimga qo'shish"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* LIST SECTION (O'zgartirilmagan qoldi) */}
      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-emerald-500" size={48} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Ma'lumotlar yuklanmoqda...
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-[9px] uppercase tracking-[0.3em] font-black text-slate-400 italic">
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
                          src={getImageUrl(t.photo, t.fullname)}
                          alt={t.fullname}
                          className="w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-all"
                        />
                        <div>
                          <div className="font-black text-slate-800 text-lg tracking-tighter italic uppercase">
                            {t.fullname}
                          </div>
                          <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
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
                    <td className="p-8 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                        <Mail size={12} /> {t.email}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-black text-slate-900">
                        <Phone size={12} className="text-emerald-500" />{" "}
                        {t.phone}
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(t)}
                          className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          title="Tahrirlash"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
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

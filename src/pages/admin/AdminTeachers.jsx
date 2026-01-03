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

  // 2. TAHRIRLASH REJIMI (Tuzatildi: Ma'lumotlarni formaga to'liq o'tkazish)
  const handleEditClick = (teacher) => {
    setIsEdit(true);
    setSelectedId(teacher._id);
    setFormData({
      fullname: teacher.fullname,
      subject: teacher.subject,
      experience: teacher.experience,
      email: teacher.email,
      phone: teacher.phone,
      photo: null, // Rasm yangilanmaguncha null qoladi
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. SAQLASH (ADD / UPDATE integratsiyasi)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
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
      fetchTeachers(); // Ro'yxatni yangilash
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

  // 4. O'CHIRISH (Tuzatildi: State-ni darhol yangilash)
  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatdan ham o'chirmoqchimisiz?")) return;

    try {
      await axiosClient.delete(`/teachers/${id}`);
      setTeachers((prev) => prev.filter((t) => t._id !== id));
      toast.success("Muvaffaqiyatli o'chirildi");
    } catch (err) {
      toast.error("O'chirishda xatolik yuz berdi");
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
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen pb-24 font-sans">
      {/* HEADER SECTION */}
      <div className="bg-[#0a1128] p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center text-white relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            Ustozlar <span className="text-emerald-500">Markazi</span>
          </h2>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
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

      {/* FORM SECTION (ANIMATED) */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Form Inputlari (fullname, subject, experience, email, phone, photo) - Avvalgi kodingizdek qoladi */}
            {/* Faqat handleSubmit va handleEditClick tepada tuzatildi */}
            {/* ... Form inputlari ... */}

            <button
              disabled={btnLoading}
              className="md:col-span-2 bg-[#0a1128] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] italic shadow-2xl active:scale-[0.98] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {btnLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={18} className="text-emerald-500" />
              )}
              {isEdit ? "Ma'lumotlarni Yangilash" : "Ustozni Tizimga Qo'shish"}
            </button>
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

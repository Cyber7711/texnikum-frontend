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
  AlertCircle,
  FileCheck,
} from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-hot-toast";

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
      console.error("Yuklashda xato:", err);
      setTeachers([]);
      toast.error("Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // 2. TELEFON FORMATLASH
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (!input.startsWith("998")) input = "998" + input;
    input = input.substring(0, 12);
    let formatted = "+" + input.substring(0, 3);
    if (input.length > 3) formatted += " " + input.substring(3, 5);
    if (input.length > 5) formatted += " " + input.substring(5, 8);
    if (input.length > 8) formatted += " " + input.substring(8, 10);
    if (input.length > 10) formatted += " " + input.substring(10, 12);
    setFormData({ ...formData, phone: formatted });
  };

  // 3. TAHRIRLASH REJIMI
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

  const resetForm = () => {
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
    setFormData(initialForm);
  };

  // 4. SAQLASH (ADD / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("subject", formData.subject);
    data.append("experience", formData.experience);
    data.append("email", formData.email);
    data.append("phone", formData.phone.replace(/\s/g, ""));

    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      if (isEdit) {
        await axiosClient.patch(`/teachers/${selectedId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Muvaffaqiyatli yangilandi!");
      } else {
        await axiosClient.post("/teachers", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Yangi ustoz qo'shildi!");
      }
      resetForm();
      fetchTeachers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

  // 5. O'CHIRISH
  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatdan ham o'chirmoqchimisiz?")) {
      try {
        await axiosClient.delete(`/teachers/${id}`);
        setTeachers((prev) =>
          Array.isArray(prev) ? prev.filter((t) => t._id !== id) : []
        );
        toast.success("O'chirildi");
      } catch (err) {
        toast.error("O'chirishda xatolik bo'ldi");
      }
    }
  };

  const getImageUrl = (photo, fullname) => {
    const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
    if (photo && !photo.includes("http") && photo.length > 20) {
      return `https://${CUSTOM_DOMAIN}/${photo}/-/scale_crop/150x150/smart/`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullname
    )}&background=random&color=fff`;
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen pb-24">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0a1128] p-6 md:p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
            Ustozlar <span className="text-emerald-400">Markazi</span>
          </h2>
          <p className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-1">
            Jami: {teachers.length} nafar xodim
          </p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`relative z-10 mt-6 md:mt-0 w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg active:scale-95 ${
            showForm
              ? "bg-slate-700 text-white"
              : "bg-emerald-500 text-white shadow-emerald-900/20 hover:bg-emerald-400"
          }`}
        >
          {showForm ? <X size={18} /> : <UserPlus size={18} />}
          <span>{showForm ? "Yopish" : "Yangi qo'shish"}</span>
        </button>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-in zoom-in duration-300 relative overflow-hidden"
        >
          <div className="md:col-span-2 flex items-center gap-3 text-slate-900 font-black text-xl uppercase tracking-tighter italic border-b border-slate-100 pb-6">
            {isEdit ? (
              <Edit3 className="text-emerald-500" />
            ) : (
              <UserPlus className="text-emerald-500" />
            )}
            {isEdit ? "Tahrirlash" : "Yangi Ustoz"}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              F.I.O
            </label>
            <input
              required
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 rounded-2xl outline-none transition font-bold text-slate-700"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Fan
            </label>
            <select
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 rounded-2xl outline-none transition font-bold text-slate-700 cursor-pointer appearance-none"
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
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Tajriba (yil)
            </label>
            <input
              type="number"
              required
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 rounded-2xl outline-none transition font-bold text-slate-700"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 rounded-2xl outline-none transition font-bold text-slate-700"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Telefon
            </label>
            <input
              required
              className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 rounded-2xl font-black text-slate-700 outline-none transition"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Rasm
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
                className="w-full flex items-center justify-center gap-3 bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-2xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-all text-slate-500 text-sm font-bold italic"
              >
                <UploadCloud size={20} className="text-emerald-500" />
                {formData.photo ? formData.photo.name : "Rasm tanlash"}
              </label>
            </div>
          </div>

          <button
            disabled={btnLoading}
            className="md:col-span-2 bg-emerald-600 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-xs italic shadow-xl shadow-emerald-900/10 active:scale-[0.98] transition-all flex justify-center items-center space-x-2"
          >
            {btnLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            <span>{isEdit ? "Yangilash" : "Saqlash"}</span>
          </button>
        </form>
      )}

      {/* LIST SECTION (DESKTOP & MOBILE) */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2
              className="animate-spin mx-auto text-emerald-500"
              size={40}
            />
          </div>
        ) : teachers.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
            O'qituvchilar topilmadi
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                  <tr>
                    <th className="p-8">O'qituvchi</th>
                    <th className="p-8">Fan</th>
                    <th className="p-8">Aloqa</th>
                    <th className="p-8 text-right">Boshqaruv</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {teachers.map((t) => (
                    <tr
                      key={t._id}
                      className="hover:bg-emerald-50/20 transition-colors group"
                    >
                      <td className="p-8">
                        <div className="flex items-center space-x-5">
                          <img
                            src={getImageUrl(t.photo, t.fullname)}
                            alt={t.fullname}
                            className="w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white shadow-md group-hover:scale-110 transition-transform"
                          />
                          <div>
                            <div className="font-black text-slate-800 text-lg leading-tight tracking-tighter">
                              {t.fullname}
                            </div>
                            <div className="text-[10px] font-black text-emerald-600 uppercase mt-1">
                              Tajriba: {t.experience} yil
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-8 text-xs font-black uppercase italic text-slate-500">
                        <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg w-fit border border-slate-100">
                          <BookOpen size={14} className="text-emerald-500" />{" "}
                          {t.subject}
                        </span>
                      </td>
                      <td className="p-8">
                        <div className="space-y-1 text-xs font-bold text-slate-400 truncate max-w-[200px]">
                          <div className="flex items-center">
                            <Mail size={12} className="mr-2" /> {t.email}
                          </div>
                          <div className="flex items-center text-slate-700">
                            <Phone
                              size={12}
                              className="mr-2 text-emerald-500"
                            />{" "}
                            {t.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditClick(t)}
                            className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(t._id)}
                            className="bg-rose-50 text-rose-500 p-3 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
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

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden grid grid-cols-1 divide-y divide-slate-100">
              {teachers.map((t) => (
                <div
                  key={t._id}
                  className="p-6 flex flex-col space-y-5 relative"
                >
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button
                      onClick={() => handleEditClick(t)}
                      className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src={getImageUrl(t.photo, t.fullname)}
                      alt={t.fullname}
                      className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white"
                    />
                    <div>
                      <h4 className="font-black text-slate-800 text-lg leading-tight tracking-tight">
                        {t.fullname}
                      </h4>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block italic border border-emerald-100">
                        {t.subject}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                        Tajriba
                      </p>
                      <p className="text-xs font-bold text-slate-700 italic">
                        <Clock
                          size={12}
                          className="inline mr-1 text-emerald-500"
                        />{" "}
                        {t.experience} yil
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                        E-Mail
                      </p>
                      <p className="text-[10px] font-bold text-slate-700 truncate">
                        {t.email}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${t.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#0a1128] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-lg active:scale-95 transition-transform"
                  >
                    <Phone size={14} className="text-emerald-400" /> {t.phone}
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTeachers;

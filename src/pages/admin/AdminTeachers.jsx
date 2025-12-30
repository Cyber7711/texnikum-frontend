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
} from "lucide-react";
import axiosClient from "../../api/axiosClient";

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

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/teachers");
      const data = res.data.data || res.data.result || res.data;
      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Yuklashda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("subject", formData.subject);
    data.append("experience", formData.experience);
    data.append("email", formData.email);
    data.append("phone", formData.phone);

    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      if (isEdit) {
        await axiosClient.patch(`/teachers/${selectedId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Muvaffaqiyatli yangilandi! ✨");
      } else {
        await axiosClient.post("/teachers", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Yangi o'qituvchi qo'shildi! ✅");
      }
      resetForm();
      fetchTeachers();
    } catch (err) {
      alert(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatdan ham o'chirmoqchimisiz?")) {
      try {
        await axiosClient.delete(`/teachers/${id}`);
        setTeachers((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        alert("O'chirishda xatolik bo'ldi");
      }
    }
  };

  // --- UPLOADCARE URL (Maxsus domen bilan) ---
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            O'qituvchilar Boshqaruvi
          </h2>
          <p className="text-sm text-slate-500">
            Jami: {teachers.length} nafar xodim
          </p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-semibold transition shadow-lg ${
            showForm
              ? "bg-slate-100 text-slate-600"
              : "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700"
          }`}
        >
          {showForm ? <X size={20} /> : <UserPlus size={20} />}
          <span>{showForm ? "Yopish" : "Yangi qo'shish"}</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-50 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-300"
        >
          <div className="md:col-span-2 border-b border-slate-100 pb-4 mb-2 font-bold text-emerald-600 flex items-center gap-2">
            {isEdit ? <Edit3 size={24} /> : <UserPlus size={24} />}{" "}
            {isEdit ? "Tahrirlash" : "Yangi qo'shish"}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              F.I.O
            </label>
            <input
              required
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-emerald-500 transition"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Fani
            </label>
            <select
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-emerald-500 transition"
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
            <label className="text-xs font-bold text-slate-500 uppercase">
              Tajriba (yil)
            </label>
            <input
              type="number"
              required
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-emerald-500 transition"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-emerald-500 transition"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Telefon
            </label>
            <input
              required
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-mono outline-none focus:border-emerald-500 transition"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">
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
                className="w-full flex items-center justify-center gap-2 bg-slate-50 border-2 border-dashed border-slate-300 p-3 rounded-xl cursor-pointer hover:bg-emerald-50 transition text-slate-500 text-sm"
              >
                <UploadCloud size={20} />{" "}
                {formData.photo ? formData.photo.name : "Rasm tanlash"}
              </label>
            </div>
          </div>

          <button
            disabled={btnLoading}
            className="md:col-span-2 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 disabled:bg-slate-400 transition flex justify-center items-center space-x-2"
          >
            {btnLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={20} />
            )}{" "}
            <span>SAQLASH</span>
          </button>
        </form>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="p-5">O'qituvchi</th>
                <th className="p-5">Fan</th>
                <th className="p-5">Aloqa</th>
                <th className="p-5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-emerald-500"
                      size={40}
                    />
                  </td>
                </tr>
              ) : (
                teachers.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-emerald-50/30 transition group"
                  >
                    <td className="p-5 flex items-center space-x-4">
                      <img
                        src={getImageUrl(t.photo, t.fullname)}
                        alt={t.fullname}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-bold text-slate-800">
                          {t.fullname}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ID: {t._id.slice(-6)}
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="text-emerald-600 font-bold flex items-center text-xs uppercase">
                        <BookOpen size={12} className="mr-1.5" /> {t.subject}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center">
                        <Clock size={12} className="mr-1.5" /> {t.experience}{" "}
                        yil
                      </div>
                    </td>
                    <td className="p-5 space-y-1 text-xs">
                      <div className="flex items-center text-slate-600">
                        <Mail size={14} className="mr-2" /> {t.email}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Phone size={14} className="mr-2" /> {t.phone}
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(t)}
                          className="text-blue-500 p-2 hover:bg-blue-50 rounded-xl transition"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="text-red-500 p-2 hover:bg-red-50 rounded-xl transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;

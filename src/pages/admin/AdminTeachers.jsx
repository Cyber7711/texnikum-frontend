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
} from "lucide-react";
import axiosClient from "../../api/axiosClient";

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    subject: "Boshqa",
    experience: "",
    email: "",
    phone: "+998 ",
    photo: null,
  });

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

  // 1. Ma'lumotlarni yuklash
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/teachers");
      const data = res.data.result || res.data.data || res.data;
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

  // 2. Telefon formatlash
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (!input.startsWith("998")) input = "998" + input;
    input = input.substring(0, 12);
    let formatted =
      "+" +
      input.substring(0, 3) +
      (input.length > 3 ? " " + input.substring(3, 5) : "") +
      (input.length > 5 ? " " + input.substring(5, 8) : "") +
      (input.length > 8 ? " " + input.substring(8, 10) : "") +
      (input.length > 10 ? " " + input.substring(10, 12) : "");
    setFormData({ ...formData, phone: formatted });
  };

  // 3. Tahrirlashni boshlash (Formani to'ldirish)
  const handleEditClick = (teacher) => {
    setIsEdit(true);
    setSelectedId(teacher._id);
    setFormData({
      fullname: teacher.fullname,
      subject: teacher.subject,
      experience: teacher.experience,
      email: teacher.email,
      phone: teacher.phone,
      photo: null, // Rasm tanlanmaguncha null bo'ladi
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. Formani tozalash va yopish
  const resetForm = () => {
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
    setFormData({
      fullname: "",
      subject: "Boshqa",
      experience: "",
      email: "",
      phone: "+998 ",
      photo: null,
    });
  };

  // 5. Saqlash (Create yoki Update)
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
        alert("Ma'lumotlar yangilandi! ✨");
      } else {
        await axiosClient.post("/teachers", data);
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

  // 6. O'chirish
  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatdan ham o'chirmoqchimisiz?")) {
      try {
        await axiosClient.delete(`/teachers/${id}`);
        setTeachers((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        alert("O'chirib bo'lmadi");
      }
    }
  };

  // 7. Rasm URL yordamchisi
  const getImageUrl = (photo, fullname) => {
    if (photo && photo.length >= 32 && !photo.includes("/")) {
      return `https://ucarecdn.com/${photo}/-/scale_crop/100x100/smart/`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullname
    )}&background=random&color=fff`;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">O'qituvchilar</h2>
          <p className="text-sm text-gray-500">Jami: {teachers.length} nafar</p>
        </div>
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-semibold transition ${
            showForm
              ? "bg-gray-100 text-gray-600"
              : "bg-blue-600 text-white shadow-lg shadow-blue-200"
          }`}
        >
          {showForm ? <X size={20} /> : <UserPlus size={20} />}
          <span>{showForm ? "Yopish" : "Yangi qo'shish"}</span>
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-300"
        >
          <div className="md:col-span-2 border-b pb-4 mb-2">
            <h3 className="text-lg font-bold text-blue-600">
              {isEdit
                ? "O'qituvchini tahrirlash"
                : "Yangi o'qituvchi ma'lumotlari"}
            </h3>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              To'liq ism (F.I.O)
            </label>
            <input
              required
              className="w-full border-gray-200 border p-3 rounded-xl outline-none focus:border-blue-500 transition"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Fani
            </label>
            <select
              className="w-full border-gray-200 border p-3 rounded-xl outline-none focus:border-blue-500 transition"
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
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Tajriba (yil)
            </label>
            <input
              type="number"
              required
              className="w-full border-gray-200 border p-3 rounded-xl outline-none focus:border-blue-500 transition"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border-gray-200 border p-3 rounded-xl outline-none focus:border-blue-500 transition"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Telefon
            </label>
            <input
              required
              className="w-full border-gray-200 border p-3 rounded-xl outline-none font-mono focus:border-blue-500 transition"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Rasm {isEdit && "(O'zgartirish ixtiyoriy)"}
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border-gray-200 border p-2 rounded-xl text-sm"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files[0] })
              }
            />
          </div>
          <button
            disabled={btnLoading}
            className="md:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition flex justify-center items-center space-x-2"
          >
            {btnLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            <span>
              {isEdit ? "O'ZGARISHLARNI SAQLASH" : "O'QITUVCHINI QO'SHISH"}
            </span>
          </button>
        </form>
      )}

      {/* List Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
              <tr>
                <th className="p-5">O'qituvchi</th>
                <th className="p-5">Yo'nalishi</th>
                <th className="p-5">Aloqa</th>
                <th className="p-5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-blue-500"
                      size={32}
                    />
                  </td>
                </tr>
              ) : (
                teachers.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-blue-50/30 transition group"
                  >
                    <td className="p-5 flex items-center space-x-4">
                      <img
                        src={getImageUrl(t.photo, t.fullname)}
                        alt={t.fullname}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-bold text-gray-800">
                          {t.fullname}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          ID: {t._id.slice(-6)}
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="text-blue-600 font-bold flex items-center">
                        <BookOpen size={14} className="mr-1.5" /> {t.subject}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1 flex items-center">
                        <Clock size={12} className="mr-1.5" /> {t.experience}{" "}
                        yil tajriba
                      </div>
                    </td>
                    <td className="p-5 space-y-1 text-xs">
                      <div className="flex items-center text-gray-600">
                        <Mail size={12} className="mr-2" /> {t.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone size={12} className="mr-2" /> {t.phone}
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(t)}
                          className="text-blue-500 hover:bg-blue-100 p-2 rounded-xl transition"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="text-red-400 hover:bg-red-100 p-2 rounded-xl transition"
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

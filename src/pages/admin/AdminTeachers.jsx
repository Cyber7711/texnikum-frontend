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

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/teachers");
      setTeachers(Array.isArray(res.data?.data) ? res.data.data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

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
    setFormData({ ...teacher, photo: null });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(
          key,
          key === "phone" ? formData[key].replace(/\s/g, "") : formData[key],
        );
      }
    });

    try {
      if (isEdit) {
        await axiosClient.patch(`/teachers/${selectedId}`, data);
        toast.success("Yangilandi");
      } else {
        await axiosClient.post("/teachers", data);
        toast.success("Qo'shildi");
      }
      resetForm();
      fetchTeachers();
    } catch (err) {
      toast.error("Xatolik");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirmoqchimisiz?")) return;
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

  const getAvatar = (t) => {
    if (t.photoUrl) return t.photoUrl; // Backenddan kelgan toza URL
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(t.fullname)}&background=10b981&color=fff`;
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* ... Header va Form (xuddi siznikidek) ... */}
      <div className="bg-[#0a1128] p-8 rounded-[2.5rem] shadow-2xl flex justify-between items-center text-white">
        <h2 className="text-3xl font-black uppercase italic">
          Ustozlar Markazi
        </h2>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="bg-emerald-600 px-8 py-4 rounded-2xl font-black uppercase text-xs"
        >
          Yangi qo'shish
        </button>
      </div>

      <AnimatePresence>
        {/* Form xuddi siznikidek. Rasm yuklashda <input type="file" ... /> ishlab turibdi */}
      </AnimatePresence>

      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden mt-8">
        <table className="w-full text-left">
          <tbody className="divide-y divide-slate-50">
            {teachers.map((t) => (
              <tr key={t._id} className="hover:bg-emerald-50/10 transition-all">
                <td className="p-8">
                  <div className="flex items-center gap-6">
                    <img
                      src={getAvatar(t)}
                      alt={t.fullname}
                      className="w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <div className="font-black text-slate-800 text-lg uppercase italic">
                        {t.fullname}
                      </div>
                      <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                        Tajriba: {t.experience} yil
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-8 text-right">
                  <button
                    onClick={() => handleEditClick(t)}
                    className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl mx-2"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-3 bg-rose-50 text-rose-500 rounded-2xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminTeachers;

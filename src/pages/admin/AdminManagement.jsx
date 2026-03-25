import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  X,
  Loader2,
  ImageIcon,
  Users,
  Building2,
  BadgeCheck,
  FileText,
  Crown,
  Shield,
  Briefcase,
  Pencil,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import managementApi from "../../api/managementApi";
import axiosClient from "../../api/axiosClient";

const ICONS = [
  { key: "Users", label: "Kadrlar", Icon: Users },
  { key: "Building2", label: "Hisobchi", Icon: Building2 },
  { key: "BadgeCheck", label: "Yurist", Icon: BadgeCheck },
  { key: "FileText", label: "Matbuot", Icon: FileText },
];

const ROLES = [
  { key: "director", label: "Direktor", Icon: Crown },
  { key: "deputy", label: "O‘rinbosar", Icon: Shield },
  { key: "head", label: "Bo‘lim boshlig‘i", Icon: Briefcase },
];

const emptyForm = {
  _id: null,
  name: "",
  position: "",
  role: "deputy",
  phone: "",
  email: "",
  reception: "",
  bio: "",
  education: "",
  experience: "",
  iconKey: "Users",
  order: 0,
  image: null,
};

export default function AdminManagement() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await managementApi.getAll();
      setList(res.data?.data || []);
    } catch (e) {
      toast.error("Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const grouped = useMemo(() => {
    return {
      director: list.filter((x) => x.role === "director"),
      deputies: list
        .filter((x) => x.role === "deputy")
        .sort((a, b) => a.order - b.order),
      heads: list
        .filter((x) => x.role === "head")
        .sort((a, b) => a.order - b.order),
    };
  }, [list]);

  const handleOpenCreate = () => {
    setForm(emptyForm);
    setPreview(null);
    setIsOpen(true);
  };

  const handleOpenEdit = (leader) => {
    setForm({
      ...emptyForm,
      ...leader,
      phone: leader.phone || "",
      email: leader.email || "",
      reception: leader.reception || "",
      bio: leader.bio || "",
      education: leader.education || "",
      image: null,
    });

    const existingImage = leader.imageUrl || leader.photoUrl || leader.image;
    setPreview(
      existingImage && existingImage.includes("http") ? existingImage : null,
    );
    setIsOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("Faqat rasm fayllari (JPG, PNG) yuklash mumkin!");
      }
      if (file.size > 5 * 1024 * 1024) {
        return toast.error("Rasm hajmi 5MB dan oshmasligi kerak!");
      }
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Agar umuman o'chirib tashlasa, bo'sh qoldiramiz
    if (value.length === 0) {
      setForm({ ...form, phone: "" });
      return;
    }

    if (!value.startsWith("998")) value = "998" + value;
    value = value.substring(0, 12);

    let formatted = "+";
    if (value.length > 0) formatted += value.substring(0, 3);
    if (value.length > 3) formatted += " " + value.substring(3, 5);
    if (value.length > 5) formatted += " " + value.substring(5, 8);
    if (value.length > 8) formatted += " " + value.substring(8, 10);
    if (value.length > 10) formatted += " " + value.substring(10, 12);

    setForm({ ...form, phone: formatted });
  };

  const handleNumberChange = (e, field) => {
    const val = e.target.value;
    if (val === "") {
      setForm({ ...form, [field]: "" });
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      setForm({ ...form, [field]: num });
    }
  };

  // --- VALIDATSIYA (YUMSHATILGAN VA TO'G'RILANGAN) ---
  const validateForm = () => {
    const name = form.name.trim();
    const position = form.position.trim();
    const phone = form.phone ? form.phone.replace(/\s/g, "") : "";
    const email = form.email ? form.email.trim() : "";

    if (name.length < 3) {
      toast.error("F.I.SH kamida 3 ta belgidan iborat bo'lishi kerak");
      return false;
    }

    if (position.length < 3) {
      toast.error("Lavozim to'g'ri kiritilishi shart");
      return false;
    }

    // Agar telefon kiritilgan bo'lsa, to'liqligini tekshiramiz
    if (phone.length > 0 && phone !== "+998" && phone.length < 13) {
      toast.error("Telefon raqam to'liq emas");
      return false;
    }

    // Email kiritilgan bo'lsa tekshiradi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 0 && !emailRegex.test(email)) {
      toast.error("Noto'g'ri elektron pochta formati");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);
      const fd = new FormData();

      fd.append("name", form.name.trim());
      fd.append("position", form.position.trim());
      fd.append("role", form.role);

      // Bo'sh bo'lsa yubormaymiz (orqa tomonda Unique error bermasligi uchun)
      const cleanPhone = form.phone ? form.phone.replace(/\s/g, "") : "";
      if (cleanPhone === "+998") fd.append("phone", "");
      else fd.append("phone", cleanPhone);

      fd.append("email", form.email ? form.email.trim().toLowerCase() : "");
      fd.append("reception", form.reception ? form.reception.trim() : "");
      fd.append("bio", form.bio ? form.bio.trim() : "");
      fd.append("education", form.education ? form.education.trim() : "");
      fd.append("experience", form.experience || "0");
      fd.append("iconKey", form.iconKey || "Users");
      fd.append("order", form.order || 0);

      // Backend API rasm nomi
      if (form.image) {
        fd.append("file", form.image);
      }

      if (form._id) {
        // Tahrirlash (PATCH/PUT)
        await axiosClient.put(`/management/${form._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Muvaffaqiyatli yangilandi");
      } else {
        // Yangi qo'shish
        await managementApi.create(fd);
        toast.success("Yangi rahbar qo'shildi");
      }

      setIsOpen(false);
      await fetchAll();
    } catch (error) {
      console.error("Management Submit Error:", error);
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Ushbu rahbarni o'chirishni qat'iy tasdiqlaysizmi?"))
      return;
    try {
      setDeleting(true);
      await axiosClient.delete(`/management/${form._id}`);
      toast.success("Rahbar tizimdan butunlay o'chirildi");
      setIsOpen(false);
      await fetchAll();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("O'chirishda xatolik yuz berdi");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900 pb-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r"></div>
          <h1 className="relative text-3xl font-black uppercase italic text-slate-900 bg-slate-50">
            Rahbariyat <span className="text-emerald-500">Boshqaruvi</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
            <Shield size={14} className="text-emerald-500" /> Xavfsiz boshqaruv
            paneli
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Yangi Rahbar
        </button>
      </div>

      {/* LIST CONTENT */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="animate-spin text-emerald-500" size={48} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Ma'lumotlar yuklanmoqda...
          </span>
        </div>
      ) : (
        <div className="space-y-12">
          <Section
            title="Direktor"
            roleKey="director"
            items={grouped.director}
            onEdit={handleOpenEdit}
          />
          <Section
            title="O'rinbosarlar"
            roleKey="deputy"
            items={grouped.deputies}
            onEdit={handleOpenEdit}
          />
          <Section
            title="Bo'lim Boshliqlari"
            roleKey="head"
            items={grouped.heads}
            onEdit={handleOpenEdit}
            grid
          />
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* LEFT SIDE (Image Selection) */}
              <div className="hidden md:flex md:w-5/12 bg-slate-50 p-8 border-r border-slate-100 flex-col items-center justify-center relative">
                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 absolute top-8 left-8">
                  Profil Surati
                </div>

                <label className="relative group w-56 h-56 rounded-[2rem] bg-white border-2 border-dashed border-slate-200 shadow-sm overflow-hidden flex items-center justify-center cursor-pointer hover:border-emerald-400 transition-all">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/400?text=Rasm+Xatosi")
                      }
                    />
                  ) : (
                    <div className="text-center text-slate-300 group-hover:text-emerald-400 transition-colors">
                      <ImageIcon size={64} className="mx-auto mb-2" />
                      <span className="text-[10px] font-black uppercase">
                        Rasm yuklash
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                    <Pencil size={24} className="text-white" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/jpeg, image/png, image/webp"
                  />
                </label>
                <div className="text-[9px] text-slate-400 mt-4 text-center font-medium">
                  Tavsiya etilgan formatlar: JPG, PNG <br /> Maxsimal hajm: 5MB
                </div>

                {/* Role Selector */}
                <div className="mt-8 w-full max-w-xs space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 flex items-center gap-1">
                    Daraja <span className="text-rose-500">*</span>
                  </div>
                  {ROLES.map((role) => (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => setForm({ ...form, role: role.key })}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        form.role === role.key
                          ? "bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm"
                          : "bg-white border-transparent shadow-sm text-slate-500 hover:border-slate-200"
                      }`}
                    >
                      <role.Icon size={18} />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {role.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE (Form Data) */}
              <div className="flex-1 flex flex-col h-full bg-white relative">
                <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800">
                    {form._id ? "Ma'lumotlarni tahrirlash" : "Yangi Rahbar"}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
                  <div className="bg-amber-50 border border-amber-200 rounded-[1.5rem] p-4 flex items-start gap-3">
                    <AlertCircle
                      size={18}
                      className="text-amber-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-[10px] font-medium text-amber-700 uppercase tracking-wide leading-relaxed">
                      Diqqat: Ushbu ma'lumotlar ommaviy sahifada barcha uchun
                      ko'rinadigan bo'ladi. Matnlar va aloqa vositalari
                      to'g'riligini tasdiqlang.
                    </p>
                  </div>

                  {/* Mobil uchun rasm yuklash */}
                  <div className="md:hidden flex justify-center mb-6">
                    <label className="relative w-32 h-32 rounded-[1.5rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center cursor-pointer">
                      {preview ? (
                        <img
                          src={preview}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="text-slate-300" />
                      )}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="F.I.SH (Ism Sharif)"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      placeholder="Asosiy familiya va ism..."
                      full
                      required
                    />
                    <Input
                      label="Lavozim"
                      value={form.position}
                      onChange={(v) => setForm({ ...form, position: v })}
                      placeholder="Tashkilotdagi lavozimi..."
                      full
                      required
                    />

                    <div className="col-span-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 flex items-center gap-1">
                        Telefon{" "}
                        <span className="text-emerald-500 text-[8px]">
                          (ixtiyoriy)
                        </span>
                      </div>
                      <input
                        type="tel"
                        value={form.phone ?? ""}
                        onChange={handlePhoneChange}
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                        placeholder="+998..."
                      />
                    </div>

                    <div className="col-span-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 flex items-center gap-1">
                        Email{" "}
                        <span className="text-emerald-500 text-[8px]">
                          (ixtiyoriy)
                        </span>
                      </div>
                      <input
                        type="email"
                        value={form.email ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                        placeholder="@texnikum.uz"
                      />
                    </div>

                    <Input
                      label="Qabul Vaqti"
                      value={form.reception}
                      onChange={(v) => setForm({ ...form, reception: v })}
                      placeholder="Dushanba..."
                      full
                    />
                    <Input
                      label="Ma'lumoti"
                      value={form.education}
                      onChange={(v) => setForm({ ...form, education: v })}
                      placeholder="Oliy..."
                    />

                    <div className="col-span-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                        Tajriba (Yil)
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={form.experience ?? ""}
                        onChange={(e) => handleNumberChange(e, "experience")}
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                      />
                    </div>

                    <div className="col-span-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                        Kengashdagi tartibi
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={form.order ?? 0}
                        onChange={(e) => handleNumberChange(e, "order")}
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                      />
                    </div>

                    {form.role === "head" && (
                      <div className="col-span-2 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                          Maxsus Icon
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          {ICONS.map((icon) => (
                            <button
                              key={icon.key}
                              type="button"
                              onClick={() =>
                                setForm({ ...form, iconKey: icon.key })
                              }
                              className={`p-4 rounded-xl transition-all ${
                                form.iconKey === icon.key
                                  ? "bg-white border-2 border-emerald-500 text-emerald-600 shadow-sm"
                                  : "bg-white border-2 border-transparent text-slate-400 hover:border-slate-200 shadow-sm"
                              }`}
                            >
                              <icon.Icon size={24} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="col-span-2">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                        Biografiya
                      </div>
                      <textarea
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-sm text-slate-700 resize-none h-32"
                        value={form.bio ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, bio: e.target.value })
                        }
                        placeholder="Qisqacha ma'lumot kiritishingiz mumkin..."
                      />
                    </div>
                  </div>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center justify-end gap-4 rounded-b-[3rem]">
                  {form._id ? (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleting}
                      className="text-rose-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-50 px-4 py-3 rounded-xl transition-colors mr-auto"
                    >
                      {deleting ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}{" "}
                      O'chirish
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving || !form.name || !form.position}
                    className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Save size={18} />
                    )}
                    Saqlash
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB COMPONENTS ---
const Section = ({ title, roleKey, items, onEdit, grid }) => {
  const RoleIcon = ROLES.find((r) => r.key === roleKey)?.Icon || Users;
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-[1.5rem]">
          <RoleIcon size={24} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-slate-900">
            {title}
          </h2>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {items.length} xodim
          </div>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-bold text-sm bg-slate-50/50">
          Bu bo'limga hozircha xodim qo'shilmagan
        </div>
      ) : (
        <div
          className={`grid gap-6 ${grid ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {items.map((item) => (
            <LeaderCard
              key={item._id}
              leader={item}
              onClick={() => onEdit(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const LeaderCard = ({ leader, onClick }) => {
  const imgUrl = leader.imageUrl || leader.photoUrl || null;
  const Icon = leader.iconKey
    ? ICONS.find((i) => i.key === leader.iconKey)?.Icon || Users
    : Users;

  return (
    <div
      onClick={onClick}
      className="group relative flex items-center gap-5 p-5 bg-slate-50 hover:bg-white border-2 border-transparent hover:border-emerald-500 rounded-[2rem] cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="w-20 h-20 shrink-0 rounded-[1.5rem] bg-white border border-slate-100 overflow-hidden flex items-center justify-center">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={leader.name}
            className="w-full h-full object-cover"
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/150?text=Avatar")
            }
          />
        ) : (
          <Icon className="text-slate-300" size={32} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 truncate mr-2">
            {leader.position}
          </p>
          {leader.order > 0 && (
            <span className="text-[9px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-md flex-shrink-0">
              #{leader.order}
            </span>
          )}
        </div>
        <h3 className="text-lg font-black text-slate-900 italic truncate">
          {leader.name}
        </h3>
      </div>
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-slate-900 text-white rounded-xl shadow-lg">
          <Pencil size={14} />
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  full,
  type = "text",
  required = false,
}) => (
  <div className={full ? "col-span-2" : ""}>
    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 flex items-center gap-1">
      {label}{" "}
      {required && (
        <span className="text-rose-500 text-[14px] leading-none">*</span>
      )}
    </div>
    <input
      type={type}
      className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

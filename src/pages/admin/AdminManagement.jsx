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
  Phone,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import managementApi from "../../api/managementApi";

// --- 1. CONFIG & UTILS ---
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

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.includes("http")) return image;
  const CUSTOM_DOMAIN = "5nezpc68d1.ucarecd.net";
  return `https://${CUSTOM_DOMAIN}/${image}/-/preview/500x500/-/quality/smart/-/format/auto/`;
};

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
  currentImage: null,
};

export default function AdminManagement() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState(null);

  // --- DATA LOADING ---
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

  // --- GROUPING ---
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

  // --- HANDLERS ---
  const handleOpenCreate = () => {
    setForm(emptyForm);
    setPreview(null);
    setIsOpen(true);
  };

  const handleOpenEdit = (leader) => {
    // 🛡️ FIX: Backenddan kelgan null qiymatlarni bo'sh stringga aylantiramiz
    setForm({
      ...emptyForm,
      ...leader,
      phone: leader.phone || "",
      email: leader.email || "",
      reception: leader.reception || "",
      bio: leader.bio || "",
      education: leader.education || "",
      // Qolganlari
      image: null,
      currentImage: leader.imagePreview || leader.imageUrl || leader.image,
    });
    setPreview(
      getImageUrl(leader.imagePreview || leader.imageUrl || leader.image),
    );
    setIsOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Validations
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (/^[0-9+\s()-]*$/.test(val)) setForm({ ...form, phone: val });
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

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.position.trim()) {
      toast.error("Ism va lavozim majburiy!");
      return;
    }

    try {
      setSaving(true);
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("position", form.position);
      fd.append("role", form.role);
      fd.append("phone", form.phone || "");
      fd.append("email", form.email || "");
      fd.append("reception", form.reception || "");
      fd.append("bio", form.bio || "");
      fd.append("education", form.education || "");
      fd.append("experience", form.experience || "");
      fd.append("iconKey", form.iconKey || "Users");
      fd.append("order", form.order || 0);

      if (form.image) fd.append("image", form.image);

      if (form._id) {
        await managementApi.update(form._id, fd);
        toast.success("Yangilandi");
      } else {
        await managementApi.create(fd);
        toast.success("Yaratildi");
      }

      setIsOpen(false);
      await fetchAll();
    } catch (e) {
      toast.error("Xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("O'chirmoqchimisiz?")) return;
    try {
      setDeleting(true);
      await managementApi.remove(form._id);
      toast.success("O'chirildi");
      setIsOpen(false);
      await fetchAll();
    } catch (e) {
      toast.error("Xatolik");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900 pb-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">
            Rahbariyat <span className="text-emerald-500">Boshqaruvi</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
            Jamoa a'zolarini boshqarish paneli
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="group flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform"
          />
          Yangi Rahbar
        </button>
      </div>

      {/* LIST CONTENT */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-500" size={40} />
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

      {/* --- MODAL (FIXED LAYOUT) --- */}
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
              className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* LEFT SIDE (Image) - Scroll bo'lmaydi */}
              <div className="hidden md:flex md:w-5/12 bg-slate-50 p-8 border-r border-slate-100 flex-col items-center justify-center relative">
                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 absolute top-8 left-8">
                  Profil
                </div>

                <label className="relative group w-56 h-56 rounded-[2rem] bg-white border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="text-slate-300" size={64} />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Pencil className="text-white" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>

                <div className="mt-8 w-full max-w-xs space-y-2">
                  {ROLES.map((role) => (
                    <button
                      key={role.key}
                      onClick={() => setForm({ ...form, role: role.key })}
                      className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                        form.role === role.key
                          ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                          : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <role.Icon size={18} />
                      <span className="text-xs font-bold uppercase">
                        {role.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE (Form) - Flexbox orqali boshqariladi */}
              <div className="flex-1 flex flex-col h-full bg-white relative">
                {/* 1. Header (Fixed Top) */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">
                    {form._id ? "Tahrirlash" : "Yangi Rahbar"}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                {/* 2. Content (Scrollable Middle) */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {/* Mobil uchun rasm yuklash (faqat kichik ekranda chiqadi) */}
                  <div className="md:hidden flex justify-center mb-6">
                    <label className="relative w-32 h-32 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                      {preview ? (
                        <img
                          src={preview}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon />
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
                      label="F.I.SH (Majburiy)"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      placeholder="Ism Familiya"
                      full
                    />
                    <Input
                      label="Lavozim (Majburiy)"
                      value={form.position}
                      onChange={(v) => setForm({ ...form, position: v })}
                      placeholder="Direktor..."
                      full
                    />

                    <div className="col-span-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                        Telefon
                      </div>
                      <input
                        type="tel"
                        value={form.phone ?? ""} // 🛡️ FIX: null bo'lsa bo'sh string
                        onChange={handlePhoneChange}
                        className="w-full h-12 px-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none font-bold text-sm"
                        placeholder="+998..."
                      />
                    </div>

                    <Input
                      label="Email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      placeholder="@texnikum.uz"
                    />
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
                        value={form.experience ?? ""} // 🛡️ FIX: null bo'lsa bo'sh string
                        onChange={(e) => handleNumberChange(e, "experience")}
                        className="w-full h-12 px-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none font-bold text-sm"
                      />
                    </div>

                    <div className="col-span-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                        Tartib
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={form.order ?? 0} // 🛡️ FIX: null bo'lsa 0
                        onChange={(e) => handleNumberChange(e, "order")}
                        className="w-full h-12 px-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none font-bold text-sm"
                      />
                    </div>

                    {form.role === "head" && (
                      <div className="col-span-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                          Icon
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {ICONS.map((icon) => (
                            <button
                              key={icon.key}
                              onClick={() =>
                                setForm({ ...form, iconKey: icon.key })
                              }
                              className={`p-3 rounded-xl border ${form.iconKey === icon.key ? "bg-emerald-50 border-emerald-500 text-emerald-600" : "border-slate-100 text-slate-400"}`}
                            >
                              <icon.Icon size={20} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="col-span-2">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                        Biografiya
                      </div>
                      <textarea
                        className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none font-medium text-sm text-slate-700 resize-none h-32"
                        value={form.bio ?? ""} // 🛡️ FIX: null bo'lsa bo'sh string
                        onChange={(e) =>
                          setForm({ ...form, bio: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Footer (Fixed Bottom) */}
                <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white shrink-0 z-20">
                  {form._id ? (
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="text-rose-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-50 px-4 py-3 rounded-xl transition-colors"
                    >
                      {deleting ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      O'chirish
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-100"
                    >
                      Bekor qilish
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={saving || !form.name || !form.position}
                      className="px-8 py-3 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-200 flex items-center gap-2 disabled:opacity-50"
                    >
                      {saving ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Save size={16} />
                      )}
                      Saqlash
                    </button>
                  </div>
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
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
          <RoleIcon size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">
            {title}
          </h2>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {items.length} xodim
          </div>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-bold text-sm">
          Ro'yxat bo'sh
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
  const imgUrl = getImageUrl(
    leader.imagePreview || leader.imageUrl || leader.image,
  );
  return (
    <div
      onClick={onClick}
      className="group relative flex items-center gap-5 p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-emerald-200 rounded-[2rem] cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="w-20 h-20 shrink-0 rounded-[1.5rem] bg-white border border-slate-100 overflow-hidden flex items-center justify-center">
        {imgUrl ? (
          <img src={imgUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <Users className="text-slate-300" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">
            {leader.position}
          </p>
          {leader.order > 0 && (
            <span className="text-[9px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-md">
              #{leader.order}
            </span>
          )}
        </div>
        <h3 className="text-lg font-black text-slate-900 italic truncate">
          {leader.name}
        </h3>
      </div>
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-slate-900 text-white rounded-xl">
          <Pencil size={14} />
        </div>
      </div>
    </div>
  );
};

// 🛡️ FIX: Inputda null qiymat kelib qolsa, "" ga aylantirish
const Input = ({
  label,
  value,
  onChange,
  placeholder,
  full,
  type = "text",
}) => (
  <div className={full ? "col-span-2" : ""}>
    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
      {label}
    </div>
    <input
      type={type}
      className="w-full h-12 px-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none font-bold text-sm text-slate-700 placeholder:text-slate-300 transition-all"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

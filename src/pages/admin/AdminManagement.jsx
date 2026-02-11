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
} from "lucide-react";
import { toast } from "react-hot-toast";
import managementApi from "../../api/managementApi";

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
  imageFile: null,
  imagePreviewLocal: null,
};

export default function AdminManagement() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const selected = useMemo(
    () => list.find((x) => x._id === selectedId) || null,
    [list, selectedId],
  );

  const grouped = useMemo(() => {
    const director = list
      .filter((x) => x.role === "director")
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const deputies = list
      .filter((x) => x.role === "deputy")
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const heads = list
      .filter((x) => x.role === "head")
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return { director, deputies, heads };
  }, [list]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await managementApi.getAll();
      const data = res.data?.data || [];
      setList(Array.isArray(data) ? data : []);
      // default select
      if (!selectedId && data?.[0]?._id) setSelectedId(data[0]._id);
    } catch (e) {
      console.error(e);
      toast.error("Rahbariyatni yuklab bo‘lmadi");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // selected o‘zgarsa form’ni to‘ldir
  useEffect(() => {
    if (!selected) return;

    setForm((p) => ({
      ...p,
      _id: selected._id,
      name: selected.name || "",
      position: selected.position || "",
      role: selected.role || "deputy",
      phone: selected.phone || "",
      email: selected.email || "",
      reception: selected.reception || "",
      bio: selected.bio || "",
      education: selected.education || "",
      experience: selected.experience || "",
      iconKey: selected.iconKey || "Users",
      order: Number(selected.order || 0),
      imageFile: null,
      imagePreviewLocal: null,
    }));
  }, [selectedId]); // intentionally only id

  const resetToSelected = () => {
    if (!selected) {
      setForm(emptyForm);
      setSelectedId(null);
      return;
    }
    setForm({
      ...emptyForm,
      _id: selected._id,
      name: selected.name || "",
      position: selected.position || "",
      role: selected.role || "deputy",
      phone: selected.phone || "",
      email: selected.email || "",
      reception: selected.reception || "",
      bio: selected.bio || "",
      education: selected.education || "",
      experience: selected.experience || "",
      iconKey: selected.iconKey || "Users",
      order: Number(selected.order || 0),
    });
  };

  const pickImage = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((p) => ({
      ...p,
      imageFile: file,
      imagePreviewLocal: url,
    }));
  };

  const createNew = () => {
    setSelectedId(null);
    setForm({
      ...emptyForm,
      role: "deputy",
      iconKey: "Users",
      order: 0,
    });
  };

  const submit = async () => {
    if (!form.name.trim() || !form.position.trim() || !form.role) {
      toast.error("Ism, lavozim va role majburiy");
      return;
    }

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
    fd.append("iconKey", form.iconKey || "");
    fd.append("order", String(Number(form.order || 0)));
    if (form.imageFile) fd.append("image", form.imageFile);

    try {
      setSaving(true);

      if (form._id) {
        await managementApi.update(form._id, fd);
        toast.success("Yangilandi ✅");
      } else {
        const res = await managementApi.create(fd);
        toast.success("Yaratildi ✅");
        const created = res.data?.data;
        if (created?._id) setSelectedId(created._id);
      }

      await fetchAll();
    } catch (e) {
      console.error(e);
      toast.error("Saqlashda xato");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!selected?._id) return;
    if (!window.confirm("Ushbu rahbarni o‘chirib yuborasizmi?")) return;

    try {
      setDeleting(true);
      await managementApi.remove(selected._id);
      toast.success("O‘chirildi");
      setSelectedId(null);
      setForm(emptyForm);
      await fetchAll();
    } catch (e) {
      console.error(e);
      toast.error("O‘chirishda xato");
    } finally {
      setDeleting(false);
    }
  };

  const avatarSrc =
    form.imagePreviewLocal ||
    selected?.imagePreview ||
    selected?.imageUrl ||
    null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header */}
      <div className="bg-[#0a1128] text-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-emerald-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
              Rahbariyat <span className="text-emerald-400">Boshqaruvi</span>
            </h1>
            <p className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-2">
              Pro editor: rasm + ma’lumot + tartib (order)
            </p>
          </div>

          <button
            onClick={createNew}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition-all font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98]"
          >
            <Plus size={18} />
            Yangi rahbar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        {/* Left list */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
              Ro‘yxat
            </div>
          </div>

          {loading ? (
            <div className="p-10 flex items-center gap-3 text-slate-600 font-bold">
              <Loader2 className="animate-spin" size={18} /> Yuklanmoqda...
            </div>
          ) : (
            <div className="p-4 space-y-5">
              <Group
                title="Direktor"
                items={grouped.director}
                selectedId={selectedId}
                onPick={setSelectedId}
              />
              <Group
                title="O‘rinbosarlar"
                items={grouped.deputies}
                selectedId={selectedId}
                onPick={setSelectedId}
              />
              <Group
                title="Bo‘lim boshliqlari"
                items={grouped.heads}
                selectedId={selectedId}
                onPick={setSelectedId}
              />
            </div>
          )}
        </div>

        {/* Right editor */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 md:px-8 py-6 border-b border-slate-100 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
                Editor
              </div>
              <div className="text-lg font-black text-slate-900 tracking-tight">
                {form._id ? "Tahrirlash" : "Yangi rahbar yaratish"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {form._id && (
                <button
                  onClick={remove}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all disabled:opacity-60"
                >
                  {deleting ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  O‘chirish
                </button>
              )}

              <button
                onClick={resetToSelected}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 text-slate-700 border border-slate-100 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all"
              >
                <X size={16} />
                Bekor
              </button>

              <button
                onClick={submit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg disabled:opacity-60"
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

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            {/* Avatar panel */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-6">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                Rasm
              </div>

              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-300">
                    <ImageIcon size={64} />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => pickImage(e.target.files?.[0])}
                />
              </div>

              <p className="mt-4 text-[10px] text-slate-500 font-bold">
                Click qilib rasm tanla (JPG/PNG). Saqlash bosilganda
                Uploadcare’ga ketadi.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {ICONS.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, iconKey: key }))}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      form.iconKey === key
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-white border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        form.iconKey === key
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }
                    />
                    <div className="mt-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form panel */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Ism">
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                    placeholder="Masalan: Ahmedov Jasur..."
                  />
                </Field>

                <Field label="Lavozim">
                  <input
                    value={form.position}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, position: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                    placeholder="Masalan: Texnikum direktori"
                  />
                </Field>

                <Field label="Role">
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, role: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                  >
                    {ROLES.map((r) => (
                      <option key={r.key} value={r.key}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Order (tartib)">
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, order: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                  />
                </Field>

                <Field label="Telefon">
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                    placeholder="+998..."
                  />
                </Field>

                <Field label="Email">
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                    placeholder="mail@texnikum.uz"
                  />
                </Field>
              </div>

              <Field label="Qabul vaqti">
                <input
                  value={form.reception}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, reception: e.target.value }))
                  }
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                  placeholder="Dushanba-Juma, 08:00-11:00"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Ma’lumoti">
                  <input
                    value={form.education}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, education: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                    placeholder="TDTU (PhD)..."
                  />
                </Field>

                <Field label="Tajriba">
                  <input
                    value={form.experience}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, experience: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-700"
                    placeholder="Masalan: 12 yil"
                  />
                </Field>
              </div>

              <Field label="Bio (qisqacha ma’lumot)">
                <textarea
                  rows={6}
                  value={form.bio}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, bio: e.target.value }))
                  }
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none font-medium text-slate-700 resize-none"
                  placeholder="Rahbar haqida qisqacha matn..."
                />
              </Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group({ title, items, selectedId, onPick }) {
  return (
    <div>
      <div className="px-2 mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
        {title}
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="px-3 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] text-slate-500 font-bold">
            Bo‘sh
          </div>
        ) : (
          items.map((x) => (
            <button
              key={x._id}
              onClick={() => onPick(x._id)}
              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                selectedId === x._id
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-slate-100 hover:bg-slate-50"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-white shadow-sm flex items-center justify-center">
                {x.imagePreview || x.imageUrl ? (
                  <img
                    src={x.imagePreview || x.imageUrl}
                    alt={x.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-slate-300">
                    <ImageIcon size={18} />
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="font-black text-slate-800 text-sm truncate italic">
                  {x.name}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">
                  {x.position}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </div>
      {children}
    </div>
  );
}

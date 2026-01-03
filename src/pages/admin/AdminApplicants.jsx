import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Trash2,
  Loader2,
  UserX,
  Phone,
  Calendar,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const AdminApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/applicant");
      const incomingData = res.data.data || res.data.result || res.data;
      setApplicants(Array.isArray(incomingData) ? incomingData : []);
    } catch (err) {
      console.error("Xato:", err);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("O'chirishni tasdiqlaysizmi?")) {
      try {
        await axiosClient.delete(`/applicant/${id}`);
        setApplicants((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        alert("Xato yuz berdi");
      }
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <Loader2 className="animate-spin text-emerald-600 mb-2" size={40} />
      </div>
    );

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
            Qabul <span className="text-emerald-500">Bo'limi</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Onlayn arizalar
          </p>
        </div>
        <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-emerald-200 text-sm italic">
          JAMI: {applicants.length} TA
        </div>
      </div>

      {applicants.length === 0 ? (
        <div className="bg-white p-10 md:p-20 rounded-[2.5rem] border-2 border-dashed border-slate-100 text-center">
          <UserX className="mx-auto text-slate-200 mb-4" size={64} />
          <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest">
            Arizalar mavjud emas
          </h3>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE - Faqat katta ekranlarda ko'rinadi */}
          <div className="hidden lg:block bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="p-6">Abituriyent</th>
                  <th className="p-6">Yo'nalish</th>
                  <th className="p-6">Sana</th>
                  <th className="p-6 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applicants.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl italic">
                          {item.fullname?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-lg tracking-tight">
                            {item.fullname}
                          </div>
                          <div className="flex items-center text-slate-400 text-sm font-medium">
                            <Phone size={14} className="mr-1.5" /> {item.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight italic border border-amber-100">
                        <GraduationCap size={14} /> {item.direction}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="text-xs font-bold text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-slate-300 hover:text-rose-500 p-3 hover:bg-rose-50 rounded-2xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS - Faqat kichik ekranlarda ko'rinadi */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {applicants.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500 opacity-20" />

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl italic">
                    {item.fullname?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-800 text-lg leading-tight tracking-tight mb-1">
                      {item.fullname}
                    </h4>
                    <a
                      href={`tel:${item.phone}`}
                      className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 w-fit px-3 py-1 rounded-lg"
                    >
                      <Phone size={14} className="mr-2" /> {item.phone}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Yo'nalish
                    </span>
                    <span className="text-xs font-bold text-slate-700 block truncate italic">
                      <GraduationCap size={12} className="inline mr-1" />{" "}
                      {item.direction}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Sana
                    </span>
                    <span className="text-xs font-bold text-slate-700 block italic">
                      <Calendar size={12} className="inline mr-1" />{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-colors"
                >
                  <Trash2 size={16} /> Arizani o'chirish
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminApplicants;

import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Trash2,
  Loader2,
  UserX,
  Phone,
  Calendar,
  GraduationCap,
} from "lucide-react";

const AdminApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      // SERVERINGIZDA 'applicant' (s-siz) BO'LSA:
      const res = await axiosClient.get("/applicant");

      // Backenddan ma'lumot qanday kelsa ham uni arrayga aylantiramiz
      // res.data.data yoki res.data.result yoki shunchaki res.data
      const incomingData = res.data.data || res.data.result || res.data;

      if (Array.isArray(incomingData)) {
        setApplicants(incomingData);
      } else {
        setApplicants([]);
      }
    } catch (err) {
      console.error("Arizalarni yuklashda xato:", err);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Ushbu arizani o'chirib yubormoqchimisiz?")) {
      try {
        await axiosClient.delete(`/applicant/${id}`);
        // Ro'yxatni qayta yangilash (Optimistic update)
        setApplicants((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        alert("O'chirishda xatolik yuz berdi");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={40} />
        <p className="text-gray-500 font-medium">Arizalar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Qabul bo'limi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelib tushgan onlayn arizalar ro'yxati
          </p>
        </div>
        <div className="bg-blue-600 text-white px-6 py-2 rounded-2xl font-bold shadow-lg shadow-blue-200">
          Jami: {applicants.length} ta
        </div>
      </div>

      {applicants.length === 0 ? (
        <div className="bg-white p-20 rounded-[2.5rem] border-2 border-dashed border-gray-100 text-center">
          <UserX className="mx-auto text-gray-200 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-400">
            Hozircha arizalar yo'q
          </h3>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="p-6">Abituriyent</th>
                <th className="p-6 text-center">Yo'nalish</th>
                <th className="p-6 text-center">Vaqt</th>
                <th className="p-6 text-right">Boshqaruv</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applicants.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50/30 transition group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-lg">
                        {item.fullname?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-lg">
                          {item.fullname}
                        </div>
                        <div className="flex items-center text-blue-500 text-sm font-mono mt-0.5">
                          <Phone size={14} className="mr-1.5" /> {item.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight">
                      <GraduationCap size={14} /> {item.direction}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center text-gray-400">
                      <Calendar size={14} className="mb-1" />
                      <span className="text-[11px] font-bold">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "---"}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-300 hover:text-red-600 p-3 hover:bg-red-50 rounded-2xl transition-all duration-300"
                      title="O'chirish"
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminApplicants;

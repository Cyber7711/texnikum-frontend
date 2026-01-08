const Badge = ({ children, variant = "emerald", className = "" }) => {
  const variants = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    slate: "bg-slate-50 text-slate-500 border-slate-100",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

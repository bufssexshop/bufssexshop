export const PriceFilter = () => {
  return (
    <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Precio (COP)</h3>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          placeholder="Min"
          className="w-full bg-brand-dark border border-white/10 rounded-lg p-2 text-xs text-white"
        />
        <span className="text-gray-600">-</span>
        <input
          type="number"
          placeholder="Max"
          className="w-full bg-brand-dark border border-white/10 rounded-lg p-2 text-xs text-white"
        />
      </div>
      <button className="w-full mt-4 bg-brand-pink/10 text-brand-pink py-2 rounded-xl text-[10px] font-black uppercase hover:bg-brand-pink hover:text-white transition-all">
        Aplicar Filtro
      </button>
    </div>
  );
};
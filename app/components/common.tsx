
type CardProps = {
  title: string;
  children: React.ReactNode;
};
export function Card({ title, children } : CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

type InputProps = {
  label: string;
  [key: string]: unknown;
};
export function Input({ label, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        {...props}
        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
      />
    </div>
  );
}


type SelectProps = {
  label: string;
  children: React.ReactNode;
  [key: string]: unknown;
};
export function Select({ label, children, ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <select
        {...props}
        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
      >
        {children}
      </select>
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};
export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 transition ${className}`}
    >
      {children}
    </button>
  );
}

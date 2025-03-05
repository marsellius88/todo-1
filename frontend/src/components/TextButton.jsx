export default function TextButton({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 cursor-pointer bg-transparent text-stone-800 hover:text-stone-500"
      {...props}
    >
      {children}
    </button>
  );
}

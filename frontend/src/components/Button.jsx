export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 border-none rounded-sm bg-blue-400 cursor-pointer text-white hover:bg-blue-300"
      {...props}
    >
      {children}
    </button>
  );
}

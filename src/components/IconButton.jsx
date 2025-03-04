export default function IconButton({ children, ...props }) {
  return (
    <button className="cursor-pointer" {...props}>
      {children}
    </button>
  );
}

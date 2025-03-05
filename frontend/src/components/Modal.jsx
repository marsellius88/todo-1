import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      className="bg-slate-100 mx-auto my-auto rounded-md border-none shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4 w-4/5 max-w-[40rem] animate-fade-slide-up"
      ref={dialogRef}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

import { useEffect } from "react";
import { Barcode } from "./Barcode";

type RegisterPassProps = {
  title: string;
  merchant: string;
  value: string;
  hint: string;
  onClose: () => void;
};

export function RegisterPass({ title, merchant, value, hint, onClose }: RegisterPassProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay pass-overlay" onClick={onClose}>
      <div
        className="register-pass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="register-kicker">Show at the register</p>
        <p className="register-merchant">{merchant}</p>
        <h2 id="register-title">{title}</h2>
        <Barcode value={value} label={value} tall />
        <p className="register-hint">{hint}</p>
        <button type="button" className="btn btn-clip" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

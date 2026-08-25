import { useEffect, useRef, useState } from "react";
import { lookupScan, type ScanHit } from "../lib/club";

type ScanDeskProps = {
  onHit: (hit: ScanHit) => void;
  onMiss: (raw: string) => void;
  onClose: () => void;
};

export function ScanDesk({ onHit, onMiss, onClose }: ScanDeskProps) {
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState("Type the barcode or hold it to the camera.");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (value: string) => {
    const hit = lookupScan(value);
    if (hit) onHit(hit);
    else onMiss(value);
  };

  const startCamera = async () => {
    const Detector = window.BarcodeDetector;
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("This browser has no camera. Type the code instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      if (typeof Detector !== "function") {
        setStatus("Camera is on. This browser cannot decode barcodes — type the code.");
        return;
      }
      const detector = new Detector({ formats: ["code_39", "code_128", "qr_code", "ean_13"] });
      setStatus("Point the camera at the barcode.");
      const tick = async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) {
          requestAnimationFrame(() => void tick());
          return;
        }
        try {
          const codes = await detector.detect(videoRef.current);
          if (codes[0]?.rawValue) {
            submit(codes[0].rawValue);
            return;
          }
        } catch {
          /* keep looping */
        }
        requestAnimationFrame(() => void tick());
      };
      requestAnimationFrame(() => void tick());
    } catch {
      setStatus("Camera blocked. Type the code from the shelf tag.");
    }
  };

  return (
    <div className="overlay scan-overlay" onClick={onClose}>
      <div
        className="scan-desk"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scan-title"
        onClick={(event) => event.stopPropagation()}
      >
      <h2 id="scan-title">Scan at the register</h2>
      <p>{status}</p>
      <video ref={videoRef} className="scan-video" playsInline muted />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(raw);
        }}
      >
        <label htmlFor="scan-code">Barcode or club number</label>
        <input
          id="scan-code"
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          placeholder="HARBOR10 or HP-482910"
          autoComplete="off"
        />
        <div className="scan-actions">
          <button type="submit" className="btn btn-clip">
            Look up
          </button>
          <button type="button" className="btn btn-copy" onClick={() => void startCamera()}>
            Open camera
          </button>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: string[] }) => {
      detect: (source: CanvasImageSource) => Promise<{ rawValue: string }[]>;
    };
  }
}

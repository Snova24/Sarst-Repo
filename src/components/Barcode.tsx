import { code39Bars } from "../lib/barcode";

type BarcodeProps = {
  value: string;
  label?: string;
  tall?: boolean;
};

export function Barcode({ value, label, tall = false }: BarcodeProps) {
  const units = code39Bars(value);
  const width = units.reduce((sum, unit) => sum + (unit.wide ? 3 : 1), 0);
  const height = tall ? 88 : 56;
  let x = 0;
  const rects = units.map((unit, index) => {
    const w = unit.wide ? 3 : 1;
    const rect = unit.bar ? (
      <rect key={index} x={x} y={0} width={w} height={height} fill="currentColor" />
    ) : null;
    x += w;
    return rect;
  });

  return (
    <figure className={`barcode${tall ? " is-tall" : ""}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Barcode for ${label ?? value}`}
        preserveAspectRatio="none"
      >
        {rects}
      </svg>
      <figcaption>{label ?? value}</figcaption>
    </figure>
  );
}

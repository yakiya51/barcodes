import { useBarcodeState } from "../stores";
import { BarcodeCard } from "./barcode-card";

export function BarcodeList() {
  const { barcodes } = useBarcodeState();

  return (
    <ul className="overflow-hidden rounded-2xl border shadow-sm">
      {barcodes.map((barcode) => (
        <li key={barcode.id} className="border-b last:border-b-0 ">
          <section id={barcode.id}>
            <BarcodeCard barcode={barcode} />
          </section>
        </li>
      ))}
    </ul>
  );
}

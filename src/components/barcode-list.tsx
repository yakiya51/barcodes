import { useBarcodeState } from "../stores";
import { BarcodeCard } from "./barcode-card";

export function BarcodeList() {
  const { barcodes } = useBarcodeState();

  return (
    <ul className="border rounded-2xl shadow-sm">
      {barcodes.map((barcode) => (
        <li key={barcode.id} className="border-b last:border-b-0">
          <BarcodeCard barcode={barcode} />
        </li>
      ))}
    </ul>
  );
}

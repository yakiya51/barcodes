import { useState } from "react";
import { Barcode, useBarcodeState } from "../stores";
import { BarcodeComponent } from "./barcode";
import { XIcon } from "lucide-react";
import { cn } from "../lib/utils";

export function BarcodeCard({ barcode }: { barcode: Barcode }) {
  const [isHovering, setIsHovering] = useState(false);
  const { remove } = useBarcodeState();

  return (
    <div
      className="px-6 py-16 relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        onClick={() => remove(barcode.id)}
        className={cn(
          "absolute top-3 border rounded-lg p-2 hover:bg-red-300/20 right-4",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      >
        <XIcon size={12} className="text-red-700" />
      </button>

      <div className="flex items-center justify-center mb-4">
        <BarcodeComponent barcode={barcode} />
      </div>
      <div className="text-center">
        <p className="text-neutral-600 truncate text-sm">{barcode.value}</p>
      </div>
    </div>
  );
}

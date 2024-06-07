import { useState } from "react";
import { Barcode, useBarcodeState } from "../stores";
import { BarcodeComponent } from "./barcode";
import { XIcon } from "lucide-react";
import { cn } from "../lib/utils";

export function BarcodeCard({ barcode }: { barcode: Barcode }) {
  const [isHovering, setIsHovering] = useState(false);
  const { remove, highlightedBarcodeId } = useBarcodeState();

  const isHighlighted = highlightedBarcodeId === barcode.id;
  return (
    <div
      className={cn(" relative px-6 py-16", isHighlighted && "bg-black")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        onClick={() => remove(barcode.id)}
        className={cn(
          "absolute right-4 top-3 rounded-lg border p-2 transition-opacity hover:bg-red-300/20",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      >
        <XIcon size={12} className="text-red-700" />
      </button>

      <div className="mb-4 flex items-center justify-center">
        <BarcodeComponent barcode={barcode} />
      </div>
      <div className="text-center">
        <p
          className={cn(
            "truncate text-sm text-neutral-600",
            isHighlighted && "text-white",
          )}
        >
          {barcode.value}
        </p>
      </div>
    </div>
  );
}

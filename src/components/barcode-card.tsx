import { FormEvent, useState } from "react";
import { Barcode, useBarcodeState } from "../stores";
import { BarcodeComponent } from "./barcode";
import { Tag, XIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

export function BarcodeCard({ barcode }: { barcode: Barcode }) {
  const [isHovering, setIsHovering] = useState(false);
  const { remove, highlightedBarcodeId } = useBarcodeState();

  const isHighlighted = highlightedBarcodeId === barcode.id;
  return (
    <div
      className={cn(
        "relative px-5 pb-10 pt-5 transition-colors",
        isHighlighted && "bg-black/75",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="mb-4 flex justify-between">
        <LabelPopover barcode={barcode} isVisible={isHovering} />
        <DeleteButton
          onClick={() => remove(barcode.id)}
          isVisible={isHovering}
        />
      </div>

      <div className="mb-5 flex items-center justify-center">
        <BarcodeComponent barcode={barcode} />
      </div>
      <div className="text-center text-neutral-400 ">
        {barcode.label && (
          <p
            className={cn(
              "mb-1 text-sm font-medium",
              isHighlighted && "text-white",
            )}
          >
            {barcode.label}
          </p>
        )}
        <p
          className={cn(
            "truncate text-xs transition-colors",
            isHighlighted && "text-white",
          )}
        >
          {barcode.value}
        </p>
      </div>
    </div>
  );
}

function DeleteButton({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg border p-2 transition-opacity hover:bg-red-300/20",
        isVisible ? "visible" : "invisible",
      )}
    >
      <XIcon size={12} className="text-red-700" />
    </button>
  );
}

function LabelPopover({
  barcode,
  isVisible,
}: {
  barcode: Barcode;
  isVisible: boolean;
}) {
  if (!isVisible) return;

  const { addLabel } = useBarcodeState();

  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(barcode.label ?? "");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addLabel({ id: barcode.id, label });
    setOpen(false);
  }

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setLabel("");
        }

        setOpen(open);
      }}
    >
      <PopoverTrigger
        className={cn(
          "flex items-center gap-x-1 rounded-lg border p-2 text-xs transition-opacity",
          isVisible ? "visible" : "invisible",
        )}
      >
        <Tag size={12} />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[240px] rounded-lg bg-white p-2"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="borderp-2 rounded-lg text-xs focus:border-neutral-400  focus-visible:ring-0"
          />
        </form>
      </PopoverContent>
    </Popover>
  );
}

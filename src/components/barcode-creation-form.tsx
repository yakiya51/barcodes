import { FormEvent, useState } from "react";
import { useBarcodeState, BarcodeKind } from "../stores";
import { nanoid } from "nanoid";
import { BarcodeIcon, CornerDownLeft, QrCodeIcon } from "lucide-react";
import { cn } from "../lib/utils";

export function BarcodeCreationForm() {
  const [inputValue, setInputValue] = useState("");
  const [barcodeKind, setBarcodeKind] = useState<BarcodeKind>("code128");

  console.log(barcodeKind, inputValue);
  const { insert } = useBarcodeState();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    insert({
      kind: barcodeKind,
      value: inputValue,
      id: nanoid(),
    });
    setInputValue("");
    setBarcodeKind(barcodeKind);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-24 w-full items-center justify-center gap-x-3 rounded-2xl border px-6 shadow-sm"
    >
      <BarcodeKindSelector value={barcodeKind} setValue={setBarcodeKind} />
      <input
        required
        placeholder={barcodeKind === "code128" ? "Code 128..." : "QR Code..."}
        pattern="[\x00-\x7F]*" // Only ASCII chars
        type="text"
        maxLength={300}
        value={inputValue}
        onChange={(e) => setInputValue(e.target?.value)}
        className="h-9 w-full rounded-lg border px-3 text-sm shadow-sm"
      />
      <button
        type="submit"
        className="flex h-9 items-center justify-center gap-x-1 rounded-lg border bg-black px-2.5 text-xs font-medium text-white hover:bg-neutral-700"
        onClick={() => {}}
      >
        <CornerDownLeft size={14} />
      </button>
    </form>
  );
}

function BarcodeKindSelector({
  value,
  setValue,
}: {
  value: BarcodeKind;
  setValue: (_: BarcodeKind) => void;
}) {
  const options = [
    {
      value: "code128" as BarcodeKind,
      icon: BarcodeIcon,
    },
    {
      value: "qrcode" as BarcodeKind,
      icon: QrCodeIcon,
    },
  ];

  return (
    <div
      tabIndex={-1}
      className="flex h-9 items-center rounded-lg border p-1 shadow-sm"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = value === option.value;

        return (
          <button
            className={cn(
              "flex h-full w-[32px] cursor-pointer items-center justify-center rounded-md",
              isSelected && "bg-black",
            )}
            key={option.value}
            type="button"
            onClick={() => setValue(option.value)}
          >
            <input
              tabIndex={-1}
              type="radio"
              className="sr-only"
              name={value}
              value={value}
            />
            <label className="cursor-pointer" htmlFor={value}>
              <Icon
                size={18}
                className={cn(isSelected ? "text-white" : "text-neutral-400")}
              />
            </label>
          </button>
        );
      })}
    </div>
  );
}

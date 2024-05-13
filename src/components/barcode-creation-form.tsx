import { FormEvent, useState } from "react";
import { useBarcodeState, BarcodeKind } from "../stores";
import { nanoid } from "nanoid";
import { BarcodeIcon, CornerDownLeft, QrCodeIcon } from "lucide-react";
import { cn } from "../lib/utils";

export function BarcodeCreationForm() {
  const [inputValue, setInputValue] = useState("");
  const [barcodeKind, setBarcodeKind] = useState<BarcodeKind>("code128");

  const { insert } = useBarcodeState();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    insert({
      kind: barcodeKind,
      value: inputValue,
      id: nanoid(),
    });
    setInputValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-5 justify-center border rounded-2xl  h-20 mx-auto flex gap-x-2 shadow-sm items-center"
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
        className="px-2.5 w-full rounded-lg h-8 border text-sm shadow-sm"
      />
      <button
        type="submit"
        className="border font-medium rounded-lg flex justify-center items-center gap-x-1 bg-black px-2.5 h-8 text-white text-xs hover:bg-neutral-700"
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
    <div className="border h-8 rounded-lg flex items-center p-0.5 shadow-sm">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = value === option.value;

        return (
          <div
            className={cn(
              "w-[32px] cursor-pointer rounded-md flex justify-center h-full items-center",
              isSelected && "bg-black"
            )}
            key={option.value}
            onClick={() => setValue(option.value)}
          >
            <input
              type="radio"
              className="sr-only"
              name={value}
              value={value}
            />
            <label className="cursor-pointer" htmlFor={value}>
              <Icon
                size={16}
                className={cn(isSelected ? "text-white" : "text-neutral-400")}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

import { useBarcodeState } from "../stores";

export function BarcodeScrollSpy() {
  const { barcodes } = useBarcodeState();

  return (
    <ul className="py-3 space-y-1">
      {barcodes.map((b) => (
        <li className="text-sm truncate overflow-x-hidden max-w-full text-neutral-400 hover:text-neutral-500 w-fit">
          <a href={`#${b.id}`} className="truncate">
            {b.value}
          </a>
        </li>
      ))}
    </ul>
  );
}

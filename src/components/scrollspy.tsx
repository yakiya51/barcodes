import { useBarcodeState } from "../stores";

export function BarcodeScrollSpy() {
  const { barcodes } = useBarcodeState();

  return (
    <ul className="w-full space-y-1">
      {barcodes.map((b) => (
        <li className="w-fit max-w-full overflow-x-hidden truncate text-xs text-neutral-400 hover:text-black hover:underline">
          <a href={`#${b.id}`} className="truncate">
            {b.value}
          </a>
        </li>
      ))}
    </ul>
  );
}

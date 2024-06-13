import { useBarcodeState } from "../stores";

export function BarcodeScrollSpy() {
  const { barcodes, setHighlightedBarcodeId } = useBarcodeState();

  function highlightBarcodeCardById(id: string) {
    setHighlightedBarcodeId(id);

    // remove highlight after some time
    setTimeout(() => setHighlightedBarcodeId(null), 200);
  }

  return (
    <ul className="w-full space-y-1">
      {barcodes.map((b) => (
        <li
          key={b.id}
          className="w-fit max-w-full overflow-x-hidden truncate text-xs text-neutral-400 hover:text-black hover:underline"
        >
          <a
            onClick={() => highlightBarcodeCardById(b.id)}
            href={`#${b.id}`}
            className="truncate"
          >
            {b.label && b.label.length > 0 ? b.label : b.value}
          </a>
        </li>
      ))}
    </ul>
  );
}

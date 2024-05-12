import { BarcodeCreationForm } from "./components/barcode-creation-form";
import { BarcodeList } from "./components/barcode-list";
import { Footer } from "./components/footer";
import { useBarcodeState } from "./stores";

export default function App() {
  const { barcodes } = useBarcodeState();
  return (
    <>
      <main className="min-h-screen max-w-screen-2xl w-[642px] px-4 mt-12 mx-auto">
        <BarcodeCreationForm />
        <div className="py-8">
          {barcodes.length > 0 ? (
            <BarcodeList />
          ) : (
            <p className="text-xs text-center text-neutral-400">
              Start by creating a barcode!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

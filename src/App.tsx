import { BarcodeCreationForm } from "./components/barcode-creation-form";
import { BarcodeList } from "./components/barcode-list";
import { Footer } from "./components/footer";
import { BarcodeScrollSpy } from "./components/scrollspy";
import { useBarcodeState } from "./stores";

export default function App() {
  const { barcodes } = useBarcodeState();

  return (
    <>
      <main className="min-h-screen w-[1280px] my-10 flex mx-auto">
        <nav className="fixed top-12 w-[280px]">
          <BarcodeScrollSpy />
        </nav>
        <div className="w-[720px] mx-auto px-4">
          <BarcodeCreationForm />
          <div className="py-8">
            {barcodes.length > 0 ? (
              <BarcodeList />
            ) : (
              <p className="text-xs text-center text-neutral-400">
                Create a barcode using the form above
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { BarcodeCreationForm } from "./components/barcode-creation-form";
import { BarcodeList } from "./components/barcode-list";
import { Footer } from "./components/footer";
import { BarcodeScrollSpy } from "./components/scrollspy";
import { useBarcodeState } from "./stores";

export default function App() {
  const { barcodes } = useBarcodeState();

  return (
    <>
      <main className="relative mx-auto my-10 min-h-screen w-full max-w-[720px] px-4 xl:max-w-[1280px] xl:px-10">
        <div className="relative">
          <nav className="fixed left-0 top-10 mx-10 h-full max-h-[calc(100vh-5rem)] w-0 overflow-y-auto px-4 xl:min-w-[240px]">
            <BarcodeScrollSpy />
          </nav>
          <div className="mx-auto w-full max-w-[720px] xl:min-w-[720px]">
            <BarcodeCreationForm />
            <div className="py-8">
              {barcodes.length > 0 ? (
                <BarcodeList />
              ) : (
                <p className="text-center text-xs text-neutral-400">
                  Create a barcode using the form above
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

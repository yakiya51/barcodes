import { z } from "zod";
import { create } from "zustand";

const code128Schema = z.object({
  kind: z.literal("code128"),
  id: z.string().min(1),
  value: z.string(),
});
export type Code128 = z.infer<typeof code128Schema>;
const qrCodeSchema = z.object({
  kind: z.literal("qrcode"),
  id: z.string().min(1),
  value: z.string(),
});
export type QRCode = z.infer<typeof qrCodeSchema>;

const barcodeSchema = z.discriminatedUnion("kind", [
  code128Schema,
  qrCodeSchema,
]);

export type Barcode = z.infer<typeof barcodeSchema>;
export type BarcodeKind = Barcode["kind"];

export interface BarcodeState {
  barcodes: Barcode[];
  insert: (barcode: Barcode) => void;
  remove: (id: string) => void;

  // highlighted barcode AKA the barcode
  // that the user navigated to via. the
  // scrollspy component
  highlightedBarcodeId: string | null;
  setHighlightedBarcodeId: (id: string | null) => void;
}

const LOCAL_STORAGE_KEY = "barcodes";

function loadBarcodes() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!data) return [];

  try {
    const json = JSON.parse(data);
    const parse = barcodeSchema.array().safeParse(json);

    if (!parse.success) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return [];
    }

    return parse.data;
  } catch {
    return [];
  }
}

export const useBarcodeState = create<BarcodeState>()((set) => ({
  barcodes: loadBarcodes(),
  insert: (b) => {
    set((state) => {
      const barcodes = [b, ...state.barcodes];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(barcodes));
      return { barcodes };
    });
  },
  remove: (id) =>
    set((state) => {
      const barcodes = state.barcodes.filter((b) => b.id !== id);

      if (barcodes.length === 0) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(barcodes));
      }

      return {
        barcodes,
      };
    }),
  highlightedBarcodeId: null,
  setHighlightedBarcodeId: (id) => {
    set((state) => {
      return { ...state, highlightedBarcodeId: id };
    });
  },
}));

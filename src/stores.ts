import { create } from "zustand";

interface Code128 {
  kind: "code128";
  id: string;
  value: string;
}

interface QRCode {
  kind: "qrcode";
  id: string;
  value: string;
}

export type Barcode = Code128 | QRCode;
export type BarcodeKind = Barcode["kind"];

export interface BarcodeState {
  barcodes: Barcode[];
  insert: (barcode: Barcode) => void;
  remove: (id: string) => void;
}

export const useBarcodeState = create<BarcodeState>()((set) => ({
  barcodes: [],
  insert: (b) => set((state) => ({ barcodes: [b, ...state.barcodes] })),
  remove: (id) =>
    set((state) => ({
      barcodes: state.barcodes.filter((b) => b.id !== id),
    })),
}));

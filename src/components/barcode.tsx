import Barcode from "react-jsbarcode";
import { type Barcode as AnyBarcode } from "../stores";
import { QRCodeSVG } from "qrcode.react";

export function BarcodeComponent({ barcode }: { barcode: AnyBarcode }) {
  switch (barcode.kind) {
    case "code128":
      return (
        <Barcode
          value={barcode.value}
          options={{
            displayValue: false,
            margin: 0,
          }}
        />
      );
    case "qrcode":
      return <QRCodeSVG value={barcode.value} className="transition-colors" />;
  }
}

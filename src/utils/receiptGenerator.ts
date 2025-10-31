import { CartItem } from "@/contexts/CartContext";
import jsPDF from "jspdf";

export interface OrderData {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  orderNumber: string;
  date: string;
  customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

export const downloadReceipt = (orderData: OrderData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  const setFont = (size = 12, style: "normal" | "bold" | "italic" = "normal") => {
    doc.setFontSize(size);
    doc.setFont("helvetica", style as any);
    doc.setTextColor(0, 0, 0);
  };

  const addRow = (cols: { text: string; x: number; align?: "left" | "right" }[], yPos: number) => {
    cols.forEach((c) => doc.text(c.text, c.x, yPos, { align: c.align || "left" }));
  };

  // Header (simple, no color)
  setFont(18, "bold");
  doc.text("LUXE", margin, y);
  setFont(16, "bold");
  doc.text("Receipt", pageWidth - margin, y, { align: "right" });
  y += 8;
  setFont(10);
  doc.text(`Order: ${orderData.orderNumber}`, margin, y);
  doc.text(`Date: ${orderData.date}`, pageWidth - margin, y, { align: "right" });
  y += 6;
  doc.line(margin, y, pageWidth - margin, y);

  // Customer info
  y += 8;
  setFont(12, "bold");
  doc.text("Customer Information", margin, y);
  y += 6;
  setFont(11);
  doc.text(orderData.customerInfo.name, margin, y); y += 5;
  doc.text(orderData.customerInfo.email, margin, y); y += 5;
  doc.text(orderData.customerInfo.address, margin, y); y += 5;
  doc.text(`${orderData.customerInfo.city} ${orderData.customerInfo.zipCode}`, margin, y); y += 8;

  // Items table header
  setFont(12, "bold");
  addRow([
    { text: "Product", x: margin },
    { text: "Size", x: margin + 90 },
    { text: "Qty", x: margin + 120 },
    { text: "Price", x: margin + 145 },
    { text: "Total", x: pageWidth - margin, align: "right" },
  ], y);
  y += 4;
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Items
  setFont(11);
  orderData.items.forEach((item) => {
    // page break if needed
    if (y > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      y = margin;
    }
    const name = item.name.length > 40 ? `${item.name.slice(0, 40)}…` : item.name;
    addRow([
      { text: name, x: margin },
      { text: item.size || "-", x: margin + 90 },
      { text: String(item.quantity), x: margin + 120 },
      { text: `¥${(item.price * 150).toFixed(0)}`, x: margin + 145 },
      { text: `¥${(item.price * item.quantity * 150).toFixed(0)}`, x: pageWidth - margin, align: "right" },
    ], y);
    y += 6;
  });

  // Totals
  y += 4;
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;
  setFont(12);
  addRow([
    { text: "Subtotal", x: margin + 120 },
    { text: `¥${(orderData.subtotal * 150).toFixed(0)}`, x: pageWidth - margin, align: "right" },
  ], y);
  y += 6;
  addRow([
    { text: "Shipping", x: margin + 120 },
    { text: `¥${(orderData.shipping * 150).toFixed(0)}`, x: pageWidth - margin, align: "right" },
  ], y);
  y += 6;
  setFont(13, "bold");
  addRow([
    { text: "Total", x: margin + 120 },
    { text: `¥${(orderData.total * 150).toFixed(0)}`, x: pageWidth - margin, align: "right" },
  ], y);

  // Footer
  y = doc.internal.pageSize.getHeight() - 15;
  setFont(9);
  doc.line(margin, y - 5, pageWidth - margin, y - 5);
  doc.text("Thank you for your purchase!", margin, y);
  doc.text("hello@luxe.com | +1 (555) 123-4567", pageWidth - margin, y, { align: "right" });

  doc.save(`receipt-${orderData.orderNumber}.pdf`);
};

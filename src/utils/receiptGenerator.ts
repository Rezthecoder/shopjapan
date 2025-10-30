import { CartItem } from "@/contexts/CartContext";

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

export const generateReceipt = (orderData: OrderData) => {
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <title>領収書 - ${orderData.orderNumber}</title>
      <style>
        body {
          font-family: 'Helvetica', 'Arial', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #000;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
        }
        .order-info {
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
        }
        .customer-info {
          margin-bottom: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        th {
          background-color: #f5f5f5;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #ddd;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }
        .totals {
          text-align: right;
          margin-top: 20px;
        }
        .totals-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 8px;
        }
        .totals-label {
          width: 150px;
          text-align: right;
          padding-right: 20px;
        }
        .totals-value {
          width: 120px;
          text-align: right;
        }
        .total-row {
          font-size: 18px;
          font-weight: bold;
          border-top: 2px solid #000;
          padding-top: 10px;
          margin-top: 10px;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>LUXE</h1>
        <p>領収書</p>
      </div>
      
      <div class="order-info">
        <div>
          <strong>注文番号:</strong> ${orderData.orderNumber}<br>
          <strong>日付:</strong> ${orderData.date}
        </div>
      </div>
      
      <div class="customer-info">
        <h3>お客様情報</h3>
        <p>
          ${orderData.customerInfo.name}<br>
          ${orderData.customerInfo.email}<br>
          ${orderData.customerInfo.address}<br>
          ${orderData.customerInfo.city} ${orderData.customerInfo.zipCode}
        </p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>商品名</th>
            <th>サイズ</th>
            <th>数量</th>
            <th>単価</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          ${orderData.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.size || '-'}</td>
              <td>${item.quantity}</td>
              <td>¥${(item.price * 150).toFixed(0)}</td>
              <td>¥${(item.price * item.quantity * 150).toFixed(0)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="totals">
        <div class="totals-row">
          <div class="totals-label">小計:</div>
          <div class="totals-value">¥${(orderData.subtotal * 150).toFixed(0)}</div>
        </div>
        <div class="totals-row">
          <div class="totals-label">配送料:</div>
          <div class="totals-value">¥${(orderData.shipping * 150).toFixed(0)}</div>
        </div>
        <div class="totals-row total-row">
          <div class="totals-label">合計:</div>
          <div class="totals-value">¥${(orderData.total * 150).toFixed(0)}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>LUXE - タイムレスなファッション</p>
        <p>hello@luxe.com | +1 (555) 123-4567</p>
        <p>ご購入ありがとうございました</p>
      </div>
    </body>
    </html>
  `;

  return html;
};

export const downloadReceipt = (orderData: OrderData) => {
  const html = generateReceipt(orderData);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `receipt-${orderData.orderNumber}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

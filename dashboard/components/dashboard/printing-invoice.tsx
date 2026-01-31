export const printTransactionInvoice = (transaction: any) => {
  if (!transaction) return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to print the invoice.");
    return;
  }

  const txId = transaction.transactionHash || transaction.id || "N/A";
  const date = new Date().toLocaleDateString();
  const sender = transaction.buyer || "Unknown";
  const receiver = transaction.receiver || transaction.merchant || "Unknown";
  const amount = transaction.amountSC
    ? `${transaction.amountSC} SC`
    : transaction.amount || "0";
  const status = transaction.status || "Completed";
  const network = transaction.networkName || "Unknown";
  const block = transaction.blockNumber ? `#${transaction.blockNumber}` : "N/A";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>StablePay Invoice</title>
  <style>
    * { box-sizing: border-box; }

    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      background: #ffffff;
      padding: 40px;
      color: #111827;
    }

    .invoice-wrapper {
      max-width: 900px;
      margin: auto;
      border: 4px solid #111827;
      padding: 14px;
    }

    .invoice-box {
      position: relative;
      border: 2px solid #d1d5db;
      padding: 48px;
      overflow: hidden;
    }

    /* WATERMARK */
    .watermark {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 140px;
      font-weight: 800;
      color: rgba(17, 24, 39, 0.05);
      transform: rotate(-25deg);
      user-select: none;
      pointer-events: none;
      letter-spacing: 6px;
    }

    /* HEADER */
    .header {
      text-align: center;
      margin-bottom: 48px;
    }

    .logo {
      font-size: 36px;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .logo span {
      color: #2563eb;
    }

    .invoice-title {
      margin-top: 8px;
      font-size: 14px;
      letter-spacing: 3px;
      color: #6b7280;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      font-size: 14px;
    }

    .meta div {
      line-height: 1.8;
    }

    /* SECTIONS */
    .section {
      margin-top: 40px;
    }

    .section-title {
      font-size: 12px;
      letter-spacing: 1.5px;
      color: #6b7280;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .address {
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      padding: 12px;
      font-family: monospace;
      font-size: 13px;
      word-break: break-all;
    }

    /* TABLE */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 40px;
    }

    th {
      text-align: left;
      font-size: 12px;
      color: #6b7280;
      border-bottom: 2px solid #111827;
      padding: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    td {
      padding: 14px 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
    }

    .mono {
      font-family: monospace;
      font-size: 13px;
    }

    .amount-row td {
      font-size: 18px;
      font-weight: 700;
      border-top: 2px solid #111827;
      border-bottom: none;
      padding-top: 20px;
    }

    /* FOOTER */
    .footer {
      margin-top: 60px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }

    @media print {
      body {
        padding: 0;
      }
      .invoice-wrapper {
        border: none;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    <div class="invoice-box">

      <div class="watermark">StablePay</div>

      <div class="header">
        <div class="logo">Stable<span>Pay</span></div>
        <div class="invoice-title">BLOCKCHAIN TRANSACTION INVOICE</div>
      </div>

      <div class="meta">
        <div>
          <strong>Date:</strong> ${date}<br />
          <strong>Network:</strong> ${network}
        </div>
        <div style="text-align:right;">
          <strong>Invoice ID:</strong><br />
          <span class="mono">${txId.slice(0, 16)}...</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">From (Buyer)</div>
        <div class="address">${sender}</div>
      </div>

      <div class="section">
        <div class="section-title">To (Receiver)</div>
        <div class="address">${receiver}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Transaction Hash</td>
            <td class="mono">${txId}</td>
          </tr>
          <tr>
            <td>Block Number</td>
            <td>${block}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>${status.toUpperCase()}</td>
          </tr>
          <tr class="amount-row">
            <td>Total Amount</td>
            <td>${amount}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        This invoice is system-generated and cryptographically verifiable on-chain.<br />
        © StablePay — Secure Digital Payments
      </div>

    </div>
  </div>

  <script>
    window.onload = () => window.print();
  </script>
</body>
</html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

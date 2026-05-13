// Google Apps Script — Tienda JJ Circuito Cultural
// Instrucciones:
//   1. Abrí el spreadsheet de pedidos
//   2. Extensiones → Apps Script
//   3. Pegá este código, guardá
//   4. Implementar → Nueva implementación → Aplicación web
//      · Ejecutar como: Yo
//      · Quién tiene acceso: Cualquier persona
//   5. Copiá la URL generada y agregala a .env.local como APPS_SCRIPT_URL

const SHEET_HEADERS = [
  "Código",
  "Fecha/Hora",
  "Nombre",
  "Apellido",
  "Teléfono",
  "Email",
  "Items",
  "Total",
  "Método de pago",
  "Retiro/Envío",
  "Dirección de envío",
  "Observaciones",
  "Confirmado",
  "Retirado",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    if (data.action === "confirm") {
      const lastRow = sheet.getLastRow();
      for (let i = 2; i <= lastRow; i++) {
        if (sheet.getRange(i, 1).getValue() === data.codigo) {
          sheet.getRange(i, 13).setValue("Sí");
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
        ContentService.MimeType.JSON
      );
    }

    // Add headers if first row is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(SHEET_HEADERS);
      sheet
        .getRange(1, 1, 1, SHEET_HEADERS.length)
        .setFontWeight("bold")
        .setBackground("#1a1a2e")
        .setFontColor("#ffffff");
    }

    sheet.appendRow([
      data.codigo,
      data.fechaHora,
      data.nombre,
      data.apellido,
      data.telefono,
      data.email,
      data.items,
      data.total,
      data.metodoPago,
      data.retiroEnvio,
      data.direccionEnvio || "",
      data.observaciones || "",
      data.confirmado,
      data.retirado,
    ]);

    sendConfirmationEmail(data);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data) {
  if (!data.email) return;

  const pagado = data.confirmado === "Sí";
  const pagoLabel = pagado
    ? '<span style="color:#16a34a;font-weight:bold;">✅ Pagado</span>'
    : '<span style="color:#d97706;font-weight:bold;">⏳ Pendiente de pago</span> — ' + data.metodoPago;

  const entregaLabel = data.retiroEnvio === "Envío a domicilio"
    ? "🚗 Envío a domicilio" + (data.direccionEnvio ? ": " + data.direccionEnvio : "")
    : "📍 Retiro en JJ — Jean Jaurés 347, CABA";

  const observacionesRow = data.observaciones
    ? '<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Observaciones</td><td style="padding:6px 0;font-size:13px;color:#e5e7eb;">' + data.observaciones + "</td></tr>"
    : "";

  const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border-radius:12px;overflow:hidden;max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="padding:32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="font-size:48px;margin-bottom:12px;">🍲</div>
            <h1 style="color:#fb923c;font-size:22px;margin:0 0 6px;">¡Gracias por tu pedido!</h1>
            <p style="color:#9ca3af;margin:0;font-size:14px;">LOCRAZO PATRIO · 25 de Mayo</p>
          </td>
        </tr>

        <!-- Order code -->
        <tr>
          <td style="padding:24px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1);">
            <p style="color:#9ca3af;font-size:12px;letter-spacing:2px;margin:0 0 8px;">CÓDIGO DE PEDIDO</p>
            <div style="font-size:36px;font-weight:bold;color:#a78bfa;letter-spacing:8px;font-family:monospace;">${data.codigo}</div>
            <p style="color:#6b7280;font-size:12px;margin:8px 0 0;">Guardá este código — lo vas a necesitar al retirar</p>
          </td>
        </tr>

        <!-- Detail -->
        <tr>
          <td style="padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.1);">
            <h2 style="color:#e5e7eb;font-size:15px;margin:0 0 16px;">Detalle del pedido</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;color:#6b7280;font-size:13px;vertical-align:top;width:40%;">Productos</td>
                <td style="padding:6px 0;font-size:13px;color:#e5e7eb;">${data.items.replace(/; /g, "<br>")}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;font-size:13px;">Total</td>
                <td style="padding:6px 0;font-size:16px;font-weight:bold;color:#a78bfa;">${data.total}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;font-size:13px;">Estado de pago</td>
                <td style="padding:6px 0;font-size:13px;">${pagoLabel}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280;font-size:13px;">Entrega</td>
                <td style="padding:6px 0;font-size:13px;color:#e5e7eb;">${entregaLabel}</td>
              </tr>
              ${observacionesRow}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px;text-align:center;">
            <p style="color:#6b7280;font-size:12px;margin:0;">JJ Circuito Cultural · Jean Jaurés 347, CABA</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  MailApp.sendEmail({
    to: data.email,
    subject: "Tu pedido en el Locrazo Patrio — Código " + data.codigo,
    htmlBody: htmlBody,
  });
}

// Test desde el editor de Apps Script:
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        codigo: "TEST01",
        fechaHora: "25/05/2026 12:00",
        nombre: "Juan",
        apellido: "Pérez",
        telefono: "1134567890",
        email: "juan@test.com",
        items: "Promo Nacional y Popular: Locro 1: con carne, sin picante / Locro 2: vegano sin TACC, con picante / Pastelito 1: batata / Pastelito 2: membrillo / Vino Kilka",
        total: "$48.330",
        metodoPago: "Transferencia bancaria",
        retiroEnvio: "Retiro en JJ",
        direccionEnvio: "",
        observaciones: "Sin sal por favor",
        confirmado: "No",
        retirado: "No",
      }),
    },
  };
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

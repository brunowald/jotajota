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

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
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

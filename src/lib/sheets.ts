// TODO: move to env var APPS_SCRIPT_URL when production environment variables are available
const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbxU79XgSJx640tASUKBNonUskGt6W4hMREfFOajOdaEtl9LgZLTr6uwdR01oYetkzkM_g/exec";

export async function saveToSheet(data: Record<string, string>): Promise<void> {
  const url = APPS_SCRIPT_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error("[sheets] saveToSheet error:", e);
  }
}

export async function confirmInSheet(codigo: string): Promise<void> {
  const url = APPS_SCRIPT_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "confirm", codigo }),
    });
  } catch (e) {
    console.error("[sheets] confirmInSheet error:", e);
  }
}

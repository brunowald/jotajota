// TODO: move to env var APPS_SCRIPT_URL when production environment variables are available
const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbyOfnsbb18ZHL2YrwSLPhNTjGqMwGQjzBzHt8cpl0mnpFQ12suqZJO2QfRFWpzD5cg2/exec";

export async function saveToSheet(data: Record<string, string | number>): Promise<void> {
  const url = APPS_SCRIPT_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
    });
    const text = await res.text();
    console.log("[sheets] status:", res.status, "| url:", res.url, "| body:", text.slice(0, 200));
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
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "confirm", codigo }),
    });
  } catch (e) {
    console.error("[sheets] confirmInSheet error:", e);
  }
}

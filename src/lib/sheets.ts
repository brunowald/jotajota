export async function saveToSheet(data: Record<string, string>): Promise<void> {
  const url = process.env.APPS_SCRIPT_URL;
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
  const url = process.env.APPS_SCRIPT_URL;
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

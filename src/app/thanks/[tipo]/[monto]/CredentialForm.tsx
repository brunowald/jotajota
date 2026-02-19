"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const CREDENTIAL_STORAGE_PREFIX = "jj_credential_";
const REDIRECT_AFTER_DOWNLOAD = "/comunidad";
const LOGO_URL = "/logo-jj-2025.png";
const CARD_WIDTH = 400;
const CARD_HEIGHT = 260;

function drawCredential(
  ctx: CanvasRenderingContext2D,
  nombre: string,
  apellido: string,
  dni: string,
  logo: HTMLImageElement
) {
  const dpr = 2;
  ctx.scale(dpr, dpr);
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT;

  ctx.fillStyle = "#0d1117";
  ctx.strokeStyle = "hsl(199, 89%, 48%)";
  ctx.lineWidth = 3;
  const r = 16;
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.fill();
  ctx.stroke();

  const logoSize = 72;
  const logoX = (w - logoSize) / 2;
  ctx.drawImage(logo, logoX, 24, logoSize, logoSize);

  ctx.fillStyle = "hsl(199, 89%, 48%)";
  ctx.font = "bold 18px Poppins, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("SOCIO/A", w / 2, 24 + logoSize + 22);
  ctx.font = "bold 22px Poppins, sans-serif";
  ctx.fillText("JJ CIRCUITO CULTURAL", w / 2, 24 + logoSize + 44);

  ctx.fillStyle = "#e6edf3";
  ctx.font = "600 20px Poppins, sans-serif";
  const fullName = [nombre, apellido].filter(Boolean).join(" ").trim() || "—";
  ctx.fillText(fullName, w / 2, 24 + logoSize + 78);

  ctx.fillStyle = "#8b949e";
  ctx.font = "14px Poppins, sans-serif";
  ctx.fillText(`DNI ${dni || "—"}`, w / 2, 24 + logoSize + 102);

  ctx.fillStyle = "#6e7681";
  ctx.font = "11px Poppins, sans-serif";
  ctx.fillText("Presentar junto al DNI físico", w / 2, h - 20);
}

function useDownloadCredential() {
  return useCallback(
    async (nombre: string, apellido: string, dni: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = CARD_WIDTH * 2;
      canvas.height = CARD_HEIGHT * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return false;

      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = LOGO_URL;
      });

      drawCredential(ctx, nombre, apellido, dni, img);
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `credencial-jj-${apellido || "socio"}.png`;
      a.click();
      return true;
    },
    []
  );
}

export default function CredentialForm() {
  const searchParams = useSearchParams();
  const paymentId =
    searchParams.get("payment_id") ?? searchParams.get("collection_id") ?? "";
  const allowedAccess = Boolean(paymentId);

  const [alreadyGenerated, setAlreadyGenerated] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const downloadCredential = useDownloadCredential();

  useEffect(() => {
    if (!paymentId) return;
    const key = `${CREDENTIAL_STORAGE_PREFIX}${paymentId}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(key)) {
      setAlreadyGenerated(true);
      window.location.href = REDIRECT_AFTER_DOWNLOAD;
    }
  }, [paymentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await downloadCredential(nombre, apellido, dni);
    if (ok && paymentId) {
      try {
        sessionStorage.setItem(`${CREDENTIAL_STORAGE_PREFIX}${paymentId}`, "1");
      } catch {}
      window.location.href = REDIRECT_AFTER_DOWNLOAD;
    }
  };

  if (!allowedAccess) {
    return null;
  }

  if (alreadyGenerated) {
    return (
      <section
        className="mt-5 p-4 rounded-3 border border-secondary border-opacity-50 bg-dark bg-opacity-50 text-center"
        style={{ maxWidth: 420 }}
      >
        <p className="text-muted mb-0">Ya descargaste tu credencial. Redirigiendo…</p>
      </section>
    );
  }

  return (
    <section
      className="mt-5 p-4 rounded-3 border border-primary border-opacity-50 bg-dark bg-opacity-50"
      style={{ maxWidth: 420 }}
    >
      <h2 className="h5 text-primary mb-3 text-center">
        Tu credencial de socio/a
      </h2>
      <p className="text-muted small text-center mb-3">
        Completá tus datos y descargá tu credencial.
      </p>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label text-light small">Nombre</label>
          <input
            type="text"
            className="form-control form-control-lg bg-dark border-secondary text-light"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label text-light small">Apellido</label>
          <input
            type="text"
            className="form-control form-control-lg bg-dark border-secondary text-light"
            placeholder="Tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label text-light small">DNI</label>
          <input
            type="text"
            className="form-control form-control-lg bg-dark border-secondary text-light"
            placeholder="Número de documento"
            value={dni}
            onChange={(e) =>
              setDni(e.target.value.replace(/\D/g, "").slice(0, 8))
            }
            required
            maxLength={8}
            inputMode="numeric"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg mt-2">
          Descargar credencial
        </button>
      </form>
    </section>
  );
}

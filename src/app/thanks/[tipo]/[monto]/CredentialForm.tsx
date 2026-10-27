"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const CREDENTIAL_STORAGE_PREFIX = "jj_credential_";
const REDIRECT_AFTER_DOWNLOAD = "/comunidad";
const LOGO_URL = "/logo-jj-2025.png";
const CARD_WIDTH = 506;
const CARD_HEIGHT = 319;
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;700&display=swap";
const STRIPE_COLORS = ["#fdb496", "#ec6535", "#e0352a", "#e9184c"];

async function loadCredentialFonts() {
  if (!document.querySelector(`link[href="${FONTS_URL}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
    await new Promise<void>((resolve) => {
      link.onload = () => resolve();
      link.onerror = () => resolve();
    });
  }
  try {
    await Promise.all([
      document.fonts.load('52px "Anton"'),
      document.fonts.load('700 22px "Manrope"'),
      document.fonts.load('400 17px "Manrope"'),
    ]);
  } catch {}
}

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

  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, 14);
  ctx.clip();

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#3d2259");
  bg.addColorStop(1, "#2f1944");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const stripeH = 11;
  const stripeW = w / STRIPE_COLORS.length;
  STRIPE_COLORS.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect(i * stripeW, h - stripeH, stripeW + 1, stripeH);
  });

  const logoSize = 134;
  ctx.drawImage(logo, (w - logoSize) / 2, 17, logoSize, logoSize);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = '52px "Anton", sans-serif';
  ctx.fillText("COMUNIDAD JJ", w / 2, 205, w - 40);

  const fullName = [nombre, apellido].filter(Boolean).join(" ").trim() || "—";
  ctx.font = '700 22px "Manrope", sans-serif';
  ctx.fillText(fullName, w / 2, 245, w - 40);

  ctx.fillStyle = "#fdb496";
  ctx.font = '400 17px "Manrope", sans-serif';
  ctx.fillText(`DNI ${formatDni(dni) || "—"}`, w / 2, 272);
}

function formatDni(dni: string) {
  return dni.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function useDownloadCredential() {
  return useCallback(
    async (nombre: string, apellido: string, dni: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = CARD_WIDTH * 2;
      canvas.height = CARD_HEIGHT * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return false;

      await loadCredentialFonts();

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
    searchParams.get("payment_id") ??
    searchParams.get("collection_id") ??
    searchParams.get("preapproval_id") ??
    "";
  const allowedAccess = Boolean(paymentId);

  const [alreadyGenerated, setAlreadyGenerated] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
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
        <div>
          <label className="form-label text-light small">Email</label>
          <input
            type="email"
            className="form-control form-control-lg bg-dark border-secondary text-light"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg mt-2">
          Descargar credencial
        </button>
      </form>
    </section>
  );
}

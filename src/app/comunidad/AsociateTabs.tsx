"use client";
import { useState } from "react";

export default function AsociateTabs({ mensualOptions, anualOptions }: { mensualOptions: { price: string, color: string, tipo: string, url: string }[], anualOptions: { price: string, color: string, tipo: string, url: string }[] }) {
  const [tab, setTab] = useState<'mensual' | 'anual'>('mensual');
  const options = tab === 'mensual' ? mensualOptions : anualOptions;
  return (
    <>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className={`btn ${tab === 'mensual' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('mensual')} type="button">MENSUAL</button>
        <button className={`btn ${tab === 'anual' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('anual')} type="button">ANUAL</button>
      </div>
      <div className="row g-3 mb-4">
        {options.map((opt, idx) => (
          <div className="col-6" key={idx}>
            <a
              href={opt.url}
              className="border rounded-3 p-3 text-center d-block text-decoration-none"
              style={{ color: "inherit" }}
            >
              <div className={`fs-4 fw-bold text-${opt.color}`}>{opt.price}</div>
              <div className="text-muted small">
                {opt.tipo === "Mensual" && "Por mes"}
                {opt.tipo === "Anual" && "Por año"}
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

"use client";
import { useState } from "react";

export default function SingleContribution({ unicavezOptions }: { unicavezOptions: { price: string, color: string, tipo: string, url: string }[] }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<number|null>(null);
  return (
    <div className="text-center border-top pt-3 mb-3">
      {!showOptions ? (
        <button className="btn btn-warning px-4 fw-bold text-light" onClick={() => setShowOptions(true)}>
          Hacer aporte único
        </button>
      ) : (
        <div>
          <p className="mb-2 text-muted">Elegí un monto para tu aporte único:</p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
            {unicavezOptions.map((opt, idx) => (
              <a
                key={idx}
                href={opt.url}
                className={`btn btn-outline-info fw-bold px-3 py-2${selected===idx ? ' active' : ''}`}
                onClick={() => setSelected(idx)}
                style={{ textDecoration: "none" }}
              >
                {opt.price}
              </a>
            ))}
          </div>
          <div>
            <button className="btn btn-link mt- text-secondary" onClick={() => setShowOptions(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";

export default function SingleContribution() {
  const [showOptions, setShowOptions] = useState(false);
  const amounts = [2000, 5000, 10000, 20000, 50000];
  const [selected, setSelected] = useState<number|null>(null);
  return (
    <div className="text-center border-top pt-3 mb-3">
      {!showOptions ? (
        <button className="btn btn-warning px-4 fw-bold text-dark" onClick={() => setShowOptions(true)}>
          Hacer aporte único
        </button>
      ) : (
        <div>
          <p className="mb-2 text-muted">Elegí un monto para tu aporte único:</p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
            {amounts.map((amt) => (
              <button
                key={amt}
                className={`btn btn-outline-info fw-bold px-3 py-2${selected===amt ? ' active' : ''}`}
                onClick={() => setSelected(amt)}
              >
                ${amt.toLocaleString("es-AR")}
              </button>
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

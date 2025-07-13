"use client";
import { useState } from "react";

const mensualOptions = [
  { price: "$6.000", color: "primary" },
  { price: "$8.000", color: "info" },
  { price: "$12.000", color: "danger" },
  { price: "$18.000", color: "success" },
  { price: "$24.000", color: "warning" },
  { price: "$30.000", color: "primary" },
];
const anualOptions = [
  { price: "$60.000", color: "primary" },
  { price: "$80.000", color: "info" },
  { price: "$120.000", color: "danger" },
  { price: "$180.000", color: "success" },
  { price: "$240.000", color: "warning" },
  { price: "$300.000", color: "primary" },
];

export default function AsociateTabs() {
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
            <div className="border rounded-3 p-3 text-center">
              <div className={`fs-4 fw-bold text-${opt.color}`}>{opt.price}</div>
              <div className="text-muted small">por mes</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

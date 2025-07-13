"use client";

import Link from "next/link";

export default function JJNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm border-bottom border-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/comunidad">
          <img src="/logo-jj-2025.png" alt="JJ Circuito Cultural Logo" width={56} height={56} className="me-3" style={{ objectFit: 'contain', boxShadow: '0 0 24px #0ff6', borderRadius: "100%" }} />
          <span className="fw-bold fs-4">CIRCUITO</span>
          <span className="fw-bold fs-4 ms-2 text-primary">CULTURAL</span>
          <span className="fw-bold fs-4 ms-2 text-dangera">JJ</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/comunidad">Comunidad</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/eventos">Eventos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/tienda">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

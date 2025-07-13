"use client";

import Link from "next/link";

export default function JJNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm border-bottom border-primary sticky-top py-0" style={{ minHeight: 64 }}>
      <div className="container-fluid px-3 px-lg-4">
        <Link className="navbar-brand d-flex flex-shrink-0 align-items-center" href="/comunidad">
          <img src="/logo-jj-2025.png" alt="JJ Circuito Cultural Logo" width={48} height={48} className="me-2" style={{ objectFit: 'contain', boxShadow: '0 0 24px #0ff6', borderRadius: "100%" }} />
          <span className="fw-bold fs-5 d-none d-sm-inline brand-full">
            <span>CIRCUITO CULTURAL</span>
            <span className="ms-2 text-info">JJ</span>
          </span>
        </Link>
        <button className="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center gap-lg-2">
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

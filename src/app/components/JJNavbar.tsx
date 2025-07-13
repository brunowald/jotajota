"use client";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function JJNavbar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm border-bottom border-primary sticky-top py-0" style={{ minHeight: 64 }}>
      <Container fluid className="px-3 px-lg-4">
        <Navbar.Brand as={Link} href="/comunidad" className="d-flex flex-shrink-0 align-items-center">
          <img src="/logo-jj-2025.png" alt="JJ Circuito Cultural Logo" width={48} height={48} className="me-2" style={{ objectFit: 'contain', boxShadow: '0 0 24px #0ff6', borderRadius: "100%" }} />
          <span className="fw-bold fs-5 d-none d-sm-inline brand-full">
            <span>CIRCUITO CULTURAL</span>
            <span className="ms-2 text-info">JJ</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" className="ms-2" />
        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <Nav className="mb-2 mb-lg-0 d-flex align-items-center gap-lg-2">
            <Nav.Link as={Link} href="/comunidad">Comunidad</Nav.Link>
            <Nav.Link as={Link} href="/eventos">Eventos</Nav.Link>
            <Nav.Link as={Link} href="/tienda">Tienda</Nav.Link>
            <Nav.Link as={Link} href="/contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

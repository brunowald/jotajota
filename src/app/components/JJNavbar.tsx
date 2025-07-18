"use client";
import Link from "next/link";
import Image from "next/image";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";


import styles from "./JJNavbar.module.scss";
import { usePathname } from "next/navigation";


const JJNavbar = () => {
  const navLinks = [
    { href: "/comunidad", label: "Comunidad" },
    { href: "/eventos", label: "Eventos" },
    { href: "/tienda", label: "Tienda" },
    { href: "/contacto", label: "Contacto" },
  ];

  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close on outside click (mobile only)
  useEffect(() => {
    if (!expanded) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [expanded]);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className={styles["custom-navbar"] + " shadow-sm border-bottom border-primary sticky-top py-2"}
      style={{ minHeight: 64 }}
    >
      <Container fluid className="px-3 px-lg-4">
        <Navbar.Brand as={Link} href="/comunidad" className="d-flex flex-shrink-0 align-items-center">
          <span className={styles["logo-circle"] + " me-2"}>
            <Image src="/logo-jj-2025.png" alt="JJ Circuito Cultural Logo" width={40} height={40} style={{ objectFit: 'contain' }} />
          </span>
          <span className="fw-bold fs-5 d-none d-sm-inline brand-full">
            <span className={styles["brand-text"]}>CIRCUITO CULTURAL</span>
            <span className={styles["brand-accent"] + " ms-2"}>JJ</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarNav"
          className={`mb-2 ${styles["navbar-toggler"]}`}
          onClick={() => setExpanded((prev) => !prev)}
        />
        <Navbar.Collapse
          id="navbarNav"
          className={styles["navbar-collapse"] + " justify-content-end"}
          ref={navRef}
        >
          <Nav className="mb-2 mb-lg-0 d-flex align-items-center gap-lg-2">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Nav.Link
                  as={Link}
                  href={href}
                  key={href}
                  className={
                    styles["nav-link"] + (isActive ? " " + styles["active"] : "")
                  }
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setExpanded(false)}
                >
                  {label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default JJNavbar;

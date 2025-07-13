import { usePathname } from "next/navigation";

export function useActiveNavLink(href: string) {
  const pathname = usePathname();
  if (href === "/comunidad" && pathname === "/") return false; // Home is not comunidad
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export type CustomizationOption = { value: string; label: string };

export type CustomizationDef = {
  id: string;
  label: string;
  options: CustomizationOption[];
};

export type PromoIncludes = {
  locroQty: number;
  pastelitoQty: number;
  bebidaLabel: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: "promo" | "comida" | "bebida";
  price: number | null;
  customizations?: CustomizationDef[];
  promoIncludes?: PromoIncludes;
  available: boolean;
};

export type PromoSlot = {
  slotId: string;
  type: "locro" | "pastelito";
  index: number;
  values: Record<string, string>;
};

export type CartEntry = {
  entryId: string;
  productId: string;
  customizations: Record<string, string>;
  promoSlots?: PromoSlot[];
};

export const LOCRO_CUSTOMIZATIONS: CustomizationDef[] = [
  {
    id: "tipo",
    label: "Tipo",
    options: [
      { value: "carne", label: "Con carne" },
      { value: "vegano", label: "Vegano sin TACC" },
    ],
  },
  {
    id: "picante",
    label: "Picante",
    options: [
      { value: "sin-picante", label: "Sin picante" },
      { value: "con-picante", label: "Con picante 🌶️" },
    ],
  },
];

export const PASTELITO_CUSTOMIZATIONS: CustomizationDef[] = [
  {
    id: "relleno",
    label: "Relleno",
    options: [
      { value: "batata", label: "Batata" },
      { value: "membrillo", label: "Membrillo" },
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "promo-nacional",
    name: "Nacional y Popular",
    description: "2 locros + Vino Kilka + 2 pastelitos",
    emoji: "🇦🇷",
    category: "promo",
    price: 48330,
    promoIncludes: { locroQty: 2, pastelitoQty: 2, bebidaLabel: "Vino Kilka" },
    available: true,
  },
  {
    id: "promo-atrevidxs",
    name: "Solo para Atrevidxs",
    description: "2 locros + 2 Stella Artois + 2 pastelitos",
    emoji: "🌶️",
    category: "promo",
    price: 45900,
    promoIncludes: { locroQty: 2, pastelitoQty: 2, bebidaLabel: "2 Stella Artois" },
    available: true,
  },
  {
    id: "promo-familia",
    name: "Los domingos en familia",
    description: "4 locros + 2 Portillos + 4 pastelitos",
    emoji: "👨‍👩‍👧‍👦",
    category: "promo",
    price: 90360,
    promoIncludes: { locroQty: 4, pastelitoQty: 4, bebidaLabel: "2 Portillos" },
    available: true,
  },
  {
    id: "locro",
    name: "Locro",
    description: "Tradicional guiso argentino",
    emoji: "🍲",
    category: "comida",
    price: 15000,
    customizations: LOCRO_CUSTOMIZATIONS,
    available: true,
  },
  {
    id: "pastelito",
    name: "Pastelito",
    description: "De batata o membrillo",
    emoji: "🥐",
    category: "comida",
    price: 2600,
    customizations: PASTELITO_CUSTOMIZATIONS,
    available: true,
  },
  {
    id: "vino-kilka",
    name: "Vino Kilka",
    description: "",
    emoji: "🍷",
    category: "bebida",
    price: 16650,
    available: true,
  },
  {
    id: "stella",
    name: "Stella Artois",
    description: "Lata",
    emoji: "🍺",
    category: "bebida",
    price: 7110,
    available: true,
  },
  {
    id: "portillos",
    name: "Portillos",
    description: "",
    emoji: "🍷",
    category: "bebida",
    price: 13500,
    available: true,
  },
  {
    id: "sin-alcohol",
    name: "Stella sin alcohol",
    description: "Lata",
    emoji: "🍺",
    category: "bebida",
    price: 6030,
    available: true,
  },
  {
    id: "michebol",
    name: "Michelob Ultra",
    description: "Sin TACC · Lata",
    emoji: "🍺",
    category: "bebida",
    price: 6660,
    available: true,
  },
];

export function createPromoSlots(product: Product): PromoSlot[] {
  if (!product.promoIncludes) return [];
  const slots: PromoSlot[] = [];
  for (let i = 0; i < product.promoIncludes.locroQty; i++) {
    slots.push({ slotId: `locro-${i}`, type: "locro", index: i + 1, values: {} });
  }
  for (let i = 0; i < product.promoIncludes.pastelitoQty; i++) {
    slots.push({ slotId: `pastelito-${i}`, type: "pastelito", index: i + 1, values: {} });
  }
  return slots;
}

export function isModalComplete(
  productId: string,
  values: Record<string, string>,
  promoSlots: PromoSlot[]
): boolean {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return false;
  if (product.category === "promo") {
    return promoSlots.every((slot) => {
      if (slot.type === "locro") return Boolean(slot.values["tipo"]) && Boolean(slot.values["picante"]);
      if (slot.type === "pastelito") return Boolean(slot.values["relleno"]);
      return true;
    });
  }
  if (!product.customizations?.length) return true;
  return product.customizations.every((c) => Boolean(values[c.id]));
}

export function getLocroPrice(tipo?: string, picante?: string): number {
  const base = tipo === "vegano" ? 14000 : 15000;
  return picante === "con-picante" ? base + 1000 : base;
}

export function calculateTotal(
  entries: CartEntry[],
  quantities: Record<string, number>,
  entrega: "retiro" | "envio"
): number {
  let total = 0;
  for (const entry of entries) {
    const product = PRODUCTS.find((p) => p.id === entry.productId);
    if (!product) continue;
    if (product.category === "promo") total += product.price ?? 0;
    else if (product.id === "locro")
      total += getLocroPrice(entry.customizations["tipo"], entry.customizations["picante"]);
    else if (product.id === "pastelito") total += 2600;
  }
  for (const product of PRODUCTS.filter(
    (p) => p.category === "bebida" && p.available && p.price !== null
  )) {
    total += (product.price ?? 0) * (quantities[product.id] || 0);
  }
  if (entrega === "envio") total += 3000;
  return total;
}

export function cartHasItems(
  entries: CartEntry[],
  quantities: Record<string, number>
): boolean {
  return entries.length > 0 || Object.values(quantities).some((q) => q > 0);
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("es-AR")}`;
}

export function formatOrderItems(
  entries: CartEntry[],
  quantities: Record<string, number>
): string {
  const parts: string[] = [];

  for (const entry of entries) {
    const product = PRODUCTS.find((p) => p.id === entry.productId);
    if (!product) continue;

    if (product.category === "promo") {
      const locroStr = (entry.promoSlots ?? [])
        .filter((s) => s.type === "locro")
        .map((s) => {
          const tipo = s.values["tipo"] === "vegano" ? "vegano sin TACC" : "con carne";
          const picante = s.values["picante"] === "con-picante" ? "con picante" : "sin picante";
          return `Locro ${s.index}: ${tipo}, ${picante}`;
        })
        .join(" / ");
      const pasStr = (entry.promoSlots ?? [])
        .filter((s) => s.type === "pastelito")
        .map((s) => `Pastelito ${s.index}: ${s.values["relleno"] ?? "?"}`)
        .join(" / ");
      parts.push(`Promo ${product.name}: ${locroStr} / ${pasStr} / ${product.promoIncludes!.bebidaLabel}`);
    } else if (product.id === "locro") {
      const tipo = entry.customizations["tipo"] === "vegano" ? "vegano sin TACC" : "con carne";
      const picante = entry.customizations["picante"] === "con-picante" ? "con picante" : "sin picante";
      parts.push(`Locro: ${tipo}, ${picante}`);
    } else if (product.id === "pastelito") {
      parts.push(`Pastelito: de ${entry.customizations["relleno"] ?? "?"}`);
    }
  }

  for (const product of PRODUCTS.filter(
    (p) => p.category === "bebida" && p.available && p.price !== null
  )) {
    const qty = quantities[product.id] || 0;
    if (qty > 0) parts.push(qty > 1 ? `${qty}x ${product.name}` : product.name);
  }

  return parts.join("; ");
}

"use client";

import { useState, useRef, useEffect } from "react";

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}
import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";
import {
  PRODUCTS,
  LOCRO_CUSTOMIZATIONS,
  PASTELITO_CUSTOMIZATIONS,
  type CartEntry,
  type PromoSlot,
  createPromoSlots,
  isModalComplete,
  calculateTotal,
  cartHasItems,
  formatPrice,
  getLocroPrice,
} from "./products";

// ── Types ─────────────────────────────────────────────────

type OrderForm = {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  metodoPago: "mp" | "transferencia" | "retiro";
  entrega: "retiro" | "envio";
  direccion: string;
  observaciones: string;
};

type FormErrors = Partial<Record<keyof OrderForm, string>>;

type ModalState = {
  isOpen: boolean;
  productId: string;
  mode: "add" | "edit";
  editEntryId?: string;
};

// ── Customization Modal ────────────────────────────────────

function CustomizationModal({
  state,
  values,
  promoSlots,
  onValuesChange,
  onPromoSlotChange,
  onConfirm,
  onClose,
}: {
  state: ModalState;
  values: Record<string, string>;
  promoSlots: PromoSlot[];
  onValuesChange: (v: Record<string, string>) => void;
  onPromoSlotChange: (slotId: string, field: string, value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (!state.isOpen) setShowErrors(false);
  }, [state.isOpen]);

  const product = PRODUCTS.find((p) => p.id === state.productId);
  if (!product) return null;

  const complete = isModalComplete(state.productId, values, promoSlots);
  const isPromo = product.category === "promo";
  const isEdit = state.mode === "edit";

  const locroSlots = promoSlots.filter((s) => s.type === "locro");
  const pasSlots = promoSlots.filter((s) => s.type === "pastelito");

  const handleConfirmClick = () => {
    if (!complete) {
      setShowErrors(true);
      return;
    }
    onConfirm();
  };

  return (
    <Modal show={state.isOpen} onHide={onClose} centered size={isPromo ? "lg" : undefined}>
      <Modal.Header
        closeButton
        className="border-secondary"
        style={{ background: "#1a1a2e" }}
      >
        <Modal.Title className="text-light fw-bold" style={{ fontSize: "1.05rem" }}>
          {isPromo
            ? `🎉 Promo ${product.name}`
            : `${product.emoji} Personalizá tu ${product.name}`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: "#1a1a2e" }}>
        {/* Individual item */}
        {!isPromo && product.customizations?.map((cust) => {
          const missing = showErrors && !values[cust.id];
          return (
            <div key={cust.id} className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <label className={`small fw-bold mb-0 ${missing ? "text-danger" : "text-secondary"}`}>
                  {cust.label}
                </label>
                {missing && (
                  <span className="badge bg-danger" style={{ fontSize: "0.65rem" }}>Requerido</span>
                )}
              </div>
              <div
                className={`d-flex flex-wrap gap-2 p-2 rounded-2 ${missing ? "border border-danger" : ""}`}
                style={missing ? { background: "rgba(220,38,38,0.06)" } : undefined}
              >
                {cust.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`btn ${
                      values[cust.id] === opt.value
                        ? "btn-primary"
                        : missing
                        ? "btn-outline-danger"
                        : "btn-outline-secondary"
                    }`}
                    style={{ fontSize: "0.85rem" }}
                    onClick={() => {
                      onValuesChange({ ...values, [cust.id]: opt.value });
                      setShowErrors(false);
                    }}
                  >
                    {opt.label}
                    {cust.id === "tipo" && opt.value === "carne" && (
                      <span className="ms-1 text-warning" style={{ fontSize: "0.75rem" }}>$15.000</span>
                    )}
                    {cust.id === "tipo" && opt.value === "vegano" && (
                      <span className="ms-1 text-warning" style={{ fontSize: "0.75rem" }}>$14.000</span>
                    )}
                    {cust.id === "picante" && opt.value === "con-picante" && (
                      <span className="ms-1 text-warning" style={{ fontSize: "0.75rem" }}>+$1.000</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Promo slots */}
        {isPromo && (
          <div className="d-flex flex-column gap-4">
            {locroSlots.map((slot) => (
              <div
                key={slot.slotId}
                className="rounded-3 p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="fw-bold text-light mb-3">🍲 Locro {slot.index}</div>
                {LOCRO_CUSTOMIZATIONS.map((cust) => {
                  const missing = showErrors && !slot.values[cust.id];
                  return (
                    <div key={cust.id} className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <label className={`small fw-bold mb-0 ${missing ? "text-danger" : "text-secondary"}`}>
                          {cust.label}
                        </label>
                        {missing && (
                          <span className="badge bg-danger" style={{ fontSize: "0.65rem" }}>Requerido</span>
                        )}
                      </div>
                      <div
                        className={`d-flex flex-wrap gap-2 p-2 rounded-2 ${missing ? "border border-danger" : ""}`}
                        style={missing ? { background: "rgba(220,38,38,0.06)" } : undefined}
                      >
                        {cust.options.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`btn btn-sm ${
                              slot.values[cust.id] === opt.value
                                ? "btn-primary"
                                : missing
                                ? "btn-outline-danger"
                                : "btn-outline-secondary"
                            }`}
                            style={{ fontSize: "0.82rem" }}
                            onClick={() => {
                              onPromoSlotChange(slot.slotId, cust.id, opt.value);
                              setShowErrors(false);
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {pasSlots.map((slot) => (
              <div
                key={slot.slotId}
                className="rounded-3 p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="fw-bold text-light mb-3">🥐 Pastelito {slot.index}</div>
                {PASTELITO_CUSTOMIZATIONS.map((cust) => {
                  const missing = showErrors && !slot.values[cust.id];
                  return (
                    <div key={cust.id} className="mb-2">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <label className={`small fw-bold mb-0 ${missing ? "text-danger" : "text-secondary"}`}>
                          {cust.label}
                        </label>
                        {missing && (
                          <span className="badge bg-danger" style={{ fontSize: "0.65rem" }}>Requerido</span>
                        )}
                      </div>
                      <div
                        className={`d-flex flex-wrap gap-2 p-2 rounded-2 ${missing ? "border border-danger" : ""}`}
                        style={missing ? { background: "rgba(220,38,38,0.06)" } : undefined}
                      >
                        {cust.options.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`btn btn-sm ${
                              slot.values[cust.id] === opt.value
                                ? "btn-primary"
                                : missing
                                ? "btn-outline-danger"
                                : "btn-outline-secondary"
                            }`}
                            style={{ fontSize: "0.82rem" }}
                            onClick={() => {
                              onPromoSlotChange(slot.slotId, cust.id, opt.value);
                              setShowErrors(false);
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-secondary" style={{ background: "#1a1a2e" }}>
        {showErrors && !complete && (
          <span className="text-danger small me-auto">⚠️ Completá todas las opciones</span>
        )}
        <button className="btn btn-outline-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn btn-primary fw-bold" onClick={handleConfirmClick}>
          {isEdit ? "Guardar cambios" : "Agregar al pedido ✓"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

// ── Sub-components ─────────────────────────────────────────

function QuantityControl({
  quantity,
  onDecrement,
  onIncrement,
  accent = false,
}: {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  accent?: boolean;
}) {
  const color = accent ? "warning" : "primary";
  return (
    <div className="d-flex align-items-center justify-content-center gap-3">
      <button
        className={`btn btn-outline-${color} btn-sm fw-bold`}
        style={{ width: 34, height: 34, borderRadius: "50%", padding: 0 }}
        onClick={onDecrement}
        disabled={quantity === 0}
        aria-label="Quitar"
      >
        −
      </button>
      <span
        className="fw-bold fs-5 text-light"
        style={{ minWidth: 28, textAlign: "center", fontVariantNumeric: "tabular-nums" }}
      >
        {quantity}
      </span>
      <button
        className={`btn btn-${color} btn-sm fw-bold`}
        style={{ width: 34, height: 34, borderRadius: "50%", padding: 0 }}
        onClick={onIncrement}
        aria-label="Agregar"
      >
        +
      </button>
    </div>
  );
}

function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
  accent,
}: {
  product: (typeof PRODUCTS)[0];
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  accent?: boolean;
}) {
  const unavailable = !product.available || product.price === null;
  const isCustomizable = Boolean(product.customizations?.length) || product.category === "promo";

  return (
    <div
      className="card h-100 bg-dark"
      style={{
        border: accent ? "2px solid rgba(234,179,8,0.5)" : "1px solid rgba(255,255,255,0.1)",
        opacity: unavailable ? 0.55 : 1,
      }}
    >
      <div className="card-body d-flex flex-column text-center p-3">
        <div className="mb-2" style={{ fontSize: accent ? 52 : 38 }}>
          {product.emoji}
        </div>
        {accent && (
          <span className="badge bg-warning text-dark mb-2 align-self-center">PROMO</span>
        )}
        <h5 className={`fw-bold mb-1 ${accent ? "text-warning" : "text-light"}`} style={{ fontSize: accent ? "1rem" : "0.92rem" }}>
          {product.name}
        </h5>
        {product.description && (
          <p className="text-secondary mb-1" style={{ fontSize: "0.75rem" }}>
            {product.description}
          </p>
        )}

        {/* Promo includes */}
        {product.promoIncludes && (
          <ul className="list-unstyled small text-light text-center my-2 mb-3">
            <li>🍲 {product.promoIncludes.locroQty} locro{product.promoIncludes.locroQty > 1 ? "s" : ""} <span className="text-secondary">(Carne o Vegano sin TACC / Con o sin picante)</span></li>
            <li>🥐 {product.promoIncludes.pastelitoQty} pastelito{product.promoIncludes.pastelitoQty > 1 ? "s" : ""} <span className="text-secondary">(Batata o Membrillo)</span></li>
            <li>{product.id === "promo-atrevidxs" ? "🍺" : "🍷"} {product.promoIncludes.bebidaLabel}</li>
          </ul>
        )}

        <div className="mb-3">
          {product.id === "locro" ? (
            <span className="text-info small">$14.000 – $16.000</span>
          ) : unavailable ? (
            <span className="text-muted small fst-italic">Sin precio disponible</span>
          ) : (
            <span className={`fw-bold ${accent ? "text-warning fs-5" : "text-info"}`}>
              {formatPrice(product.price!)}
            </span>
          )}
        </div>


        <div className="mt-auto">
          {unavailable ? (
            <span className="badge bg-secondary py-2 px-3">Próximamente</span>
          ) : quantity === 0 ? (
            <button
              className={`btn btn-sm fw-bold w-100 ${accent ? "btn-warning text-dark" : "btn-outline-primary"}`}
              onClick={onAdd}
            >
              {isCustomizable ? "Agregar y personalizar" : "Agregar"}
            </button>
          ) : isCustomizable ? (
            <div className="d-flex align-items-center justify-content-center gap-2">
              <button
                className="btn btn-outline-danger btn-sm"
                style={{ width: 34, height: 34, borderRadius: "50%", padding: 0 }}
                onClick={onRemove}
                aria-label="Quitar último"
              >
                −
              </button>
              <span className="fw-bold text-light mx-2" style={{ minWidth: 24, textAlign: "center" }}>
                {quantity}
              </span>
              <button
                className={`btn btn-sm fw-bold ${accent ? "btn-warning text-dark" : "btn-primary"}`}
                style={{ width: 34, height: 34, borderRadius: "50%", padding: 0 }}
                onClick={onAdd}
                aria-label="Agregar otro"
              >
                +
              </button>
            </div>
          ) : (
            <QuantityControl
              quantity={quantity}
              onDecrement={onRemove}
              onIncrement={onAdd}
              accent={accent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CartSummary({
  entries,
  quantities,
  entrega,
  total,
  onEdit,
  onRemove,
}: {
  entries: CartEntry[];
  quantities: Record<string, number>;
  entrega: "retiro" | "envio";
  total: number;
  onEdit: (entryId: string) => void;
  onRemove: (entryId: string) => void;
}) {
  const bebidas = PRODUCTS.filter(
    (p) => p.category === "bebida" && p.available && p.price !== null && (quantities[p.id] || 0) > 0
  );

  return (
    <div className="card border-primary bg-dark">
      <div className="card-body p-4">
        <h4 className="text-primary fw-bold mb-4">🛒 Tu pedido</h4>
        <div className="d-flex flex-column gap-3">
          {/* Customizable entries */}
          {entries.map((entry) => {
            const product = PRODUCTS.find((p) => p.id === entry.productId);
            if (!product) return null;

            const isLocro = product.id === "locro";
            const isPastelito = product.id === "pastelito";
            const isPromo = product.category === "promo";

            let price = 0;
            if (isPromo) price = product.price ?? 0;
            else if (isLocro) price = getLocroPrice(entry.customizations["tipo"], entry.customizations["picante"]);
            else if (isPastelito) price = 2600;

            return (
              <div key={entry.entryId} className="pb-3 border-bottom border-secondary">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="flex-grow-1">
                    <span className="fw-semibold text-light">
                      {isPromo ? `Promo ${product.name}` : product.name}
                    </span>

                    {/* Individual item details */}
                    {(isLocro || isPastelito) && (
                      <div className="text-secondary mt-1" style={{ fontSize: "0.8rem" }}>
                        {isLocro && (
                          <>
                            {entry.customizations["tipo"] === "vegano" ? "Vegano sin TACC" : "Con carne"}
                            {entry.customizations["picante"] === "con-picante" ? " · con picante 🌶️" : " · sin picante"}
                          </>
                        )}
                        {isPastelito && `De ${entry.customizations["relleno"]}`}
                      </div>
                    )}

                    {/* Promo slot details */}
                    {isPromo && entry.promoSlots && (
                      <ul className="list-unstyled mt-2 mb-0 ps-1">
                        {entry.promoSlots.filter((s) => s.type === "locro").map((s) => (
                          <li key={s.slotId} className="text-secondary" style={{ fontSize: "0.78rem" }}>
                            • Locro {s.index}:{" "}
                            {s.values["tipo"] === "vegano" ? "Vegano sin TACC" : "Con carne"}
                            {s.values["picante"] === "con-picante" ? ", con picante 🌶️" : ", sin picante"}
                          </li>
                        ))}
                        {entry.promoSlots.filter((s) => s.type === "pastelito").map((s) => (
                          <li key={s.slotId} className="text-secondary" style={{ fontSize: "0.78rem" }}>
                            • Pastelito {s.index}: De {s.values["relleno"]}
                          </li>
                        ))}
                        <li className="text-secondary" style={{ fontSize: "0.78rem" }}>
                          • {product.promoIncludes!.bebidaLabel}
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="d-flex flex-column align-items-end gap-1 flex-shrink-0">
                    <span className="text-info fw-bold">{formatPrice(price)}</span>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        style={{ fontSize: "0.72rem", padding: "2px 8px" }}
                        onClick={() => onEdit(entry.entryId)}
                      >
                        Modificar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        style={{ fontSize: "0.72rem", padding: "2px 8px" }}
                        onClick={() => onRemove(entry.entryId)}
                        aria-label="Eliminar"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bebidas (non-customizable) */}
          {bebidas.map((product) => {
            const qty = quantities[product.id] || 0;
            return (
              <div key={product.id} className="pb-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
                <span className="text-light">
                  {product.emoji} {qty > 1 ? `${product.name} × ${qty}` : product.name}
                </span>
                <span className="text-info fw-bold">{formatPrice(product.price! * qty)}</span>
              </div>
            );
          })}

          {/* Delivery */}
          {entrega === "envio" && (
            <div className="d-flex justify-content-between text-secondary pb-3 border-bottom border-secondary">
              <span>🚗 Envío a domicilio</span>
              <span>{formatPrice(3000)}</span>
            </div>
          )}

          {/* Total */}
          <div className="d-flex justify-content-between align-items-center pt-1">
            <span className="text-light fw-bold fs-5">TOTAL</span>
            <span className="text-primary fw-bold fs-4">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────

export default function FoodStore() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  // Cart state
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Modal state
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    productId: "",
    mode: "add",
  });
  const [modalValues, setModalValues] = useState<Record<string, string>>({});
  const [modalPromoSlots, setModalPromoSlots] = useState<PromoSlot[]>([]);

  // Order flow
  const [step, setStep] = useState<"shop" | "form">("shop");
  const [form, setForm] = useState<OrderForm>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    metodoPago: "transferencia",
    entrega: "retiro",
    direccion: "",
    observaciones: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Modal handlers ──────────────────────────────────────

  const openAddModal = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    setModalValues({});
    setModalPromoSlots(createPromoSlots(product));
    setModal({ isOpen: true, productId, mode: "add" });
  };

  const openEditModal = (entryId: string) => {
    const entry = entries.find((e) => e.entryId === entryId)!;
    setModalValues({ ...entry.customizations });
    setModalPromoSlots(
      (entry.promoSlots ?? []).map((s) => ({ ...s, values: { ...s.values } }))
    );
    setModal({ isOpen: true, productId: entry.productId, mode: "edit", editEntryId: entryId });
  };

  const handlePromoSlotChange = (slotId: string, field: string, value: string) => {
    setModalPromoSlots((prev) =>
      prev.map((s) => (s.slotId === slotId ? { ...s, values: { ...s.values, [field]: value } } : s))
    );
  };

  const handleConfirmModal = () => {
    const product = PRODUCTS.find((p) => p.id === modal.productId)!;
    const hasPromoSlots = product.category === "promo";

    if (modal.mode === "add") {
      const newEntry: CartEntry = {
        entryId: genId(),
        productId: modal.productId,
        customizations: modalValues,
        promoSlots: hasPromoSlots ? modalPromoSlots : undefined,
      };
      setEntries((prev) => [...prev, newEntry]);
    } else {
      setEntries((prev) =>
        prev.map((e) =>
          e.entryId === modal.editEntryId
            ? { ...e, customizations: modalValues, promoSlots: hasPromoSlots ? modalPromoSlots : undefined }
            : e
        )
      );
    }
    setModal((m) => ({ ...m, isOpen: false }));
  };

  // ── Cart handlers ───────────────────────────────────────

  const handleAdd = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    const isCustomizable = Boolean(product.customizations?.length) || product.category === "promo";
    if (isCustomizable) {
      openAddModal(productId);
    } else {
      setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    }
    if (step === "form") setStep("shop");
  };

  const handleRemove = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    const isCustomizable = Boolean(product.customizations?.length) || product.category === "promo";
    if (isCustomizable) {
      setEntries((prev) => {
        const lastIdx = [...prev].map((e, i) => ({ e, i })).filter(({ e }) => e.productId === productId).at(-1)?.i;
        if (lastIdx === undefined) return prev;
        return prev.filter((_, i) => i !== lastIdx);
      });
    } else {
      setQuantities((prev) => ({ ...prev, [productId]: Math.max(0, (prev[productId] || 0) - 1) }));
    }
  };

  const handleRemoveEntry = (entryId: string) => {
    setEntries((prev) => prev.filter((e) => e.entryId !== entryId));
  };

  // ── Counts for product grid ─────────────────────────────

  const getCount = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    const isCustomizable = Boolean(product.customizations?.length) || product.category === "promo";
    return isCustomizable
      ? entries.filter((e) => e.productId === productId).length
      : quantities[productId] || 0;
  };

  // ── Order form ──────────────────────────────────────────

  const hasCart = cartHasItems(entries, quantities);
  const cartTotal = calculateTotal(entries, quantities, form.entrega);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!form.nombre.trim()) errors.nombre = "Campo requerido";
    if (!form.apellido.trim()) errors.apellido = "Campo requerido";
    if (!form.telefono.trim()) errors.telefono = "Campo requerido";
    if (!form.email.trim()) errors.email = "Campo requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Email inválido";
    if (form.entrega === "envio" && !form.direccion.trim())
      errors.direccion = "Ingresá la dirección de envío";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalizarCompra = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tienda/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries, quantities, form, total: cartTotal }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Error desconocido");
      if (data.mpCheckoutUrl) {
        window.location.href = data.mpCheckoutUrl;
      } else {
        router.push(`/tienda/pedido-exitoso?codigo=${data.codigo}&metodo=${form.metodoPago}`);
      }
    } catch {
      alert("Hubo un error al procesar tu pedido. Por favor intentá de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const promos = PRODUCTS.filter((p) => p.category === "promo");
  const comidas = PRODUCTS.filter((p) => p.category === "comida");
  const bebidas = PRODUCTS.filter((p) => p.category === "bebida");

  return (
    <div>
      {/* Modal */}
      <CustomizationModal
        state={modal}
        values={modalValues}
        promoSlots={modalPromoSlots}
        onValuesChange={setModalValues}
        onPromoSlotChange={handlePromoSlotChange}
        onConfirm={handleConfirmModal}
        onClose={() => setModal((m) => ({ ...m, isOpen: false }))}
      />

      {/* Event banner */}
      <div className="text-center mb-5">
        <div
          className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill mb-3"
          style={{
            background: "linear-gradient(90deg, rgba(245,158,11,0.12), rgba(239,68,68,0.12))",
            border: "1px solid rgba(245,158,11,0.4)",
          }}
        >
          <span style={{ color: "#f59e0b" }}>🗓️</span>
          <span className="fw-bold small" style={{ color: "#f59e0b", letterSpacing: 1 }}>
            EVENTO ESPECIAL · 25 DE MAYO
          </span>
        </div>
        <h2 className="display-5 fw-bold mb-2" style={{ color: "#fb923c" }}>
          🍲 LOCRAZO PATRIO
        </h2>
        <p className="text-secondary mb-0">Retiro en Jean Jaurés 347 · Envíos a CABA</p>
      </div>

      {/* PROMOS */}
      <section className="mb-5">
        <div className="d-flex align-items-center gap-2 mb-4">
          <h3 className="fw-bold text-warning mb-0">Promos</h3>
          <span className="badge bg-warning text-dark">¡Aprovechalas!</span>
        </div>
        <div className="row g-4">
          {promos.map((product) => (
            <div className="col-md-4" key={product.id}>
              <ProductCard
                product={product}
                quantity={getCount(product.id)}
                onAdd={() => handleAdd(product.id)}
                onRemove={() => handleRemove(product.id)}
                accent
              />
            </div>
          ))}
        </div>
      </section>

      {/* COMIDAS */}
      <section className="mb-5">
        <h3 className="fw-bold text-light mb-4">🍲 Comidas</h3>
        <div className="row g-3">
          {comidas.map((product) => (
            <div className="col-6 col-md-4" key={product.id}>
              <ProductCard
                product={product}
                quantity={getCount(product.id)}
                onAdd={() => handleAdd(product.id)}
                onRemove={() => handleRemove(product.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* BEBIDAS */}
      <section className="mb-5">
        <h3 className="fw-bold text-light mb-4">🍷 Bebidas</h3>
        <div className="row g-3">
          {bebidas.map((product) => (
            <div className="col-6 col-sm-4 col-md-3" key={product.id}>
              <ProductCard
                product={product}
                quantity={getCount(product.id)}
                onAdd={() => handleAdd(product.id)}
                onRemove={() => handleRemove(product.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CART SUMMARY */}
      {hasCart && (
        <section className="mb-4">
          <CartSummary
            entries={entries}
            quantities={quantities}
            entrega={form.entrega}
            total={cartTotal}
            onEdit={openEditModal}
            onRemove={handleRemoveEntry}
          />
        </section>
      )}

      {/* INICIAR COMPRA */}
      {step === "shop" && (
        <div className="text-center mb-5">
          <button
            className="btn btn-primary btn-lg px-5 py-3 fw-bold"
            style={{ fontSize: "1.05rem" }}
            disabled={!hasCart}
            onClick={() => {
              setStep("form");
              setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
            }}
          >
            Iniciar Compra →
          </button>
          {!hasCart && (
            <div className="text-secondary small mt-2">Agregá productos para continuar</div>
          )}
        </div>
      )}

      {/* ORDER FORM */}
      {step === "form" && (
        <section ref={formRef} className="mb-5">
          <div className="card border-primary bg-dark">
            <div className="card-body p-4">
              <h4 className="text-primary fw-bold mb-4">📋 Datos del pedido</h4>

              <div className="row g-3 mb-4">
                {(
                  [
                    { key: "nombre", label: "Nombre", type: "text", placeholder: "" },
                    { key: "apellido", label: "Apellido", type: "text", placeholder: "" },
                    { key: "telefono", label: "Teléfono", type: "tel", placeholder: "Ej: 1134567890" },
                    { key: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
                  ] as const
                ).map(({ key, label, type, placeholder }) => (
                  <div className="col-sm-6" key={key}>
                    <label className="form-label text-secondary small mb-1">{label} *</label>
                    <input
                      type={type}
                      className={`form-control bg-dark border-secondary text-light ${formErrors[key] ? "is-invalid" : ""}`}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    />
                    {formErrors[key] && <div className="invalid-feedback">{formErrors[key]}</div>}
                  </div>
                ))}
              </div>

              {/* Método de pago */}
              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold mb-2">Método de pago</label>
                <div className="row g-2">
                  {(
                    [
                      { value: "mp", icon: "💳", label: "MercadoPago online", sub: "Pago seguro · redirige a MercadoPago" },
                      { value: "transferencia", icon: "🏦", label: "Transferencia bancaria", sub: "CBU / Alias" },
                      { value: "retiro", icon: "🤝", label: "Al retirar", sub: "Pagás al momento del retiro" },
                    ] as const
                  ).map((opt) => (
                    <div className="col-sm-4" key={opt.value}>
                      <div
                        className={`rounded-3 p-3 h-100 ${form.metodoPago === opt.value ? "border border-primary" : "border border-secondary"}`}
                        style={{
                          cursor: "pointer",
                          background: form.metodoPago === opt.value ? "rgba(139,92,246,0.1)" : "transparent",
                          transition: "all 0.15s",
                        }}
                        onClick={() => setForm((f) => ({ ...f, metodoPago: opt.value }))}
                      >
                        <div className="fw-bold text-light mb-1">{opt.icon} {opt.label}</div>
                        <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{opt.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entrega */}
              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold mb-2">Entrega</label>
                <div className="row g-2">
                  {(
                    [
                      { value: "retiro", icon: "📍", label: "Retiro en JJ", sub: "Jean Jaurés 347, CABA" },
                      { value: "envio", icon: "🚗", label: "Envío a domicilio", sub: "Solo CABA · +$3.000" },
                    ] as const
                  ).map((opt) => (
                    <div className="col-sm-6" key={opt.value}>
                      <div
                        className={`rounded-3 p-3 h-100 ${form.entrega === opt.value ? "border border-primary" : "border border-secondary"}`}
                        style={{
                          cursor: "pointer",
                          background: form.entrega === opt.value ? "rgba(139,92,246,0.1)" : "transparent",
                          transition: "all 0.15s",
                        }}
                        onClick={() => setForm((f) => ({ ...f, entrega: opt.value }))}
                      >
                        <div className="fw-bold text-light mb-1">{opt.icon} {opt.label}</div>
                        <div className="text-secondary" style={{ fontSize: "0.8rem" }}>{opt.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dirección */}
              {form.entrega === "envio" && (
                <div className="mb-4">
                  <label className="form-label text-secondary small mb-1">Dirección de envío (CABA) *</label>
                  <input
                    type="text"
                    className={`form-control bg-dark border-secondary text-light ${formErrors.direccion ? "is-invalid" : ""}`}
                    placeholder="Calle, número, piso, dpto."
                    value={form.direccion}
                    onChange={(e) => setForm((f) => ({ ...f, direccion: e.target.value }))}
                  />
                  {formErrors.direccion && <div className="invalid-feedback">{formErrors.direccion}</div>}
                </div>
              )}

              {/* Observaciones */}
              <div className="mb-4">
                <label className="form-label text-secondary small mb-1">
                  Observaciones <span className="text-muted">(opcional)</span>
                </label>
                <textarea
                  className="form-control bg-dark border-secondary text-light"
                  rows={3}
                  placeholder="Aclaraciones especiales sobre tu pedido..."
                  value={form.observaciones}
                  onChange={(e) => setForm((f) => ({ ...f, observaciones: e.target.value }))}
                />
              </div>

              {/* Total */}
              <div
                className="rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center"
                style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.3)" }}
              >
                <div>
                  <div className="text-light fw-bold">Total a pagar</div>
                  {form.entrega === "envio" && (
                    <div className="text-secondary" style={{ fontSize: "0.75rem" }}>Incluye $3.000 de envío</div>
                  )}
                </div>
                <span className="text-primary fw-bold fs-3">{formatPrice(cartTotal)}</span>
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-outline-secondary" onClick={() => setStep("shop")} disabled={isSubmitting}>
                  ← Volver
                </button>
                <button
                  className="btn btn-primary btn-lg fw-bold flex-grow-1"
                  onClick={handleFinalizarCompra}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><span className="spinner-border spinner-border-sm me-2" />Procesando...</>
                  ) : "✅ Finalizar Compra"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

"use client";

import { PrismicImage, PrismicRichText } from "@prismicio/react";
import type { BenefitsDocument } from "../../../prismicio-types";

export default function BenefitsList({
  benefits,
}: {
  benefits: BenefitsDocument[];
}) {
  if (!benefits?.length) return null;

  return (
    <section className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="d-flex align-items-start gap-3 mb-4 py-3 border-bottom border-secondary border-opacity-25"
            >
              <div className="flex-shrink-0" style={{ width: 64, height: 64 }}>
                {benefit.data.logo?.url ? (
                  <PrismicImage
                    field={benefit.data.logo}
                    className="rounded"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <div
                    className="rounded bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <span className="text-muted small">Logo</span>
                  </div>
                )}
              </div>
              <div className="flex-grow-1 min-w-0">
                <h4 className="h5 fw-bold text-white mb-2">
                  {benefit.data.title ?? ""}
                </h4>
                <div className="text-light">
                  <PrismicRichText
                    field={benefit.data.description}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="mb-0 small">{children}</p>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

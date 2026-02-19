"use client";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import styles from "./thanks.module.scss";
import dynamic from "next/dynamic";
import CredentialForm from "./CredentialForm";

const Confetti = dynamic(() => import("./Confetti"), { ssr: false });

export default function ThanksPage() {
  const params = useParams();
  return (
    <div className={styles["thanks-container"]}>
      <Confetti />
      <h1 className={styles["thanks-title"]}>¡Gracias por sumarte al JJ! 💜</h1>
      <div className={styles["thanks-detail"]}>
        {params?.tipo && params?.monto && (
          <>
            {params.tipo === "anual" && (
              <>Tu <b>aporte anual</b> de <b>${params.monto}</b> es clave para que este espacio siga vivo, independiente y en movimiento.<br /><br /></>
            )}
            {params.tipo === "mensual" && (
              <>Tu <b>aporte mensual</b> de <b>${params.monto}</b> es clave para que este espacio siga vivo, independiente y en movimiento.<br /><br /></>
            )}
            {params.tipo === "unico" && (
              <>Tu <b>aporte único</b> de <b>${params.monto}</b> es clave para que este espacio siga vivo, independiente y en movimiento.<br /><br /></>
            )}
          </>
        )}
        Con tu apoyo, ayudás a sostener talleres, ciclos, residencias, exposiciones y todo lo que construimos colectivamente desde el corazón de Balvanera.<br /><br />
        Creemos en la cultura como trinchera y en la autogestión como camino.<br />
        Hoy, más que nunca, el JJ también es tuyo.<br /><br />
        Te vamos a estar escribiendo pronto con más info para que te sientas parte de esta comunidad.<br />
        Mientras tanto, seguinos en nuestras redes y enterate de todo lo que se viene.<br /><br />
        🙌 ¡Gracias por bancar la cultura independiente!
      </div>
      <Suspense fallback={<div className="mt-5 p-4 text-muted text-center">Cargando…</div>}>
        <CredentialForm />
      </Suspense>
    </div>
  );
}

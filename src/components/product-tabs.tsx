"use client";

import { useState } from "react";
import { productDetails } from "@/lib/product-details";

export function ProductTabs({ slug }: { slug: string; description?: string }) {
  const [tab, setTab] = useState<"flavors" | "specs">("flavors");
  const details = productDetails[slug];
  const flavors = details?.flavors ?? [];
  return <div className="product-tabs">
    <div className="tabs-list" role="tablist">
      <button role="tab" aria-selected={tab === "flavors"} onClick={() => setTab("flavors")}>Sabores</button>
      <button role="tab" aria-selected={tab === "specs"} onClick={() => setTab("specs")}>Ficha técnica</button>
    </div>
    <div className="tab-panel">
      {tab === "flavors" ? flavors.length
        ? <div className="flavor-grid">{flavors.map((flavor, index) => <div key={flavor}><i className={`flavor-dot flavor-${index}`}/><span>{flavor}</span></div>)}</div>
        : <p>No hay sabores registrados para este modelo en el inventario actual.</p>
        : details
          ? <div className="tech-sheet"><dl><div><dt>Líquido</dt><dd>{details.liquid}</dd></div><div><dt>Coil</dt><dd>{details.coil}</dd></div><div><dt>Carga</dt><dd>{details.charging}</dd></div><div><dt>Modos</dt><dd>{details.modes}</dd></div><div><dt>Pantalla</dt><dd>{details.display}</dd></div><div><dt>Nicotina</dt><dd>{details.nicotine}</dd></div></dl>{details.note && <small>{details.note}</small>}</div>
          : <p>Ficha técnica no disponible.</p>}
    </div>
  </div>;
}

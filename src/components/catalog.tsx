"use client";

import Link from "next/link";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./product-visual";

export function Catalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<"all" | "high" | "ultra" | "compact">("all");
  const [open, setOpen] = useState(false);
  const filtered = products.filter((product) => {
    if (filter === "ultra") return product.puffs >= 50000;
    if (filter === "high") return product.puffs >= 30000;
    if (filter === "compact") return product.puffs < 30000;
    return true;
  });
  const filterLabels = { all: "Todos", high: "30K o más", ultra: "50K o más", compact: "Hasta 25K" };
  return (
    <section id="catalogo" className="catalog-section catalog-sheet-section">
      {filter !== "all" && <div className="filter-status"><span className="active-filter">{filterLabels[filter]}</span></div>}
      {filtered.length ? <div className="product-grid">{filtered.map((product) => (
        <Link href={`/productos/${product.slug}`} className="product-card" key={product.slug}>
          <div className="card-top"><span>{product.brand}</span></div>
          <ProductVisual product={product} />
          <div className="card-copy catalog-card-copy">
            <div className="product-card-title"><h3>{product.name}</h3><div className="puff-count"><strong>{product.puffs.toLocaleString("es-PA")}</strong><span>puffs</span></div></div>
            <ul className="mini-specs"><li><Check/>{product.features[0]}</li><li><Check/>{product.battery}</li><li><Check/>{product.features[1]}</li></ul>
          </div>
        </Link>
      ))}</div> : <div className="empty">No hay productos en este filtro.</div>}
      <div className={`filter-popover ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="filter-popover-head"><strong>Filtrar productos</strong><button onClick={() => setOpen(false)} aria-label="Cerrar filtros"><X/></button></div>
        {(["all", "high", "ultra", "compact"] as const).map((value) => <button key={value} className={filter === value ? "selected" : ""} onClick={() => { setFilter(value); setOpen(false); }}>{filterLabels[value]}<span>{value === "all" ? products.length : products.filter((p) => value === "ultra" ? p.puffs >= 50000 : value === "high" ? p.puffs >= 30000 : p.puffs < 30000).length}</span></button>)}
      </div>
      <button className="floating-filter" onClick={() => setOpen(!open)} aria-label="Filtrar productos" aria-expanded={open}><SlidersHorizontal/><span>Filtrar</span>{filter !== "all" && <i/>}</button>
    </section>
  );
}

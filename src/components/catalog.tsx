"use client";

import { ArrowLeft, ArrowRight, BatteryCharging, Check, Gauge, Layers3, Play, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./product-visual";
import { ProductTabs } from "./product-tabs";

export function Catalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<"all" | "high" | "ultra" | "compact">("all");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); };
  }, [selected]);
  const filtered = products.filter((product) => {
    if (filter === "ultra") return product.puffs >= 50000;
    if (filter === "high") return product.puffs >= 30000;
    if (filter === "compact") return product.puffs < 30000;
    return true;
  });
  const filterLabels = { all: "Todos", high: "30K o más", ultra: "50K o más", compact: "Hasta 25K" };
  const categoryFor = (product: Product) => product.puffs >= 50000 ? "Ultra" : product.featured ? "Premium" : product.puffs >= 30000 ? "Pro" : "Essential";
  return (
    <section id="catalogo" className="catalog-section catalog-sheet-section">
      {filter !== "all" && <div className="filter-status"><span className="active-filter">{filterLabels[filter]}</span></div>}
      {filtered.length ? <div className="product-grid">{filtered.map((product) => (
        <button type="button" onClick={() => { setSelected(product); setShowVideo(false); }} className="product-card" key={product.slug} aria-label={`Ver ${product.name}`}>
          <div className="card-top"><span>{product.brand}</span></div>
          <ProductVisual product={product} />
          <div className="card-copy catalog-card-copy">
            <div className="product-card-title"><h3>{product.name}</h3><div className="puff-count"><strong>{product.puffs.toLocaleString("es-PA")}</strong><span>puffs</span></div></div>
            <ul className="mini-specs"><li><Check/>{product.features[0]}</li><li><Check/>{product.battery}</li><li><Check/>{product.features[1]}</li></ul>
          </div>
        </button>
      ))}</div> : <div className="empty">No hay productos en este filtro.</div>}
      <div className={`filter-popover ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="filter-popover-head"><strong>Filtrar productos</strong><button onClick={() => setOpen(false)} aria-label="Cerrar filtros"><X/></button></div>
        {(["all", "high", "ultra", "compact"] as const).map((value) => <button key={value} className={filter === value ? "selected" : ""} onClick={() => { setFilter(value); setOpen(false); }}>{filterLabels[value]}<span>{value === "all" ? products.length : products.filter((p) => value === "ultra" ? p.puffs >= 50000 : value === "high" ? p.puffs >= 30000 : p.puffs < 30000).length}</span></button>)}
      </div>
      <button className="floating-filter" onClick={() => setOpen(!open)} aria-label="Filtrar productos" aria-expanded={open}><SlidersHorizontal/><span>Filtrar</span>{filter !== "all" && <i/>}</button>
      {selected && createPortal(<div className="product-modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
        <article className="product-modal" role="dialog" aria-modal="true" aria-label={`Información de ${selected.name}`}>
          <header className="modal-header"><div><span>{selected.brand}</span><strong>{selected.name}</strong></div><div className="modal-capacity"><span>Capacidad</span><strong>{selected.puffs.toLocaleString("es-PA")} puffs</strong></div><button onClick={() => setSelected(null)} aria-label="Cerrar producto"><X/></button></header>
          <div className="modal-body"><div className={`modal-visual ${showVideo ? "show-video" : ""}`} style={{ "--accent": selected.accent } as React.CSSProperties}><span className="category-pill">{categoryFor(selected)}</span><div className="media-track"><div className="media-panel"><ProductVisual product={selected} large/></div><div className="media-panel video-panel"><div className="video-aura"/><ProductVisual product={selected} large/><div className="video-playing"><Play/><span>Vista en movimiento</span></div></div></div><button className="video-toggle" onClick={() => setShowVideo(!showVideo)}>{showVideo ? <><ArrowLeft/> Ver producto</> : <>Ver video <ArrowRight/></>}</button></div><div className="modal-info"><div className="modal-specs"><div><Gauge/><strong>{selected.puffs.toLocaleString("es-PA")}</strong><span>Puffs</span></div><div><BatteryCharging/><strong>{selected.battery}</strong><span>Batería</span></div><div><Layers3/><strong>{selected.features[1]}</strong><span>Tecnología</span></div></div><ProductTabs slug={selected.slug} description={selected.description}/><div className="info-note">Consulta disponibilidad directamente en tu punto de venta.</div></div></div>
        </article>
      </div>, document.body)}
    </section>
  );
}

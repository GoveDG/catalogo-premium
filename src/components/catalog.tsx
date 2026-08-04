"use client";

import { BatteryCharging, Check, Gauge, Layers3, Play, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./product-visual";
import { ProductTabs } from "./product-tabs";
import { RandomProductVisuals } from "./random-product-visuals";

const subscribeToClient = () => () => {};

export function Catalog({ products }: { products: Product[] }) {
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [filter, setFilter] = useState<"all" | "high" | "ultra" | "compact">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); };
  }, [selected]);
  const filteredProducts = products.filter((product) => {
    if (filter === "ultra") return product.puffs >= 50000;
    if (filter === "high") return product.puffs >= 30000;
    if (filter === "compact") return product.puffs < 30000;
    return true;
  });
  const filterLabels = { all: "Todos", high: "30K o más", ultra: "50K o más", compact: "Hasta 25K" };
  const categoryFor = (product: Product) => product.puffs >= 50000 ? "Ultra" : product.featured ? "Premium" : product.puffs >= 30000 ? "Pro" : "Essential";
  const brandCatalogSlugs = [
    "oxbar-g9500", "oxbar-ice-nic", "g-turbo", "oxbar-dualblend", "oxbar-pod-juicy", "oxbar-svopp-pod-30k", "oxbar-svopp-pod-50k",
    "lost-mary-mt", "lost-mary-nera-kit", "lost-mary-nera-pod", "sp40000", "sp50000", "extre-100k", "geekbar-ice-prince",
    "elfbar-ice-king", "elfbar-duke", "hqd-cuvie-glaze",
  ];
  const premiumCatalogSlugs = [
    "turbo-x", "fzzybar", "donet", "meteor", "crypto-vibe", "air-plus", "dummy-xf", "orionbar", "heavy-weight", "genius",
    "geek-us", "nova-bar", "extre-bar-turbo-x", "tasteflex-50k", "elux-astra-50k", "glamee-dice-6k", "glamee-gt-8k",
    "glamee-nova-4k", "glamee-flow-4500", "space-max-bx8000",
    "lost-angel-50k", "star-maxus-50k", "adjust-myrusher-40k", "nexa-ultra-50k", "lady-dinner-galax-60k",
  ];
  const budgetCatalogSlugs = [
    "meloso", "orionbar-budget", "spaceman-10k-pro", "airmez-matrix-25k", "craftbox-v-play",
    "dragbar-b5000", "fire-boost", "friobar-mx-10k", "vapmod-all-spark", "glamee-alien-5k",
    "airis-speedy-15k", "airis-alpha-touch", "true-story-20k", "vookbar-cyber-pro", "klik-klak-elements",
  ];
  const sectionFor = (product: Product) => {
    if (brandCatalogSlugs.includes(product.slug)) return "marcas";
    if (premiumCatalogSlugs.includes(product.slug)) return "premium";
    if (budgetCatalogSlugs.includes(product.slug)) return "baratos";
    return "marcas";
  };
  const sections = [
    { id: "marcas", title: "Marcas", subtitle: "Innovación y tecnología", tone: "brands" },
    { id: "premium", title: "Premium", subtitle: "Diseño y máxima duración", tone: "premium" },
    { id: "baratos", title: "Baratos", subtitle: "Rendimiento al mejor precio", tone: "budget" },
  ] as const;
  return (
    <>
    <section id="catalogo" className="catalog-section catalog-sheet-section">
      {filteredProducts.length ? <div className="catalog-sections">{sections.map((section, sectionIndex) => {
        const sectionProducts = filteredProducts.filter((product) => sectionFor(product) === section.id);
        if (!sectionProducts.length) return null;
        return <div className="catalog-group" key={section.id} id={section.id}>
          {sectionIndex > 0 && <div className={`section-banner section-banner-${section.tone}`}><div><span>COLECCIÓN EOM</span><h2>{section.title}</h2><p>{section.subtitle}</p></div><RandomProductVisuals products={sectionProducts} segment={section.id} variant="banner"/></div>}
          <div className="group-label"><div><span>SECCIÓN</span><h2>{section.title}</h2></div><strong>{sectionProducts.length} productos</strong></div>
          <div className="product-grid">{sectionProducts.map((product) => <button type="button" onClick={() => { setShowVideo(false); setSelected(product); }} className="product-card" key={product.slug} aria-label={`Ver ${product.name}`}><div className="card-top"><span>{product.brand}</span></div><ProductVisual product={product}/><div className="card-copy catalog-card-copy"><div className="product-card-title"><h3>{product.name}</h3><div className="puff-count"><strong>{product.puffs.toLocaleString("es-PA")}</strong><span>puffs</span></div></div><ul className="mini-specs"><li><Check/>{product.features[0]}</li><li><Check/>{product.battery}</li><li><Check/>{product.features[1]}</li></ul></div></button>)}</div>
        </div>;
      })}</div> : <div className="empty">No hay productos en este filtro.</div>}
      {selected && createPortal(<div className="product-modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
        <article className="product-modal" role="dialog" aria-modal="true" aria-label={`Información de ${selected.name}`}>
          <header className="modal-header"><div><span>{selected.brand}</span><strong>{selected.name}</strong></div><div className="modal-capacity"><span>Capacidad</span><strong>{selected.puffs.toLocaleString("es-PA")} puffs</strong></div><button onClick={() => setSelected(null)} aria-label="Cerrar producto"><X/></button></header>
          <div className="modal-body"><div className={`modal-visual ${showVideo ? "show-video" : ""}`} style={{ "--accent": selected.accent } as React.CSSProperties}><span className="category-pill">{categoryFor(selected)}</span><div className="media-track"><div className="media-panel"><ProductVisual product={selected} large/></div><div className="media-panel video-panel"><div className="video-unavailable-message"><Play/><strong>No disponible por ahora</strong><span>La sección de video estará disponible próximamente.</span></div></div></div><button className="video-toggle" type="button" onClick={() => setShowVideo((visible) => !visible)} aria-pressed={showVideo}><Play/>{showVideo ? "Volver" : "Ver video"}</button></div><div className="modal-info"><div className="modal-specs"><div><Gauge/><strong>{selected.puffs.toLocaleString("es-PA")}</strong><span>Puffs</span></div><div><BatteryCharging/><strong>{selected.battery}</strong><span>Batería</span></div><div><Layers3/><strong>{selected.features[1]}</strong><span>Tecnología</span></div></div><ProductTabs slug={selected.slug} description={selected.description}/><div className="info-note">Consulta disponibilidad directamente en tu punto de venta.</div></div></div>
        </article>
      </div>, document.body)}
      {mounted && !selected && createPortal(<div className="home-filter-ui">
        <div className={`home-filter-panel ${filterOpen ? "is-open" : ""}`} aria-hidden={!filterOpen}>
          <div className="home-filter-head"><strong>Filtrar productos</strong><button onClick={() => setFilterOpen(false)} aria-label="Cerrar filtros"><X/></button></div>
          {(["all", "high", "ultra", "compact"] as const).map((value) => <button key={value} className={filter === value ? "selected" : ""} onClick={() => { setFilter(value); setFilterOpen(false); }}>{filterLabels[value]}<span>{value === "all" ? products.length : products.filter((product) => value === "ultra" ? product.puffs >= 50000 : value === "high" ? product.puffs >= 30000 : product.puffs < 30000).length}</span></button>)}
        </div>
        <button className="home-filter-button" onClick={() => setFilterOpen(!filterOpen)} aria-label="Filtrar productos" aria-expanded={filterOpen}><SlidersHorizontal/><span>Filtrar</span>{filter !== "all" && <i/>}</button>
      </div>, document.body)}
    </section>
    </>
  );
}

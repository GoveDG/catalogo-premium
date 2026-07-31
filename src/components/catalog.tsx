"use client";

import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./product-visual";

export function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())), [products, query]);
  return (
    <section id="catalogo" className="catalog-section">
      <div className="section-heading">
        <div><span className="eyebrow">COLECCIÓN 2026</span><h2>Explora el catálogo</h2></div>
        <div className="search-wrap"><Search size={18} /><input aria-label="Buscar productos" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto" /><SlidersHorizontal size={17} /></div>
      </div>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => (
        <Link href={`/productos/${product.slug}`} className="product-card" key={product.slug}>
          <div className="card-top"><span>{product.brand}</span>{product.featured && <span className="badge">Destacado</span>}</div>
          <ProductVisual product={product} />
          <div className="card-copy"><div><h3>{product.name}</h3><p>{product.features[0]}</p></div><div className="puff-count"><strong>{product.puffs.toLocaleString("es-PA")}</strong><span>puffs</span></div></div>
        </Link>
      ))}</div> : <div className="empty">No encontramos productos con “{query}”.</div>}
    </section>
  );
}

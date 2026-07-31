"use client";

import Link from "next/link";
import { Check, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./product-visual";

export function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())), [products, query]);
  return (
    <section id="catalogo" className="catalog-section catalog-sheet-section">
      <div className="section-heading catalog-heading">
        <div><span className="eyebrow">CATÁLOGO PREMIUM</span><h2>Todos los productos</h2></div>
        <div className="search-wrap"><Search size={16} /><input aria-label="Buscar productos" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar" /></div>
      </div>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => (
        <Link href={`/productos/${product.slug}`} className="product-card" key={product.slug}>
          <div className="card-top"><span>{product.brand}</span></div>
          <ProductVisual product={product} />
          <div className="card-copy catalog-card-copy">
            <div className="product-card-title"><h3>{product.name}</h3><div className="puff-count"><strong>{product.puffs.toLocaleString("es-PA")}</strong><span>puffs</span></div></div>
            <ul className="mini-specs"><li><Check/>{product.features[0]}</li><li><Check/>{product.battery}</li><li><Check/>{product.features[1]}</li></ul>
          </div>
        </Link>
      ))}</div> : <div className="empty">No encontramos productos con “{query}”.</div>}
    </section>
  );
}

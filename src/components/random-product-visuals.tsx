"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./product-visual";

let visitSeed: number | null = null;
const subscribe = () => () => {};
const serverSeed = () => 0;
const clientSeed = () => {
  if (visitSeed === null) {
    visitSeed = crypto.getRandomValues(new Uint32Array(1))[0] || 1;
  }
  return visitSeed;
};

function seededValue(seed: number, index: number, segment: string) {
  let value = seed ^ (index * 0x9e3779b9);
  for (const character of segment) value = Math.imul(value ^ character.charCodeAt(0), 2654435761);
  value ^= value >>> 16;
  return value >>> 0;
}

export function RandomProductVisuals({ products, segment, variant }: { products: Product[]; segment: string; variant: "hero" | "banner" }) {
  const seed = useSyncExternalStore(subscribe, clientSeed, serverSeed);
  const selected = seed === 0
    ? []
    : products
        .map((product, index) => ({ product, order: seededValue(seed, index, segment) }))
        .sort((left, right) => left.order - right.order)
        .slice(0, 3)
        .map(({ product }) => product);

  if (variant === "hero") {
    return <div className="hero-device-group">{selected.map((product, index) => <div className={`hero-mini hero-mini-${index}`} key={product.slug}><ProductVisual product={product} priority/></div>)}</div>;
  }

  return <div className="section-banner-devices">{selected.map((product) => <ProductVisual product={product} key={product.slug}/>)}</div>;
}

import Link from "next/link";
import { ArrowLeft, BatteryCharging, ChevronLeft, ChevronRight, Gauge, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ProductVisual } from "@/components/product-visual";
import { ProductTabs } from "@/components/product-tabs";
import { getProduct, getProducts } from "@/lib/db";

export async function generateStaticParams() { return (await getProducts()).map(({ slug }) => ({ slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const products = await getProducts();
  const index = products.findIndex((item) => item.slug === product.slug);
  const previous = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];
  return <><Header/><main className="detail-shell compact-detail">
    <div className="detail-topbar"><Link href="/#catalogo" className="back-link" aria-label="Regresar al catálogo"><ArrowLeft/></Link><div><span>{product.brand}</span><strong>{product.name}</strong></div><div className="top-puffs"><span>Capacidad</span><strong>{product.puffs.toLocaleString("es-PA")} puffs</strong></div></div>
    <div className="detail-grid"><div className="detail-visual" style={{ "--accent": product.accent } as React.CSSProperties}><Link href={`/productos/${previous.slug}`} className="product-arrow arrow-left" aria-label="Producto anterior"><ChevronLeft/></Link><ProductVisual product={product} large/><Link href={`/productos/${next.slug}`} className="product-arrow arrow-right" aria-label="Producto siguiente"><ChevronRight/></Link><div className="carousel-dots"><i className="active"/><i/><i/></div></div><div className="detail-copy"><span className="eyebrow">{product.brand.toUpperCase()}</span><h1>{product.name}</h1><div className="spec-row"><div><Gauge/><strong>{product.puffs.toLocaleString("es-PA")}</strong><span>Puffs</span></div><div><BatteryCharging/><strong>{product.battery}</strong><span>Batería</span></div><div><Layers3/><strong>{product.features[1]}</strong><span>Tecnología</span></div></div><ProductTabs slug={product.slug} description={product.description}/><div className="info-note">Consulta disponibilidad directamente en tu punto de venta.</div></div></div>
  </main></>;
}

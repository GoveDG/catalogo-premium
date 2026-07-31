import Link from "next/link";
import { ArrowLeft, BatteryCharging, Check, Gauge, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ProductVisual } from "@/components/product-visual";
import { getProduct, getProducts } from "@/lib/db";

export async function generateStaticParams() { return (await getProducts()).map(({ slug }) => ({ slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  return <><Header/><main className="detail-shell"><Link href="/#catalogo" className="back-link"><ArrowLeft size={17}/> Volver al catálogo</Link><div className="detail-grid"><div className="detail-visual" style={{ "--accent": product.accent } as React.CSSProperties}><ProductVisual product={product} large/><span className="visual-label">Vista del producto</span></div><div className="detail-copy"><span className="eyebrow">{product.brand.toUpperCase()}</span><h1>{product.name}</h1><p className="description">{product.description}</p><div className="spec-row"><div><Gauge/><strong>{product.puffs.toLocaleString("es-PA")}</strong><span>Puffs</span></div><div><BatteryCharging/><strong>{product.battery}</strong><span>Batería</span></div><div><Layers3/><strong>{product.features[1]}</strong><span>Tecnología</span></div></div><div className="detail-section"><h2>Características</h2><ul>{product.features.map((feature) => <li key={feature}><Check size={16}/>{feature}</li>)}</ul></div><div className="detail-section"><h2>Colores disponibles</h2><div className="color-list">{product.colors.map((color, i) => <span key={color}><i style={{background: i ? "#171719" : product.accent}}/>{color}</span>)}</div></div><div className="info-note">Consulta disponibilidad directamente en tu punto de venta.</div></div></div></main></>;
}

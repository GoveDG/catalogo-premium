import Link from "next/link";
import { ArrowDown, BatteryCharging, ShieldCheck, Sparkles } from "lucide-react";
import { Catalog } from "@/components/catalog";
import { Header } from "@/components/header";
import { ProductVisual } from "@/components/product-visual";
import { getProducts } from "@/lib/db";

export default async function Home() {
  const products = await getProducts();
  const hero = products.find((p) => p.slug === "meteor")!;
  return <><Header /><main>
    <section className="hero"><div className="hero-copy"><span className="pill"><Sparkles size={14} /> Nueva colección</span><h1>Diseño que se siente.<br/><em>Rendimiento que dura.</em></h1><p>Descubre una selección premium de dispositivos, elegidos por su diseño, autonomía y experiencia.</p><div className="hero-actions"><Link href="#catalogo" className="primary-button">Ver catálogo <ArrowDown size={17}/></Link><span>12 modelos disponibles</span></div></div><div className="hero-product"><div className="orb"/><ProductVisual product={hero} large/><div className="floating-stat"><strong>70K</strong><span>máxima duración</span></div></div></section>
    <section id="beneficios" className="benefits"><div><ShieldCheck/><span><strong>Calidad verificada</strong><small>Productos seleccionados</small></span></div><div><BatteryCharging/><span><strong>Gran autonomía</strong><small>Hasta 70.000 puffs</small></span></div><div><Sparkles/><span><strong>Diseño premium</strong><small>Acabados de alta calidad</small></span></div></section>
    <Catalog products={products}/>
  </main><footer><div className="brand"><span className="brand-mark">P</span><span>Premium</span></div><p>Catálogo digital · Panamá</p><span>© 2026</span></footer></>;
}

import { Banknote, Building2, CreditCard, ShieldCheck, Smartphone, Users } from "lucide-react";
import { Catalog } from "@/components/catalog";
import { RandomProductVisuals } from "@/components/random-product-visuals";
import { getProducts } from "@/lib/db";

export default async function Home() {
  const products = await getProducts();
  const brandSlugs = ["oxbar-g9500", "oxbar-ice-nic", "g-turbo", "oxbar-dualblend", "oxbar-pod-juicy", "oxbar-svopp-pod-30k", "oxbar-svopp-pod-50k", "lost-mary-mt", "lost-mary-nera-kit", "lost-mary-nera-pod", "sp40000", "sp50000", "extre-100k", "geekbar-ice-prince", "elfbar-ice-king", "elfbar-duke", "hqd-cuvie-glaze"];
  const featured = products.filter((product) => brandSlugs.includes(product.slug));
  return <main className="catalog-page"><div className="catalog-container">
    <section className="catalog-hero">
      <div className="catalog-hero-copy"><h1>MARCAS</h1><h2>EOM</h2><div className="payments"><strong>MÉTODOS DE PAGO:</strong><div className="payment-row"><span><Smartphone/><b>YAPPY<small>COMERCIAL</small></b></span><span><CreditCard/><b>TARJETAS<small>CRÉDITO / DÉBITO</small></b></span><span><Building2/><b>ACH<small>TRANSFERENCIA</small></b></span><span><Banknote/><b>EFECTIVO<small>PUNTO DE VENTA</small></b></span></div></div></div>
      <RandomProductVisuals products={featured} segment="marcas-portada" variant="hero"/>
      <div className="side-badges"><div><Users/><b>+2M</b><span>USUARIOS<br/>SATISFECHOS</span></div><div><ShieldCheck/><b>CALIDAD</b><span>PREMIUM<br/>GARANTIZADA</span></div></div>
    </section>
    <Catalog products={products}/>
    <div className="catalog-foot"><span>PREMIUM EOM</span><span>Catálogo digital · Panamá · 2026</span></div>
  </div></main>;
}

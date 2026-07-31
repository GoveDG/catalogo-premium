import { Banknote, Building2, CreditCard, ShieldCheck, Smartphone, Users } from "lucide-react";
import { Catalog } from "@/components/catalog";
import { ProductVisual } from "@/components/product-visual";
import { getProducts } from "@/lib/db";

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((product) => ["turbo-x", "fzzybar", "orionbar"].includes(product.slug));
  return <main className="catalog-page"><div className="catalog-container">
    <section className="catalog-hero">
      <div className="catalog-hero-copy"><h1>MARCAS</h1><h2>EOM</h2><div className="payments"><strong>MÉTODOS DE PAGO:</strong><div className="payment-row"><span><Smartphone/><b>YAPPY<small>COMERCIAL</small></b></span><span><CreditCard/><b>TARJETAS<small>CRÉDITO / DÉBITO</small></b></span><span><Building2/><b>ACH<small>TRANSFERENCIA</small></b></span><span><Banknote/><b>EFECTIVO<small>PUNTO DE VENTA</small></b></span></div></div></div>
      <div className="hero-device-group">{featured.map((product, index)=><div className={`hero-mini hero-mini-${index}`} key={product.slug}><ProductVisual product={product}/></div>)}</div>
      <div className="side-badges"><div><Users/><b>+2M</b><span>USUARIOS<br/>SATISFECHOS</span></div><div><ShieldCheck/><b>CALIDAD</b><span>PREMIUM<br/>GARANTIZADA</span></div></div>
    </section>
    <Catalog products={products}/>
    <div className="catalog-foot"><span>PREMIUM EOM</span><span>Catálogo digital · Panamá · 2026</span></div>
  </div></main>;
}

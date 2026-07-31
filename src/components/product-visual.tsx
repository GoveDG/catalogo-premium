import type { Product } from "@/lib/products";

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`product-stage ${large ? "product-stage-large" : ""}`} style={{ "--accent": product.accent } as React.CSSProperties}>
      <div className={`device device-${product.shape}`}>
        <div className="device-cap" />
        <div className="device-shine" />
        <div className="device-screen"><span>{Math.round(product.puffs / 1000)}K</span><small>PUFFS</small></div>
        <div className="device-name">{product.name}</div>
      </div>
      <div className="product-glow" />
    </div>
  );
}

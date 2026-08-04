"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { productImageOrder, productImageScale } from "@/lib/product-image-order";

export function ProductVisual({ product, large = false, priority = false }: { product: Product; large?: boolean; priority?: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imageNumber = productImageOrder[product.slug];
  const cardImageScale = imageNumber ? productImageScale[imageNumber] ?? 1 : 1;
  const imageScale = large ? Math.min(cardImageScale, 1.05) : cardImageScale;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const imageFolder = large ? "product-images" : "product-images/thumbs";
  const eager = large || priority;

  return (
    <div className={`product-stage ${large ? "product-stage-large" : ""} ${imageLoaded ? "has-product-photo" : ""}`} style={{ "--accent": product.accent } as React.CSSProperties}>
      {!imageLoaded && <div className="product-skeleton" aria-hidden="true"><i/><span/></div>}
      {imageNumber && !imageFailed && <Image className="product-photo" src={`${basePath}/${imageFolder}/${imageNumber}.png`} alt={`${product.brand} ${product.name}`} width={large ? 1200 : 600} height={large ? 1200 : 600} sizes={large ? "(max-width: 760px) 90vw, 480px" : "(max-width: 760px) 50vw, 220px"} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "low"} decoding="async" unoptimized style={{ "--photo-scale": imageScale } as React.CSSProperties} onLoad={() => setImageLoaded(true)} onError={() => setImageFailed(true)}/>}
      {imageLoaded && <div className="product-glow" />}
    </div>
  );
}

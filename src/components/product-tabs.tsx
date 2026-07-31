"use client";

import { useState } from "react";

const flavorSets: Record<string, string[]> = {
  "turbo-x": ["Strawberry Mango", "Blue Razz", "Watermelon Ice", "Grape Ice"],
  fzzybar: ["Lemon Mint", "Peach Ice", "Miami Mint", "Blueberry"],
  donet: ["Strawberry Donut", "Blueberry Donut", "Vanilla Cream", "Grape Candy"],
  meteor: ["Triple Melon Mint", "Peach Mango", "Blue Razz Ice", "Watermelon Ice"],
  "crypto-vibe": ["Grapes", "Mixed Berries", "Cool Mint", "Mango Ice"],
};

export function ProductTabs({ slug, description }: { slug: string; description: string }) {
  const [tab, setTab] = useState<"flavors" | "description">("flavors");
  const flavors = flavorSets[slug] ?? ["Cool Mint", "Blue Razz Ice", "Watermelon Ice", "Mango Peach"];
  return <div className="product-tabs">
    <div className="tabs-list" role="tablist">
      <button role="tab" aria-selected={tab === "flavors"} onClick={() => setTab("flavors")}>Sabores</button>
      <button role="tab" aria-selected={tab === "description"} onClick={() => setTab("description")}>Descripción</button>
    </div>
    <div className="tab-panel">
      {tab === "flavors" ? <div className="flavor-grid">{flavors.map((flavor, index) => <div key={flavor}><i className={`flavor-dot flavor-${index}`}/><span>{flavor}</span></div>)}</div> : <p>{description}</p>}
    </div>
  </div>;
}

"use client";

import { useState } from "react";
import { Apple, Banana, CakeSlice, Candy, Cherry, Citrus, Coffee, CupSoda, Donut, Flame, Grape, IceCreamBowl, Leaf, Snowflake, Sparkles, Zap, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { GiCoconuts, GiFruitBowl, GiKiwiFruit, GiPeach, GiPear, GiPineapple, GiRaspberry, GiStrawberry, GiWatermelon } from "react-icons/gi";
import { TbMelonFilled } from "react-icons/tb";
import { productDetails } from "@/lib/product-details";

type FlavorIconType = LucideIcon | IconType;
type FlavorVisual = { icon: FlavorIconType; tone: string };

function MangoIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18.7 5.1C15.6 2.8 9.8 3.7 6.4 7.2c-3.8 3.9-3.7 9.7-.6 12.2 3 2.4 8.5 1.2 11.7-2.4 3.2-3.6 4.1-9.7 1.2-11.9Z" fill="currentColor"/><path d="M17.2 5.2c.5-2 2-3 4.1-3.2-.5 2.2-1.7 3.5-4.1 3.2Z" fill="#45a557"/><path d="M16.9 5.7c-1.6-.8-3.2-1-4.8-.7" stroke="#a66b00" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}

function visualForFlavor(flavor: string): FlavorVisual {
  const value = flavor.toLocaleLowerCase("es");
  const fruitMatches: Array<FlavorVisual & { index: number }> = [
    { pattern: /mango/, icon: MangoIcon, tone: "mango" },
    { pattern: /watermelon|sandía|sandia/, icon: GiWatermelon, tone: "watermelon" },
    { pattern: /strawberry|fresa|straw/, icon: GiStrawberry, tone: "strawberry" },
    { pattern: /blueberry/, icon: GiRaspberry, tone: "blueberry" },
    { pattern: /raspberry|blackberry|cranberry|berry|berries|razz/, icon: GiRaspberry, tone: "berry" },
    { pattern: /pineapple|piña|pina/, icon: GiPineapple, tone: "pineapple" },
    { pattern: /kiwi/, icon: GiKiwiFruit, tone: "kiwi" },
    { pattern: /peach|durazno/, icon: GiPeach, tone: "peach" },
    { pattern: /pear|pera/, icon: GiPear, tone: "green" },
    { pattern: /coconut|coco/, icon: GiCoconuts, tone: "coconut" },
    { pattern: /banana|nana/, icon: Banana, tone: "yellow" },
    { pattern: /cherry|cereza/, icon: Cherry, tone: "red" },
    { pattern: /grape|uva/, icon: Grape, tone: "purple" },
    { pattern: /apple|manzana/, icon: Apple, tone: "green" },
    { pattern: /melon|honeydew/, icon: TbMelonFilled, tone: "melon" },
    { pattern: /lemon|lime|orange|citrus|limón|limon|naranja|tangerine/, icon: Citrus, tone: "orange" },
    { pattern: /dragonfruit|dragon fruit|passion fruit|guava|guayaba|pomegranate|lychee|fruit/, icon: GiFruitBowl, tone: "fruit" },
  ].map(({ pattern, icon, tone }) => ({ icon, tone, index: value.search(pattern) })).filter(({ index }) => index >= 0);
  if (fruitMatches.length) {
    const { icon, tone } = fruitMatches.sort((left, right) => left.index - right.index)[0];
    return { icon, tone };
  }
  if (/coffee|café|cafe|mocha|latte|espresso|cappuccino/.test(value)) return { icon: Coffee, tone: "coffee" };
  if (/cake|pudding|cream|custard|cheesecake|pie|tart/.test(value)) return { icon: CakeSlice, tone: "pink" };
  if (/donut|doughnut/.test(value)) return { icon: Donut, tone: "pink" };
  if (/candy|gummy|gummi|bubblegum|bubble gum|cotton|sweet|caramel/.test(value)) return { icon: Candy, tone: "pink" };
  if (/ice cream|gelato|milk|vanilla/.test(value)) return { icon: IceCreamBowl, tone: "cream" };
  if (/mint|menthol|herb|spearmint|tobacco|tabaco|paan|aloe/.test(value)) return { icon: Leaf, tone: "mint" };
  if (/ice|icy|frozen|freeze|arctic|cold|cool/.test(value)) return { icon: Snowflake, tone: "blue" };
  if (/energy|monster|bull|boost|blast/.test(value)) return { icon: Zap, tone: "yellow" };
  if (/cola|soda|lemonade|drink|cocktail|punch|fizz|root beer/.test(value)) return { icon: CupSoda, tone: "blue" };
  if (/spicy|fire|chili|chilli/.test(value)) return { icon: Flame, tone: "red" };
  return { icon: Sparkles, tone: "violet" };
}

function FlavorIcon({ flavor }: { flavor: string }) {
  const { icon: Icon, tone } = visualForFlavor(flavor);
  return <i className={`flavor-icon flavor-icon-${tone}`} aria-hidden="true"><Icon/></i>;
}

export function ProductTabs({ slug }: { slug: string; description?: string }) {
  const [tab, setTab] = useState<"flavors" | "specs">("flavors");
  const details = productDetails[slug];
  const flavors = details?.flavors ?? [];
  return <div className="product-tabs">
    <div className="tabs-list" role="tablist">
      <button role="tab" aria-selected={tab === "flavors"} onClick={() => setTab("flavors")}>Sabores</button>
      <button role="tab" aria-selected={tab === "specs"} onClick={() => setTab("specs")}>Ficha técnica</button>
    </div>
    <div className="tab-panel">
      {tab === "flavors" ? flavors.length
        ? <div className="flavor-grid">{flavors.map((flavor) => <div key={flavor}><FlavorIcon flavor={flavor}/><span>{flavor}</span></div>)}</div>
        : <p>No hay sabores registrados para este modelo en el inventario actual.</p>
        : details
          ? <div className="tech-sheet"><dl><div><dt>Líquido</dt><dd>{details.liquid}</dd></div><div><dt>Coil</dt><dd>{details.coil}</dd></div><div><dt>Carga</dt><dd>{details.charging}</dd></div><div><dt>Modos</dt><dd>{details.modes}</dd></div><div><dt>Pantalla</dt><dd>{details.display}</dd></div><div><dt>Nicotina</dt><dd>{details.nicotine}</dd></div></dl>{details.note && <small>{details.note}</small>}</div>
          : <p>Ficha técnica no disponible.</p>}
    </div>
  </div>;
}

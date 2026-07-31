export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  puffs: number;
  battery: string;
  features: string[];
  colors: string[];
  accent: string;
  shape: "rounded" | "box" | "slim";
  featured: boolean;
  description: string;
};

export const productSeed: Omit<Product, "id">[] = [
  { slug: "turbo-x", name: "Turbo-X", brand: "Rifbar", puffs: 25000, battery: "700 mAh", features: ["Pantalla digital", "Doble modo", "Carga USB-C"], colors: ["Naranja", "Blanco", "Negro"], accent: "#ff5b35", shape: "rounded", featured: true, description: "Potencia ajustable y autonomía para todo el día en un cuerpo compacto con acabado premium." },
  { slug: "fzzybar", name: "Fzzybar", brand: "Fzzy", puffs: 20000, battery: "850 mAh", features: ["Pantalla digital", "Aire ajustable", "Carga rápida"], colors: ["Azul", "Lima"], accent: "#b9e51b", shape: "box", featured: true, description: "Un diseño atrevido con control de aire preciso y lectura clara de batería." },
  { slug: "donet", name: "Donet", brand: "Suonon", puffs: 50000, battery: "900 mAh", features: ["Indicador digital", "Dual Mesh", "Tanque visible"], colors: ["Lavanda", "Rosa"], accent: "#9a7cf1", shape: "rounded", featured: true, description: "Máxima duración, vapor consistente y un diseño suave inspirado en dulces." },
  { slug: "meteor", name: "Meteor", brand: "VOOA", puffs: 70000, battery: "1000 mAh", features: ["Modo ajustable", "Dual Mesh", "Indicador LED"], colors: ["Turquesa", "Negro"], accent: "#12bfa4", shape: "slim", featured: true, description: "Alto rendimiento y control total en un dispositivo delgado con gran autonomía." },
  { slug: "crypto-vibe", name: "Crypto Vibe", brand: "Crypto", puffs: 30000, battery: "850 mAh", features: ["Pantalla digital", "Dual Mesh", "Carga USB-C"], colors: ["Dorado", "Negro"], accent: "#d8ac53", shape: "box", featured: false, description: "Acabado metálico y una experiencia intensa con pantalla de estado integrada." },
  { slug: "air-plus", name: "Air+", brand: "Crave+", puffs: 6500, battery: "650 mAh", features: ["Diseño premium", "Recargable", "Liviano"], colors: ["Uva", "Blanco"], accent: "#8a3c92", shape: "rounded", featured: false, description: "Sencillo, ligero y cómodo. La opción esencial para llevar a cualquier parte." },
  { slug: "dummy-xf", name: "Dummy XF", brand: "Dummy Vapes", puffs: 7500, battery: "650 mAh", features: ["Indicador de líquido", "Quaq Mesh", "Recargable"], colors: ["Mango", "Rosa"], accent: "#ffca20", shape: "slim", featured: false, description: "Colores vibrantes y sabor uniforme con indicador práctico de líquido." },
  { slug: "orionbar", name: "Orionbar", brand: "Lost Vape", puffs: 7500, battery: "650 mAh", features: ["Aire ajustable", "Mesh Coil", "Carga rápida"], colors: ["Azul", "Negro"], accent: "#147bb7", shape: "box", featured: false, description: "Construcción transparente, flujo ajustable y el carácter de Lost Vape." },
  { slug: "heavy-weight", name: "Heavy Weight", brand: "Tyson 2.0", puffs: 7000, battery: "550 mAh", features: ["Material de calidad", "Mesh Coil", "Recargable"], colors: ["Negro", "Verde"], accent: "#78a52f", shape: "rounded", featured: false, description: "Una pieza robusta con textura táctil y rendimiento confiable." },
  { slug: "genius", name: "Genius", brand: "Selected Vibe", puffs: 8000, battery: "800 mAh", features: ["Pantalla digital", "Mesh Coil", "Carga USB-C"], colors: ["Amarillo", "Rojo"], accent: "#ff8a1c", shape: "slim", featured: false, description: "Color degradado, pantalla clara y una experiencia suave de principio a fin." },
  { slug: "geek-us", name: "Geek US", brand: "Geek", puffs: 30000, battery: "800 mAh", features: ["Pantalla digital", "Mesh Coil", "Modo turbo"], colors: ["Naranja", "Negro"], accent: "#ff6b1a", shape: "box", featured: false, description: "Personalidad gráfica y modo turbo para una respuesta más intensa." },
  { slug: "nova-bar", name: "Nova Bar", brand: "Nova", puffs: 35000, battery: "850 mAh", features: ["Pantalla digital", "Doble modo", "Carga USB-C"], colors: ["Rojo", "Negro"], accent: "#e53220", shape: "box", featured: false, description: "Gran capacidad con controles directos y una estética bicolor sobria." },
];

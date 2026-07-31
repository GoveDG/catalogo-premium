import Link from "next/link";

export function Header() {
  return <header className="site-header"><Link href="/" className="brand"><span className="brand-mark">P</span><span>Premium</span></Link><nav><Link href="/#catalogo">Catálogo</Link><a href="#beneficios">Calidad</a></nav><span className="availability"><i /> Disponible en Panamá</span></header>;
}

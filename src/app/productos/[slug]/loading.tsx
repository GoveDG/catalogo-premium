export default function ProductLoading() {
  return <main className="product-loading" aria-label="Cargando producto">
    <div className="loading-top"><div className="skeleton skeleton-circle"/><div><div className="skeleton skeleton-line tiny"/><div className="skeleton skeleton-line name"/></div></div>
    <div className="product-loading-grid"><div className="skeleton loading-product-visual"/><div className="loading-product-info"><div className="loading-specs">{Array.from({length:3}).map((_,i)=><div className="skeleton" key={i}/>)}</div><div className="skeleton loading-tabs"/><div className="loading-flavors">{Array.from({length:4}).map((_,i)=><div className="skeleton" key={i}/>)}</div></div></div>
  </main>;
}

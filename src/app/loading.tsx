export default function Loading() {
  return <main className="loading-page" aria-label="Cargando catálogo">
    <div className="skeleton skeleton-banner" />
    <div className="skeleton-grid">{Array.from({ length: 12 }).map((_, index) => <div className="skeleton-card" key={index}><div className="skeleton skeleton-brand"/><div className="skeleton skeleton-product"/><div className="skeleton skeleton-line"/><div className="skeleton skeleton-line short"/></div>)}</div>
  </main>;
}

# Catálogo Premium

Catálogo digital de productos construido con Next.js, Tailwind CSS y una base SQLite en memoria mediante SQL.js.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Contenido

- Portada responsive con estética inspirada en iOS.
- Catálogo con búsqueda instantánea.
- 12 productos cargados desde una base de datos SQLite.
- Ficha individual para cada producto.
- Generación estática de las páginas de producto.

Los productos se editan en `src/lib/products.ts`. La capa de base de datos se encuentra en `src/lib/db.ts`.

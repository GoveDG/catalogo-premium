import initSqlJs, { Database } from "sql.js";
import path from "node:path";
import { productSeed, type Product } from "./products";

let database: Promise<Database> | undefined;

async function getDb() {
  if (!database) {
    database = (async () => {
      const SQL = await initSqlJs({
        locateFile: (file) => path.join(process.cwd(), "node_modules", "sql.js", "dist", file),
      });
      const db = new SQL.Database();
      db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, name TEXT, brand TEXT,
        puffs INTEGER, battery TEXT, features TEXT, colors TEXT, accent TEXT,
        shape TEXT, featured INTEGER, description TEXT
      )`);
      const insert = db.prepare(`INSERT INTO products
        (slug,name,brand,puffs,battery,features,colors,accent,shape,featured,description)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
      productSeed.forEach((p) => insert.run([p.slug,p.name,p.brand,p.puffs,p.battery,JSON.stringify(p.features),JSON.stringify(p.colors),p.accent,p.shape,p.featured ? 1 : 0,p.description]));
      insert.free();
      return db;
    })();
  }
  return database;
}

function rowToProduct(row: unknown[]): Product {
  return { id: row[0] as number, slug: row[1] as string, name: row[2] as string, brand: row[3] as string, puffs: row[4] as number, battery: row[5] as string, features: JSON.parse(row[6] as string), colors: JSON.parse(row[7] as string), accent: row[8] as string, shape: row[9] as Product["shape"], featured: Boolean(row[10]), description: row[11] as string };
}

export async function getProducts() {
  const db = await getDb();
  const result = db.exec("SELECT * FROM products ORDER BY featured DESC, puffs DESC")[0];
  return result ? result.values.map(rowToProduct) : [];
}

export async function getProduct(slug: string) {
  const db = await getDb();
  const stmt = db.prepare("SELECT * FROM products WHERE slug = ?");
  stmt.bind([slug]);
  const product = stmt.step() ? rowToProduct(stmt.get()) : null;
  stmt.free();
  return product;
}

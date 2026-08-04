import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.join(process.cwd(), "public", "product-images");
const outputDirectory = path.join(sourceDirectory, "thumbs");
const maximumSize = 600;

await mkdir(outputDirectory, { recursive: true });

const images = (await readdir(sourceDirectory))
  .filter((file) => /^\d+\.png$/i.test(file))
  .sort((left, right) => Number.parseInt(left) - Number.parseInt(right));

await Promise.all(
  images.map(async (file) => {
    const source = path.join(sourceDirectory, file);
    const output = path.join(outputDirectory, file);
    const metadata = await sharp(source).metadata();

    if ((metadata.width ?? 0) <= maximumSize && (metadata.height ?? 0) <= maximumSize) {
      await copyFile(source, output);
      return;
    }

    await sharp(source)
      .resize({
        width: maximumSize,
        height: maximumSize,
        fit: "inside",
        withoutEnlargement: true,
      })
      .png({ compressionLevel: 9 })
      .toFile(output);
  }),
);

console.log(`Generated ${images.length} PNG thumbnails (max ${maximumSize}px).`);

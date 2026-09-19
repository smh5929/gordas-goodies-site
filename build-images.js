// One-off image optimization script. Run with: node build-images.js
// Reads from /assets (source), writes optimized web assets to /images.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'assets');
const OUT = path.join(__dirname, 'images');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

// Gallery / product photos -> slug for output filenames
const photos = {
  'Alfajores and Red n White Llama.jpg': 'alfajores-llama-treats',
  'Alfajores and Shortbread Lllamas.jpg': 'alfajores-shortbread-llamas',
  'Alfajores and Strawberries on silver plate.jpg': 'alfajores-strawberries',
  'Alfajores and flue on silver plate.jpg': 'alfajores-silver-plate',
  'Assorted box on stone rocks.jpg': 'assorted-box-outdoors',
  'Batch of cookies.jpg': 'batch-of-cookies',
  'Boxes Stacked with Red Bag.jpg': 'boxes-stacked-red-bag',
  'Close-up alfa with filling visible.jpg': 'closeup-filling-visible',
  'Close-up cookie with GG Logo Label.jpg': 'closeup-gg-label',
  'Cookie Platter 2.jpg': 'cookie-platter',
  'Inside Alfajor.jpg': 'inside-alfajor',
  'Manjar Blanco Filling.jpg': 'manjar-blanco-filling',
  'Mound of Dulce De Leche.jpg': 'mound-dulce-de-leche',
  'One alfajor close-up.jpeg': 'one-alfajor-closeup',
  'Pink Gift Box of Alfajores.jpg': 'pink-gift-box',
  'Sun on Alfajores outside.jpg': 'hero-outdoor-tray',
  'Tray assortment of GG cookies.jpg': 'tray-assortment',
  'close-up batch with dulce de leche.jpg': 'closeup-batch-dulce',
  'new close-up pic of 3 size alfajor.jpg': 'three-sizes-closeup',
  'Graduation Decals and Alfajores Tray.jpg': 'graduation-tray',
  'Birthday Stack of Alfajores.jpg': 'birthday-candle-stack',
  'Heart Shaped Alfajores with Strawberries.jpg': 'heart-alfajores-strawberries',
  'Baby Shower Tower of Alfajores.jpg': 'baby-shower-tower',
  'Mothers Day I Got It From My Mama.jpg': 'mothersday-mama-mug',
  'Crumb Cake Vanilla Pecan Closeup.jpg': 'crumbcake-vanilla-pecan',
  'Christmas Boxed Gifts with Candy Canes.jpg': 'christmas-boxed-gifts',
};

async function processPhoto(srcFile, slug) {
  const input = path.join(SRC, srcFile);
  const buf = await sharp(input).rotate().toBuffer();

  // Full-size (gallery lightbox / home features): max width 1200
  await sharp(buf).resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `${slug}-1200.jpg`));
  await sharp(buf).resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 76 }).toFile(path.join(OUT, `${slug}-1200.webp`));

  // Grid / card size: max width 700
  await sharp(buf).resize({ width: 700, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(OUT, `${slug}-700.jpg`));
  await sharp(buf).resize({ width: 700, withoutEnlargement: true })
    .webp({ quality: 74 }).toFile(path.join(OUT, `${slug}-700.webp`));

  // Thumbnail: max width 400
  await sharp(buf).resize({ width: 400, withoutEnlargement: true })
    .jpeg({ quality: 74, mozjpeg: true }).toFile(path.join(OUT, `${slug}-400.jpg`));
  await sharp(buf).resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 72 }).toFile(path.join(OUT, `${slug}-400.webp`));

  console.log('processed', slug);
}

async function processHero() {
  const input = path.join(SRC, 'Sun on Alfajores outside.jpg');
  const buf = await sharp(input).rotate().toBuffer();
  const widths = [480, 800, 1200, 1600, 2000];
  for (const w of widths) {
    await sharp(buf).resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `hero-${w}.jpg`));
    await sharp(buf).resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 76 }).toFile(path.join(OUT, `hero-${w}.webp`));
  }
  console.log('processed hero srcset');
}

async function processLogo() {
  const input = path.join(SRC, 'Final_Original_GordasGoodies.png');
  const buf = await sharp(input).toBuffer();

  // Header logo (transparent PNG), a couple sizes
  await sharp(buf).resize({ width: 500 }).png({ quality: 90, compressionLevel: 9 }).toFile(path.join(OUT, 'logo-500.png'));
  await sharp(buf).resize({ width: 240 }).png({ quality: 90, compressionLevel: 9 }).toFile(path.join(OUT, 'logo-240.png'));
  await sharp(buf).resize({ width: 900 }).png({ quality: 90, compressionLevel: 9 }).toFile(path.join(OUT, 'logo-900.png'));

  // Favicons (flatten onto white square since favicons render small)
  await sharp(buf).resize({ width: 512, height: 512, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png().toFile(path.join(OUT, 'favicon-512.png'));
  await sharp(buf).resize({ width: 180, height: 180, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png().toFile(path.join(OUT, 'apple-touch-icon.png'));
  await sharp(buf).resize({ width: 32, height: 32, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png().toFile(path.join(OUT, 'favicon-32.png'));

  console.log('processed logo + favicons');
}

(async () => {
  await processHero();
  await processLogo();
  for (const [file, slug] of Object.entries(photos)) {
    if (!fs.existsSync(path.join(SRC, file))) {
      console.warn('MISSING', file);
      continue;
    }
    await processPhoto(file, slug);
  }
  console.log('done');
})();

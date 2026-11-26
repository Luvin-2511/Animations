import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const portfolioGamesDir = 'C:/Users/luvin/Documents/Personal/Animations/Portfolio-Client/src/assets/Games';
const discographyAlbumsDir = 'C:/Users/luvin/Documents/Personal/Animations/discography-main/public/albums';
const clientDiscographyAlbumsDir = 'C:/Users/luvin/Documents/Personal/Animations/Portfolio-Client/public/discography/albums';

const GAMES = [
  {
    id: 'void-breach',
    title: 'Void Breach',
    artist: 'Sanyukt // Unreal Engine 5.4',
    year: '2024',
    kind: 'Tactical Sci-Fi Shooter · PC Edition',
    color: '#0e1014',
    accent: '#ef5143',
    motif: 'lines',
    coverImg: path.join(portfolioGamesDir, 'FPS/cinematic_sci_fi_fps_action_key_art_1_on_1_intimate_close_quarters_combat.png'),
    discImg: path.join(portfolioGamesDir, 'FPS/cinematic_sci_fi_fps_key_art_intense_1_on_1_close_quarters_combat_duel_on_a.png'),
    backImg: path.join(portfolioGamesDir, 'FPS/cinematic_sci_fi_fps_key_art_intimate_1_on_1_close_quarters_combat_duel_inside.png'),
    bookletBackImg: path.join(portfolioGamesDir, 'FPS/WhatsApp Image 2026-09-07 at 18.03.05.jpeg'),
    spread1: path.join(portfolioGamesDir, 'FPS/cinematic_sci_fi_fps_key_art_intense_1_on_1_close_quarters_combat_duel_on_a.png'),
    spread2: path.join(portfolioGamesDir, 'FPS/cinematic_sci_fi_fps_key_art_intimate_1_on_1_close_quarters_combat_duel_inside.png'),
    tracks: [
      { title: 'Sector 07 Incursion', length: 215 },
      { title: 'CQC Breach Protocol', length: 198 },
      { title: 'Orbital Bridge Duel', length: 242 },
      { title: 'Zero Gravity Vacuum', length: 180 },
    ],
  },
  {
    id: 'one-wrong-step',
    title: 'One Wrong Step',
    artist: 'Sanyukt // Solo Game Developer',
    year: '2024',
    kind: '3D Precision Platformer · PC Edition',
    color: '#0d151c',
    accent: '#ef5143',
    motif: 'waves',
    coverImg: path.join(portfolioGamesDir, 'One Wrong Step/official_cinematic_video_game_cover_key_art_for_a_3d_sci_fi_puzzle_platformer.png'),
    discImg: path.join(portfolioGamesDir, 'One Wrong Step/1.png'),
    backImg: path.join(portfolioGamesDir, 'One Wrong Step/screen.png'),
    bookletBackImg: path.join(portfolioGamesDir, 'One Wrong Step/1.png'),
    spread1: path.join(portfolioGamesDir, 'One Wrong Step/screen.png'),
    spread2: path.join(portfolioGamesDir, 'One Wrong Step/1.png'),
    tracks: [
      { title: 'Gravitational Matrix', length: 224 },
      { title: 'Chamber 14 Descent', length: 186 },
      { title: 'Singularity Paradox', length: 254 },
      { title: 'Non-Euclidean Echoes', length: 205 },
    ],
  },
  {
    id: 'ashen-veil',
    title: 'Ashen Veil',
    artist: 'Sanyukt // Combat Systems & Shaders',
    year: '2023',
    kind: 'Dark Fantasy Action RPG · PC Edition',
    color: '#141216',
    accent: '#ef5143',
    motif: 'arches',
    coverImg: path.join(portfolioGamesDir, 'SoulsLike/dark_gothic_fantasy_souls_like_digital_oil_painting._wide_cinematic_16_9_aspect.png'),
    discImg: path.join(portfolioGamesDir, 'SoulsLike/dark_gothic_fantasy_souls_like_digital_oil_painting._in_the_center_of_the_frame.png'),
    backImg: path.join(portfolioGamesDir, 'SoulsLike/wide_cinematic_16_9_aspect_ratio_artwork_for_pc._a_solitary_weary_knight_in.png'),
    bookletBackImg: path.join(portfolioGamesDir, 'SoulsLike/dark_gothic_fantasy_souls_like_digital_oil_painting._in_the_center_of_the_frame.png'),
    spread1: path.join(portfolioGamesDir, 'SoulsLike/wide_cinematic_16_9_aspect_ratio_artwork_for_pc._a_solitary_weary_knight_in.png'),
    spread2: path.join(portfolioGamesDir, 'SoulsLike/dark_gothic_fantasy_souls_like_digital_oil_painting._wide_cinematic_16_9_aspect.png'),
    tracks: [
      { title: 'The Solitary Knight', length: 280 },
      { title: 'Cathedral of Ash', length: 310 },
      { title: 'The Forgotten Monarch', length: 265 },
      { title: 'Embers of the Fallen Empire', length: 240 },
    ],
  },
];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

async function convertFile(src, outBase, width, height, fit = 'cover') {
  const pipeline = sharp(src).resize(width, height, { fit, position: 'center' });
  const avif = `${outBase}.avif`;
  const webp = `${outBase}.webp`;

  await pipeline.clone().avif({ quality: 62 }).toFile(avif);
  await pipeline.clone().webp({ quality: 85 }).toFile(webp);
}

async function processGame(game, targetBaseDir) {
  const albumDir = path.join(targetBaseDir, game.id);
  const bookletDir = path.join(albumDir, 'booklet');
  await ensureDir(albumDir);
  await ensureDir(bookletDir);

  console.log(`Processing ${game.title} into ${albumDir}...`);

  // Cover: 1024x1024, small: 640x640
  await convertFile(game.coverImg, path.join(albumDir, 'cover'), 1024, 1024);
  await convertFile(game.coverImg, path.join(albumDir, 'cover-small'), 640, 640);

  // Disc: 1200x1200, small: 512x512
  await convertFile(game.discImg, path.join(albumDir, 'disc'), 1200, 1200);
  await convertFile(game.discImg, path.join(albumDir, 'disc-small'), 512, 512);

  // Back: 1320x1024
  await convertFile(game.backImg, path.join(albumDir, 'back'), 1320, 1024);

  // Booklet Back: 1024x1024
  await convertFile(game.bookletBackImg, path.join(albumDir, 'booklet-back'), 1024, 1024);

  // Booklet interior spreads: 2048x1024
  await convertFile(game.spread1, path.join(bookletDir, '02'), 2048, 1024);
  await convertFile(game.spread2, path.join(bookletDir, '03'), 2048, 1024);
}

async function main() {
  for (const game of GAMES) {
    await processGame(game, discographyAlbumsDir);
    await processGame(game, clientDiscographyAlbumsDir);
  }

  // Update collection.json with ONLY the 3 game projects, matching the dark projects theme
  const colPath = path.join(discographyAlbumsDir, 'collection.json');
  const clientColPath = path.join(clientDiscographyAlbumsDir, 'collection.json');

  const newGameAlbums = GAMES.map((g) => ({
    id: g.id,
    artist: g.artist,
    title: g.title,
    year: g.year,
    kind: g.kind,
    cover: 'cover.avif',
    coverSmall: 'cover-small.avif',
    disc: 'disc.avif',
    discSmall: 'disc-small.avif',
    back: 'back.avif',
    bookletBack: 'booklet-back.avif',
    bookletScans: ['booklet/02.avif', 'booklet/03.avif'],
    bookletPageCount: 6,
    bookletFit: 'contain',
    color: g.color,
    accent: g.accent,
    motif: g.motif,
    tracks: g.tracks,
  }));

  const updatedConfig = {
    name: 'Game Projects // Physical Archives',
    theme: {
      background: '#07070a',
      backgroundCenter: '#101016',
      backgroundEdge: '#040406',
      ink: '#ffffff',
    },
    albums: newGameAlbums, // ONLY the 3 projects!
  };

  const jsonStr = JSON.stringify(updatedConfig, null, 2);
  await fs.writeFile(colPath, jsonStr, 'utf8');
  await fs.writeFile(clientColPath, jsonStr, 'utf8');

  console.log('Successfully generated the 3 game projects and updated collection.json with ONLY 3 projects in dark theme!');
}

main().catch(console.error);

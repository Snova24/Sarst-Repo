const canvas = document.getElementById("view");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");
const lootEl = document.getElementById("loot");
const timerEl = document.getElementById("timer");

const TILE = 30;
const COLS = 32;
const ROWS = 18;
const SPEED = 220;
const LOCK_SECONDS = 90;

// 0 floor, 1 wall, 2 extract
const LAYOUT = [
  "11111111111111111111111111111111",
  "12221100000000000000000000000111",
  "12221100000000000000000000000111",
  "12221100000000000000000000000111",
  "11111100000000000000000000000111",
  "11100000000000000000000000000111",
  "11100000000011100000000000000111",
  "11100000000011100000000000000111",
  "11100000000000000000000000000111",
  "11100000000000000000011100000111",
  "11100000000000000000011100000111",
  "11100000000000000000000000000111",
  "11100000000000000000000000000111",
  "11100000000000000000000000000111",
  "11100000000000000000000000000111",
  "11100000000000000000000000000111",
  "11100000000000000000000000000111",
  "11111111111111111111111111111111",
];

const LOOT_SPOTS = [
  { c: 10, r: 8 },
  { c: 22, r: 6 },
  { c: 24, r: 13 },
];

const ASSETS = {
  player: loadImage("../assets/player.png"),
  loot: loadImage("../assets/loot.png"),
  extract: loadImage("../assets/extract.png"),
};

function loadImage(src) {
  const img = new Image();
  const state = { img, ok: false };
  img.onload = () => {
    state.ok = true;
  };
  img.src = src;
  return state;
}

function rect(c, r, w = 1, h = 1) {
  return { x: c * TILE, y: r * TILE, w: w * TILE, h: h * TILE };
}

const walls = [];
const extracts = [];
for (let r = 0; r < ROWS; r += 1) {
  for (let c = 0; c < COLS; c += 1) {
    const cell = LAYOUT[r][c];
    if (cell === "1") walls.push(rect(c, r));
    if (cell === "2") extracts.push(rect(c, r));
  }
}

const keys = new Set();
const spawn = { x: 2.2 * TILE, y: 2.2 * TILE };

function freshLoot() {
  return LOOT_SPOTS.map((spot) => ({
    ...rect(spot.c, spot.r, 0.7, 0.7),
    taken: false,
  }));
}

const player = {
  x: spawn.x,
  y: spawn.y,
  w: 22,
  h: 22,
};

let loot = freshLoot();
let grabbed = 0;
let lockStarted = false;
let lockEndsAt = 0;
let outcome = null;
let last = performance.now();

window.addEventListener("keydown", (event) => {
  keys.add(event.key.toLowerCase());
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(event.key.toLowerCase())) {
    event.preventDefault();
  }
  if (event.key.toLowerCase() === "r") reset();
  if (event.key.toLowerCase() === "e" || event.key === " ") tryGrab();
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

function reset() {
  player.x = spawn.x;
  player.y = spawn.y;
  loot = freshLoot();
  grabbed = 0;
  lockStarted = false;
  lockEndsAt = 0;
  outcome = null;
  statusEl.textContent = "WASD move · E grab · get out";
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function moveAxis(dx, dy) {
  player.x += dx;
  player.y += dy;
  for (const wall of walls) {
    if (overlaps(player, wall)) {
      if (dx > 0) player.x = wall.x - player.w;
      if (dx < 0) player.x = wall.x + wall.w;
      if (dy > 0) player.y = wall.y - player.h;
      if (dy < 0) player.y = wall.y + wall.h;
    }
  }
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.h, player.y));
}

function inExtract() {
  return extracts.some((zone) => overlaps(player, zone));
}

function tryGrab() {
  if (outcome) return;
  for (const token of loot) {
    if (!token.taken && overlaps(player, token)) {
      token.taken = true;
      grabbed += 1;
      if (!lockStarted) {
        lockStarted = true;
        lockEndsAt = performance.now() + LOCK_SECONDS * 1000;
        statusEl.textContent = "LOCK-DOWN — get to extract";
      }
    }
  }
}

function tick(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  if (!outcome) {
    let dx = 0;
    let dy = 0;
    if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
    if (keys.has("d") || keys.has("arrowright")) dx += 1;
    if (keys.has("w") || keys.has("arrowup")) dy -= 1;
    if (keys.has("s") || keys.has("arrowdown")) dy += 1;
    if (dx || dy) {
      const len = Math.hypot(dx, dy) || 1;
      moveAxis((dx / len) * SPEED * dt, 0);
      moveAxis(0, (dy / len) * SPEED * dt);
    }

    if (lockStarted) {
      const remain = Math.max(0, lockEndsAt - now);
      if (inExtract() && grabbed > 0) {
        outcome = "win";
        statusEl.textContent = `EXTRACTED — ${grabbed}/3`;
      } else if (remain <= 0) {
        outcome = "lose";
        statusEl.textContent = "LOCKED IN";
      }
    }
  }

  draw(now);
  lootEl.textContent = `${grabbed}/3`;
  if (!lockStarted) timerEl.textContent = "—";
  else if (outcome) timerEl.textContent = outcome === "win" ? "CLEAR" : "0.0";
  else timerEl.textContent = `${Math.max(0, (lockEndsAt - now) / 1000).toFixed(1)}s`;

  requestAnimationFrame(tick);
}

function fillRect(r, color) {
  ctx.fillStyle = color;
  ctx.fillRect(r.x, r.y, r.w, r.h);
}

function drawSprite(asset, r, fallback) {
  if (asset.ok) ctx.drawImage(asset.img, r.x, r.y, r.w, r.h);
  else fillRect(r, fallback);
}

function draw(now) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1b212c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const wall of walls) fillRect(wall, "#2c3444");
  for (const zone of extracts) drawSprite(ASSETS.extract, zone, "#1f6f4a");
  for (const token of loot) {
    if (!token.taken) drawSprite(ASSETS.loot, token, "#e7c34a");
  }
  drawSprite(ASSETS.player, player, "#f4f7fb");

  if (outcome) {
    ctx.fillStyle = "rgba(8, 10, 14, 0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e8edf4";
    ctx.font = "28px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(outcome === "win" ? `EXTRACTED — ${grabbed}/3` : "LOCKED IN", canvas.width / 2, canvas.height / 2);
    ctx.font = "16px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#8b95a8";
    ctx.fillText("Press R to retry", canvas.width / 2, canvas.height / 2 + 32);
  }

  if (lockStarted && !outcome) {
    const pulse = 0.5 + 0.5 * Math.sin(now / 180);
    ctx.strokeStyle = `rgba(255, 90, 90, ${0.35 + pulse * 0.25})`;
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
  }
}

reset();
requestAnimationFrame(tick);

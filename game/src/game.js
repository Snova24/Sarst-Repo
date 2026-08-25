const canvas = document.getElementById("view");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");
const lootEl = document.getElementById("loot");
const timerEl = document.getElementById("timer");

const SPEED = 240;
const SHOT_SPEED = 520;
const FIRE_MS = 220;
const LOCK_SECONDS = 90;

const ASSETS = {
  player: loadImage("../assets/player.png"),
  loot: loadImage("../assets/node.png"),
  extract: loadImage("../assets/exit.png"),
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

function box(x, y, w, h) {
  return { x, y, w, h };
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

const walls = [
  box(0, 0, 960, 24),
  box(0, 516, 960, 24),
  box(0, 0, 24, 540),
  box(936, 0, 24, 540),
  box(300, 120, 24, 300),
  box(300, 120, 220, 24),
  box(620, 280, 24, 236),
];

const keys = new Set();
const spawn = { x: 56, y: 250 };
const mouse = { x: 480, y: 270 };
let lastShot = 0;

const player = { x: spawn.x, y: spawn.y, w: 28, h: 28 };
let shots = [];
let crate = null;
let nodes = [];
let exitZone = box(860, 220, 60, 100);
let solved = 0;
let lockStarted = false;
let lockEndsAt = 0;
let outcome = null;
let last = performance.now();

function resetNodes() {
  nodes = [
    { ...box(160, 80, 28, 28), on: false },
    { ...box(430, 360, 28, 28), on: false },
    { ...box(760, 80, 28, 28), on: false },
  ];
  crate = box(730, 70, 90, 50);
  shots = [];
  solved = 0;
}

window.addEventListener("keydown", (event) => {
  keys.add(event.key.toLowerCase());
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(event.key.toLowerCase())) {
    event.preventDefault();
  }
  if (event.key.toLowerCase() === "r") reset();
  if (event.key === " " && !outcome) fire(performance.now());
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

canvas.addEventListener("mousemove", (event) => {
  const r = canvas.getBoundingClientRect();
  const sx = canvas.width / r.width;
  const sy = canvas.height / r.height;
  mouse.x = (event.clientX - r.left) * sx;
  mouse.y = (event.clientY - r.top) * sy;
});

canvas.addEventListener("mousedown", (event) => {
  event.preventDefault();
  if (!outcome) fire(performance.now());
});

function reset() {
  player.x = spawn.x;
  player.y = spawn.y;
  resetNodes();
  lockStarted = false;
  lockEndsAt = 0;
  outcome = null;
  statusEl.textContent = "WASD move · mouse aim · click shoot";
}

function moveAxis(dx, dy) {
  player.x += dx;
  player.y += dy;
  const blockers = crate ? walls.concat(crate) : walls;
  for (const wall of blockers) {
    if (overlaps(player, wall)) {
      if (dx > 0) player.x = wall.x - player.w;
      if (dx < 0) player.x = wall.x + wall.w;
      if (dy > 0) player.y = wall.y - player.h;
      if (dy < 0) player.y = wall.y + wall.h;
    }
  }
}

function fire(now) {
  if (now - lastShot < FIRE_MS) return;
  lastShot = now;
  const cx = player.x + player.w / 2;
  const cy = player.y + player.h / 2;
  const ang = Math.atan2(mouse.y - cy, mouse.x - cx);
  shots.push({
    x: cx - 4,
    y: cy - 4,
    w: 8,
    h: 8,
    vx: Math.cos(ang) * SHOT_SPEED,
    vy: Math.sin(ang) * SHOT_SPEED,
  });
  if (!lockStarted) {
    lockStarted = true;
    lockEndsAt = now + LOCK_SECONDS * 1000;
    statusEl.textContent = "CLOCK — solve and exit";
  }
}

function hitWorld(shot) {
  if (crate && overlaps(shot, crate)) {
    crate = null;
    return true;
  }
  for (const node of nodes) {
    if (!node.on && overlaps(shot, node)) {
      node.on = true;
      solved = nodes.filter((n) => n.on).length;
      if (solved === 3) statusEl.textContent = "EXIT OPEN — get out";
      return true;
    }
  }
  return walls.some((wall) => overlaps(shot, wall));
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

    shots = shots.filter((shot) => {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      if (shot.x < -20 || shot.y < -20 || shot.x > 980 || shot.y > 560) return false;
      return !hitWorld(shot);
    });

    if (solved === 3 && overlaps(player, exitZone)) {
      outcome = "win";
      statusEl.textContent = "SOLVED";
    } else if (lockStarted && now >= lockEndsAt) {
      outcome = "lose";
      statusEl.textContent = "POWER DOWN";
    }
  }

  draw();
  lootEl.textContent = `${solved}/3`;
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

function draw() {
  ctx.fillStyle = "#1b212c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const wall of walls) fillRect(wall, "#2c3444");
  fillRect(exitZone, solved === 3 ? "#1f6f4a" : "#5a2430");
  drawSprite(ASSETS.extract, exitZone, solved === 3 ? "#1f6f4a" : "#5a2430");
  if (crate) fillRect(crate, "#8a6a3b");
  for (const node of nodes) {
    drawSprite(ASSETS.loot, node, node.on ? "#7dffb3" : "#5aa0ff");
  }
  for (const shot of shots) fillRect(shot, "#ffe08a");

  const cx = player.x + player.w / 2;
  const cy = player.y + player.h / 2;
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
  drawSprite(ASSETS.player, player, "#d7e2f0");
  ctx.fillStyle = "#1b212c";
  ctx.fillRect(cx - 3, cy - 3, 6, 6);

  if (outcome) {
    ctx.fillStyle = "rgba(8, 10, 14, 0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e8edf4";
    ctx.font = "28px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(outcome === "win" ? "SOLVED" : "POWER DOWN", canvas.width / 2, canvas.height / 2);
    ctx.font = "16px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#8b95a8";
    ctx.fillText("Press R to retry", canvas.width / 2, canvas.height / 2 + 32);
  }
}

reset();
requestAnimationFrame(tick);

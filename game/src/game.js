const canvas = document.getElementById("view");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");
const waveEl = document.getElementById("wave");
const hpEl = document.getElementById("hp");
const lootEl = document.getElementById("loot");
const killsEl = document.getElementById("kills");

const W = 960;
const H = 540;
const FIRE_BASE = 280;
const WAVES = [
  { drones: 3, nodes: 1 },
  { drones: 8, nodes: 1 },
  { drones: 12, nodes: 2 },
];

const POOL = [
  { id: "dmg", name: "HOT BARREL", desc: "+1 damage" },
  { id: "rof", name: "COOLANT", desc: "faster fire" },
  { id: "spd", name: "SERVOS", desc: "+move speed" },
  { id: "hp", name: "PLATING", desc: "+2 HP" },
  { id: "pierce", name: "AP ROUNDS", desc: "shots pierce +1" },
  { id: "multi", name: "DUAL LINK", desc: "+1 projectile" },
];

const keys = new Set();
const mouse = { x: W / 2, y: H / 2 };
let lastShot = 0;
let last = performance.now();
let iFrames = 0;
let aggroIn = 0;
let bumpSafe = 0;
let bumpArmed = false;
let canvasArmed = false;
let w1AwaitNode = false;
let w1ImmuneUntil = 0;

function loadSprite(file) {
  const img = new Image();
  img.ready = false;
  img.onload = () => {
    img.ready = true;
  };
  img.onerror = () => {
    img.ready = false;
  };
  img.src = `assets/${file}`;
  return img;
}

const spr = {
  player: loadSprite("player.png"),
  drone: loadSprite("drone.png"),
  node: loadSprite("node.png"),
};

function blit(img, r, fallback) {
  if (img.ready) ctx.drawImage(img, r.x, r.y, r.w, r.h);
  else fill(r, fallback);
}

const player = {
  x: W / 2 - 14,
  y: H / 2 - 14,
  w: 28,
  h: 28,
  hp: 5,
  maxHp: 5,
  speed: 230,
  dmg: 1,
  fireMs: FIRE_BASE,
  pierce: 0,
  extra: 0,
};

let waveIndex = 0;
let drones = [];
let nodes = [];
let shots = [];
let kills = 0;
let mode = "play"; // play | pick | win | lose
let cards = [];
let cardBoxes = [];

function box(x, y, w, h) {
  return { x, y, w, h };
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function clampPlayer() {
  player.x = Math.max(8, Math.min(W - player.w - 8, player.x));
  player.y = Math.max(8, Math.min(H - player.h - 8, player.y));
}

function spawnDrones(count) {
  drones = [];
  for (let i = 0; i < count; i += 1) {
    const edge = i % 4;
    let x = 40;
    let y = 40;
    if (edge === 0) {
      x = 40 + Math.random() * (W - 80);
      y = 20;
    } else if (edge === 1) {
      x = 40 + Math.random() * (W - 80);
      y = H - 36;
    } else if (edge === 2) {
      x = 20;
      y = 40 + Math.random() * (H - 80);
    } else {
      x = W - 36;
      y = 40 + Math.random() * (H - 80);
    }
    drones.push({ x, y, w: 22, h: 22, hp: 1 + Math.floor(waveIndex / 2), speed: 40 + waveIndex * 18 });
  }
}

function releaseW1Horde() {
  if (!w1AwaitNode) return;
  w1AwaitNode = false;
  spawnDrones(WAVES[0].drones);
  aggroIn = 0.45;
  bumpSafe = 20;
  bumpArmed = true;
  w1ImmuneUntil = performance.now() + 20000;
  if (mode === "play") {
    statusEl.textContent = "WAVE 1 — horde incoming. Kill RED drones";
  }
}

function spawnWave() {
  const spec = WAVES[waveIndex];
  drones = [];
  nodes = [];
  shots = [];
  // Playtest 79ff71e: freeze + HUD do not get a stranger to shoot NODE.
  // W1 has no reds until the node is ON, then the 3-drone horde spawns.
  w1AwaitNode = waveIndex === 0;
  if (!w1AwaitNode) spawnDrones(spec.drones);
  aggroIn = waveIndex === 0 ? 0 : 0.45;
  bumpSafe = 0;
  bumpArmed = false;
  w1ImmuneUntil = 0;
  const spots = [
    [180, 140],
    [760, 140],
    [180, 380],
    [760, 380],
    [480, 80],
  ];
  for (let n = 0; n < spec.nodes; n += 1) {
    const [nx, ny] = spots[n];
    nodes.push({ x: nx, y: ny, w: 40, h: 40, on: false });
  }
  mode = "play";
  statusEl.textContent =
    waveIndex === 0
      ? "WAVE 1 — no drones yet. SHOOT THE BLUE NODE ON to start the horde"
      : `WAVE ${waveIndex + 1} — kill RED drones AND shoot BLUE NODE ON`;
}

function resetRun() {
  player.x = W / 2 - 14;
  player.y = H / 2 - 14;
  player.hp = 5;
  player.maxHp = 5;
  player.speed = 230;
  player.dmg = 1;
  player.fireMs = FIRE_BASE;
  player.pierce = 0;
  player.extra = 0;
  waveIndex = 0;
  kills = 0;
  cards = [];
  spawnWave();
}

function waveClear() {
  if (w1AwaitNode) return false;
  return drones.length === 0 && nodes.length > 0 && nodes.every((n) => n.on);
}

function offerUpgrades() {
  const pool = [...POOL];
  cards = [];
  for (let i = 0; i < 3; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);
    cards.push(pool.splice(idx, 1)[0]);
  }
  const bw = 220;
  const bh = 120;
  const gap = 24;
  const total = 3 * bw + 2 * gap;
  const x0 = (W - total) / 2;
  cardBoxes = cards.map((c, i) => ({
    ...c,
    x: x0 + i * (bw + gap),
    y: 200,
    w: bw,
    h: bh,
  }));
  mode = "pick";
  statusEl.textContent = "PICK AN UPGRADE";
}

function applyCard(id) {
  if (id === "dmg") player.dmg += 1;
  if (id === "rof") player.fireMs = Math.max(90, player.fireMs - 50);
  if (id === "spd") player.speed += 40;
  if (id === "hp") {
    player.maxHp += 2;
    player.hp = Math.min(player.maxHp, player.hp + 2);
  }
  if (id === "pierce") player.pierce += 1;
  if (id === "multi") player.extra += 1;
  waveIndex += 1;
  spawnWave();
}

function fire(now) {
  if (now - lastShot < player.fireMs) return;
  lastShot = now;
  const cx = player.x + player.w / 2;
  const cy = player.y + player.h / 2;
  const ang = Math.atan2(mouse.y - cy, mouse.x - cx);
  const count = 1 + player.extra;
  const spread = count === 1 ? 0 : 0.18;
  for (let i = 0; i < count; i += 1) {
    const a = ang + (i - (count - 1) / 2) * spread;
    shots.push({
      x: cx - 4,
      y: cy - 4,
      w: 8,
      h: 8,
      vx: Math.cos(a) * 560,
      vy: Math.sin(a) * 560,
      pierce: player.pierce,
    });
  }
}

window.addEventListener("keydown", (event) => {
  keys.add(event.key.toLowerCase());
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(event.key.toLowerCase())) {
    event.preventDefault();
  }
  if (event.key.toLowerCase() === "r") resetRun();
  if (event.key === " " && mode === "play") fire(performance.now());
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

canvas.addEventListener("mousemove", (event) => {
  const r = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - r.left) * W) / r.width;
  mouse.y = ((event.clientY - r.top) * H) / r.height;
});

canvas.addEventListener("mousedown", (event) => {
  event.preventDefault();
  const r = canvas.getBoundingClientRect();
  const mx = ((event.clientX - r.left) * W) / r.width;
  const my = ((event.clientY - r.top) * H) / r.height;
  if (mode === "pick") {
    const hit = cardBoxes.find((c) => mx >= c.x && mx <= c.x + c.w && my >= c.y && my <= c.y + c.h);
    if (hit) applyCard(hit.id);
    return;
  }
  // First click focuses the arena; it does not shoot (Playtest P0-2).
  // Do not overwrite the W1 freeze order (Playtest 28b436d P1).
  if (!canvasArmed) {
    canvasArmed = true;
    canvas.focus();
    if (mode === "play" && aggroIn <= 0 && !w1AwaitNode) {
      statusEl.textContent = "Click again or press SPACE to shoot";
    }
    return;
  }
  if (mode === "play") fire(performance.now());
});

function tick(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  iFrames = Math.max(0, iFrames - dt);

  if (mode === "play") {
    let dx = 0;
    let dy = 0;
    if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
    if (keys.has("d") || keys.has("arrowright")) dx += 1;
    if (keys.has("w") || keys.has("arrowup")) dy -= 1;
    if (keys.has("s") || keys.has("arrowdown")) dy += 1;
    if (dx || dy) {
      const len = Math.hypot(dx, dy) || 1;
      player.x += (dx / len) * player.speed * dt;
      player.y += (dy / len) * player.speed * dt;
      clampPlayer();
    }

    const wasAggro = aggroIn;
    aggroIn = Math.max(0, aggroIn - dt);
    if (wasAggro > 0 && aggroIn <= 0 && mode === "play" && waveIndex === 0) {
      statusEl.textContent = nodes.every((n) => n.on)
        ? "WAVE 1 — kill RED drones"
        : "WAVE 1 — kill RED drones AND shoot BLUE NODE ON";
    }
    for (const d of drones) {
      if (aggroIn > 0) continue;
      const cx = player.x + player.w / 2 - (d.x + d.w / 2);
      const cy = player.y + player.h / 2 - (d.y + d.h / 2);
      const len = Math.hypot(cx, cy) || 1;
      d.x += (cx / len) * d.speed * dt;
      d.y += (cy / len) * d.speed * dt;
      const immune = bumpSafe > 0 || performance.now() < w1ImmuneUntil;
      if (overlaps(player, d)) {
        if (bumpArmed) {
          bumpSafe = Math.max(bumpSafe, 5.5);
          bumpArmed = false;
        }
        player.x += (cx / len) * 28;
        player.y += (cy / len) * 28;
        clampPlayer();
        if (immune || bumpSafe > 0) {
          iFrames = 0.45;
          continue;
        }
        if (iFrames > 0) continue;
        iFrames = 0.7;
        player.hp -= 1;
        if (player.hp <= 0) {
          mode = "lose";
          statusEl.textContent = "POWER DOWN";
        }
      }
    }
    bumpSafe = Math.max(0, bumpSafe - dt);

    shots = shots.filter((shot) => {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      if (shot.x < -20 || shot.y < -20 || shot.x > W + 20 || shot.y > H + 20) return false;
      for (const node of nodes) {
        if (!node.on && overlaps(shot, node)) {
          node.on = true;
          if (waveIndex === 0) releaseW1Horde();
          return shot.pierce-- > 0;
        }
      }
      for (let i = drones.length - 1; i >= 0; i -= 1) {
        if (overlaps(shot, drones[i])) {
          drones[i].hp -= player.dmg;
          if (drones[i].hp <= 0) {
            drones.splice(i, 1);
            kills += 1;
          }
          return shot.pierce-- > 0;
        }
      }
      return true;
    });

    if (!w1AwaitNode && drones.length === 0 && nodes.some((n) => !n.on) && mode === "play") {
      statusEl.textContent = `WAVE ${waveIndex + 1} STUCK — drones down. SHOOT THE BLUE NODE ON`;
    }

    if (waveClear()) {
      if (waveIndex >= WAVES.length - 1) {
        mode = "win";
        statusEl.textContent = "SOLVED";
      } else {
        offerUpgrades();
      }
    }
  }

  draw();
  waveEl.textContent = mode === "win" ? "CLEAR" : `W${waveIndex + 1}`;
  hpEl.textContent = String(Math.max(0, player.hp));
  lootEl.textContent = `${nodes.filter((n) => n.on).length}/${Math.max(1, nodes.length)}`;
  killsEl.textContent = String(kills);
  requestAnimationFrame(tick);
}

function fill(r, color) {
  ctx.fillStyle = color;
  ctx.fillRect(r.x, r.y, r.w, r.h);
}

function drawNode(node, now) {
  const pulse = node.on ? 1 : 0.55 + 0.45 * Math.abs(Math.sin(now / 220));
  ctx.save();
  ctx.globalAlpha = pulse;
  if (spr.node.ready) ctx.drawImage(spr.node, node.x, node.y, node.w, node.h);
  else {
    ctx.fillStyle = node.on ? "#7dffb3" : "#4d8dff";
    ctx.fillRect(node.x, node.y, node.w, node.h);
  }
  ctx.strokeStyle = node.on ? "#e8edf4" : "#ffe08a";
  ctx.lineWidth = 3;
  ctx.strokeRect(node.x, node.y, node.w, node.h);
  ctx.restore();
  ctx.fillStyle = node.on ? "#141820" : "#ffe08a";
  ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(node.on ? "ON" : "NODE", node.x + node.w / 2, node.y + node.h + 12);
  if (!node.on) {
    ctx.fillStyle = "#ffe08a";
    ctx.font = "10px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("SHOOT", node.x + node.w / 2, node.y - 8);
  }
}

function draw() {
  ctx.fillStyle = "#141820";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#2a3140";
  ctx.strokeRect(6, 6, W - 12, H - 12);

  const now = performance.now();
  for (const node of nodes) drawNode(node, now);
  for (const d of drones) blit(spr.drone, d, "#d45b5b");
  ctx.fillStyle = "#e8edf4";
  ctx.font = "9px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  for (const d of drones) ctx.fillText("DRONE", d.x + d.w / 2, d.y - 4);
  for (const shot of shots) fill(shot, "#ffe08a");

  const cx = player.x + player.w / 2;
  const cy = player.y + player.h / 2;
  if (mode === "play") {
    for (const node of nodes) {
      if (node.on) continue;
      ctx.strokeStyle = "rgba(77,141,255,0.45)";
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(node.x + node.w / 2, node.y + node.h / 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
  blit(spr.player, player, iFrames > 0 ? "#9aa4b8" : "#e8edf4");
  if (!spr.player.ready) {
    ctx.fillStyle = "#141820";
    ctx.fillRect(cx - 3, cy - 3, 6, 6);
  }
  ctx.fillStyle = "#8b95a8";
  ctx.font = "9px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("YOU", cx, player.y - 6);

  ctx.fillStyle = "#2a3140";
  ctx.fillRect(16, H - 22, 120, 8);
  ctx.fillStyle = "#7dffb3";
  ctx.fillRect(16, H - 22, 120 * (player.hp / player.maxHp), 8);
  if ((bumpSafe > 0 || performance.now() < w1ImmuneUntil) && mode === "play") {
    ctx.fillStyle = "#7dffb3";
    ctx.font = "10px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("BUMP SAFE", 16, H - 28);
  }

  if (mode === "pick") {
    ctx.fillStyle = "rgba(8,10,14,0.62)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#e8edf4";
    ctx.font = "22px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("WAVE CLEAR — pick one", W / 2, 160);
    for (const c of cardBoxes) {
      ctx.fillStyle = "#1c2430";
      ctx.fillRect(c.x, c.y, c.w, c.h);
      ctx.strokeStyle = "#7dffb3";
      ctx.strokeRect(c.x, c.y, c.w, c.h);
      ctx.fillStyle = "#7dffb3";
      ctx.font = "16px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(c.name, c.x + c.w / 2, c.y + 48);
      ctx.fillStyle = "#8b95a8";
      ctx.font = "13px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(c.desc, c.x + c.w / 2, c.y + 78);
    }
  }

  if (mode === "win" || mode === "lose") {
    ctx.fillStyle = "rgba(8,10,14,0.55)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#e8edf4";
    ctx.font = "32px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(mode === "win" ? "SOLVED" : "POWER DOWN", W / 2, H / 2);
    ctx.font = "16px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#8b95a8";
    ctx.fillText("Press R to retry", W / 2, H / 2 + 36);
  }
}

resetRun();
window.__rps = () => ({
  hp: player.hp,
  bumpSafe,
  immune: performance.now() < w1ImmuneUntil,
  drones: drones.length,
  nodeOn: nodes.filter((n) => n.on).length,
  w1AwaitNode,
  mode,
});
requestAnimationFrame(tick);

import { SpaceScene } from './scene/spaceScene';
import { beginVoyage, createInitialState } from './state/gameState';
import { loadSaveData } from './save/storage';
import './ui/styles.css';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root is missing');
const root = app;
const state = createInitialState();
const save = loadSaveData();
let spaceScene: SpaceScene | undefined;

function renderTitle(): void {
  root.innerHTML = `<main class="game"><div class="scene" id="scene"></div><section class="title-screen"><div class="title-copy"><p class="eyebrow">NAVIGATION SYSTEM / 1969—2026</p><h1>SPACE<br>TRAVEL</h1><p class="subtitle">A quiet voyage through the solar system. Chart your own route, observe the light, and leave a trace in the ship's local records.</p><button class="start-button" id="start">宇宙旅行を開始 <span aria-hidden="true">→</span></button></div></section></main>`;
  spaceScene = new SpaceScene(document.querySelector<HTMLElement>('#scene')!);
  document.querySelector<HTMLButtonElement>('#start')?.addEventListener('click', () => { beginVoyage(state); renderFlight(); });
}
function renderFlight(): void {
  spaceScene?.dispose();
  root.innerHTML = `<main class="game"><div class="scene" id="scene"></div><div class="flight-content"><div class="topbar"><span class="flight-label">FLIGHT DECK / ACTIVE</span><span>LOCAL RECORDS // ${save.visitedBodies.length.toString().padStart(2, '0')} BODIES</span></div><div class="flight-title"><h2>DEEP SPACE</h2><p>VISUALIZATION MODE · ORBITAL DATA STANDBY</p></div><section class="hud" aria-label="宇宙船操作盤"><div class="hud-area"><div class="hud-kicker">THRUST</div><div class="hud-value">STANDBY</div><div class="hud-note">W / S 推力制御</div></div><div class="hud-area center"><div><div class="hud-kicker">VESSEL STATUS</div><div class="hud-value">NOMINAL</div><div class="hud-note">次の航海機能は順次追加されます</div></div></div><div class="hud-area"><div class="hud-kicker">NAVIGATION</div><div class="hud-value">SOL / 001</div><div class="hud-note">A / D 旋回  ·  Q / E スケール</div></div></section></div></main>`;
  spaceScene = new SpaceScene(document.querySelector<HTMLElement>('#scene')!);
}
renderTitle();



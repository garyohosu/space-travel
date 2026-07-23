export interface SaveData { version: 1; updatedAt: string; visitedBodies: string[]; score: number; }
export interface ScoreRecord { score: number; visitedBodies: number; recordedAt: string; }
export interface ScoreRepository { read(): ScoreRecord | null; write(record: ScoreRecord): void; }
const SAVE_KEY = 'space-travel.save.v1';
const SCORE_KEY = 'space-travel.score.v1';
function isSaveData(value: unknown): value is SaveData { if (!value || typeof value !== 'object') return false; const c = value as Partial<SaveData>; return c.version === 1 && typeof c.updatedAt === 'string' && Array.isArray(c.visitedBodies) && c.visitedBodies.every((b) => typeof b === 'string') && typeof c.score === 'number' && Number.isFinite(c.score); }
function parse<T>(raw: string | null, guard: (value: unknown) => value is T): T | null { if (!raw) return null; try { const value: unknown = JSON.parse(raw); return guard(value) ? value : null; } catch { return null; } }
export function emptySaveData(): SaveData { return { version: 1, updatedAt: new Date(0).toISOString(), visitedBodies: [], score: 0 }; }
export function loadSaveData(storage: Storage = window.localStorage): SaveData { try { return parse(storage.getItem(SAVE_KEY), isSaveData) ?? emptySaveData(); } catch { return emptySaveData(); } }
export function saveGame(data: SaveData, storage: Storage = window.localStorage): boolean { try { storage.setItem(SAVE_KEY, JSON.stringify(data)); return true; } catch { return false; } }
export function clearSaveData(storage: Storage = window.localStorage): boolean { try { storage.removeItem(SAVE_KEY); return true; } catch { return false; } }
export function createLocalScoreRepository(storage: Storage = window.localStorage): ScoreRepository { const isScore = (v: unknown): v is ScoreRecord => { if (!v || typeof v !== 'object') return false; const r = v as Partial<ScoreRecord>; return typeof r.score === 'number' && Number.isFinite(r.score) && typeof r.visitedBodies === 'number' && Number.isFinite(r.visitedBodies) && typeof r.recordedAt === 'string'; }; return { read: () => { try { return parse(storage.getItem(SCORE_KEY), isScore); } catch { return null; } }, write: (record) => { try { storage.setItem(SCORE_KEY, JSON.stringify(record)); } catch { /* fallback */ } } }; }

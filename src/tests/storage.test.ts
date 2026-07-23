import { describe, expect, it } from 'vitest';
import { createLocalScoreRepository, emptySaveData, loadSaveData, saveGame } from '../save/storage';

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return { get length() { return data.size; }, clear: () => data.clear(), getItem: (key) => data.get(key) ?? null, key: (index) => [...data.keys()][index] ?? null, removeItem: (key) => data.delete(key), setItem: (key, value) => data.set(key, value) } as Storage;
}

describe('local save storage', () => {
  it('round-trips save data without exposing storage details', () => { const storage = memoryStorage(); const save = { ...emptySaveData(), visitedBodies: ['Earth'], score: 100 }; expect(saveGame(save, storage)).toBe(true); expect(loadSaveData(storage)).toEqual(save); });
  it('falls back when saved JSON is corrupted', () => { const storage = memoryStorage(); storage.setItem('space-travel.save.v1', '{broken'); expect(loadSaveData(storage)).toEqual(emptySaveData()); });
  it('keeps score storage behind a replaceable repository interface', () => { const repository = createLocalScoreRepository(memoryStorage()); const record = { score: 42, visitedBodies: 2, recordedAt: '2026-07-23T00:00:00.000Z' }; repository.write(record); expect(repository.read()).toEqual(record); });
});

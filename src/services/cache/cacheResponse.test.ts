import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { CacheData } from "./cacheResponse.ts";

describe("CacheData", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ---------- MISS ----------
  it("executa a função no primeiro call (cache miss)", async () => {
    const fn = vi.fn((n: number) => n * 2);
    const cached = CacheData(fn, 60);

    const result = await cached(5);

    expect(result).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("salva o resultado no localStorage após um miss", async () => {
    const fn = vi.fn((n: number) => n * 2);
    const cached = CacheData(fn, 60);

    await cached(5);

    const stored = JSON.parse(localStorage.getItem("cache")!);
    expect(stored).toHaveLength(1);
    expect(stored[0].data).toBe(10);
    expect(stored[0].key).toBe(JSON.stringify([5]));
  });

  // ---------- HIT ----------
  it("usa o cache em chamadas subsequentes (cache hit)", async () => {
    const fn = vi.fn((n: number) => n * 2);
    const cached = CacheData(fn, 60);

    await cached(5);
    const second = await cached(5);

    expect(second).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1); // só chamou uma vez
  });

  it("NÃO chama a função no hit", async () => {
    const fn = vi.fn(() => "x");
    const cached = CacheData(fn, 60);

    await cached();
    await cached();
    await cached();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  // ---------- EXPIRAÇÃO ----------
  it("executa a função de novo após o stale_time", async () => {
    const fn = vi.fn((n: number) => n * 2);
    const cached = CacheData(fn, 60); // 60 segundos

    await cached(5);
    vi.advanceTimersByTime(61_000); // avança 61s
    await cached(5);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("NÃO executa de novo se o tempo não passou", async () => {
    const fn = vi.fn((n: number) => n * 2);
    const cached = CacheData(fn, 60);

    await cached(5);
    vi.advanceTimersByTime(30_000); // só 30s
    await cached(5);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  // ---------- CHAVES DIFERENTES ----------
  it("trata args diferentes como caches diferentes", async () => {
    const fn = vi.fn((n: number) => n * 2);
    const cached = CacheData(fn, 60);

    expect(await cached(2)).toBe(4);
    expect(await cached(3)).toBe(6);
    expect(await cached(2)).toBe(4);

    expect(fn).toHaveBeenCalledTimes(2); // chamado para 2 e 3, não de novo para 2
  });

  it("usa JSON.stringify dos args como chave", async () => {
    const fn = vi.fn((a: { x: number }) => a.x);
    const cached = CacheData(fn, 60);

    await cached({ x: 1 });
    await cached({ x: 1 }); // mesma chave apesar de objeto novo

    expect(fn).toHaveBeenCalledTimes(1);
  });

  // ---------- PERSISTÊNCIA ----------
  it("persiste o cache entre instâncias diferentes", async () => {
    const fn1 = vi.fn(() => "valor");
    const cached1 = CacheData(fn1, 60);
    await cached1();

    const fn2 = vi.fn(() => "outro valor");
    const cached2 = CacheData(fn2, 60);
    const result = await cached2();

    expect(result).toBe("valor"); // pegou do cache, não chamou fn2
    expect(fn2).not.toHaveBeenCalled();
  });

  // ---------- FUNÇÕES ASYNC ----------
  it("aguarda funções async", async () => {
    const fn = vi.fn(async (n: number) => {
      return n + 1;
    });
    const cached = CacheData(fn, 60);

    const result = await cached(5);
    expect(result).toBe(6);
  });

  it("cacheia o valor resolvido (não a Promise) para funções async", async () => {
    const fn = vi.fn(async () => "data");
    const cached = CacheData(fn, 60);

    await cached();

    const stored = JSON.parse(localStorage.getItem("cache")!);
    expect(stored[0].data).toBe("data");
    expect(stored[0].data).not.toBeInstanceOf(Promise);
  });

  // ---------- LIMPEZA ----------
  it("remove itens expirados do localStorage", async () => {
    const fn = vi.fn((n: number) => n);
    const cached = CacheData(fn, 60);

    await cached(1);
    vi.advanceTimersByTime(61_000);
    await cached(2); // força o readCache

    const stored = JSON.parse(localStorage.getItem("cache")!);
    expect(stored).toHaveLength(1);
    expect(stored[0].key).toBe(JSON.stringify([2]));
  });
});

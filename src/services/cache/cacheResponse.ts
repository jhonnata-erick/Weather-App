interface CacheJson {
  key: string;
  data: any;
  timeTostale: number;
}

export function CacheData<T extends any[], R>(
  func: (...args: T) => R,
  stale_time: number,
): (...args: T) => Promise<Awaited<R>> {
  const readCache: () => CacheJson[] = () => {
    const raw: string | null = localStorage.getItem("cache");
    const cacheList: CacheJson[] = raw ? JSON.parse(raw) : [];
    const filtered = cacheList.filter(
      (item) => item.timeTostale < Date.now() / 1000,
    );
    localStorage.setItem("cache", JSON.stringify(filtered));
    return filtered;
  };

  return async function (...args: T): Promise<Awaited<R>> {
    const cacheList = readCache();
    const key: string = JSON.stringify(args);

    const cached = cacheList.find((item) => item.key === key);

    if (cached) {
      console.log("Ja temos uma versao atualizada desses dados");
      return cached.data as Awaited<R>;
    }

    const data = await func(...args);
    const timeTostale = Date.now() / 1000 + stale_time;
    const cachejson: CacheJson = {
      key: key,
      data: data,
      timeTostale: timeTostale,
    };

    cacheList.push(cachejson);
    localStorage.setItem("cache", JSON.stringify(cacheList));
    return data;
  };
}

interface CacheJson {
  key: string;
  data: any;
  timeTostale: number;
}

export function CacheData<T extends any[], R>( //T agora pode ser tanto um tipo apenas, quanto um array de tipos
  func: (...args: T) => R,
  stale_time: number,
): (...args: T) => Promise<Awaited<R>> {
  const currentUTCsec = new Date().getTime() / 1000; // Define Segundo Atual
  const timeTostale = currentUTCsec + stale_time; // Definindo o segundo em que o dado será considerado antigo
  const cachedListString = localStorage.getItem("cache"); // Pegando o json de cache no local storage
  const cachedList: CacheJson[] | null = cachedListString // se for null cachedList é = a null
    ? JSON.parse(cachedListString)
    : null;

  let newCache: CacheJson[] = []; // variavel newCache definida
  if (cachedList) {
    newCache = cachedList.filter((item) => item.timeTostale > currentUTCsec);
  } // Se cachedlist não for nulo, cachedList é filtrado, pra ver se tem algum item guardado que é considerado antigo

  return async function (...args: T): Promise<Awaited<R>> {
    // Retorna uma nova função
    const key: string = JSON.stringify(args); // A chave é os argumentos dessa função
    const data = newCache.some((item) => item.key === key) // Se no array newCache for encontrada a mesma chave, é executada a função hit, se não, é execitada miss
      ? hit(key)
      : await miss(key, func(...args));
    return data;
  };

  async function miss(key: string, func: R): Promise<Awaited<R>> {
    const data: Awaited<R> = await func; // Executa a função original
    add(key, data); // Guarda o resultado
    return data; // E retorna ele
  }

  function add(key: string, data: Awaited<R>) {
    const cachejson: CacheJson = {
      // Novo objeto de cache do resultado
      key: key,
      data: data,
      timeTostale: timeTostale,
    };
    newCache.push(cachejson);
    localStorage.setItem("cache", JSON.stringify(newCache)); // O resultado agora é persistido
  }
  function hit(key: string) {
    //Retorna o resultado que ainda está novo
    const index = newCache.findIndex((item) => item.key === key);
    const item = newCache[index];
    const data: Awaited<R> = item?.data;
    return data;
  }
}

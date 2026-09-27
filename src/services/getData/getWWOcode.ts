export async function getWWOcode(code: number) {
  const response = await fetch(`/wwocode.json`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar JSON: ${response.statusText}`);
  }
  const wwoCodeList = await response.json();
  const weatherStatus: string = wwoCodeList[code];
  return weatherStatus;
}

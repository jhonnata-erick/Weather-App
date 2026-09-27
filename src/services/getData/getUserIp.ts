export async function getUserIp(): Promise<string> {
  const response = await fetch("https://api.ipify.org/?format=json");
  if (!response.ok) {
    throw new Error("Network error");
  }
  const data = await response.json();
  return data.ip;
}

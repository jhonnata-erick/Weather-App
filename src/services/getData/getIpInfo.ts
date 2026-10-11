import type { IpInfo } from "../../types/app-types.ts";

export async function getIpInfo(ip: string): Promise<IpInfo> {
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=188894`);
  if (!response.ok) {
    throw new Error("Network failed");
  }
  const data: IpInfo = await response.json();
  return data;
}

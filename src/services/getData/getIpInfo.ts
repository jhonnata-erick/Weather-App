import { HttpError } from "../../error/HttpRequest.ts";
import type { IpInfo } from "../../types/app-types.ts";

export async function getIpInfo(ip: string): Promise<IpInfo> {
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=188894`);
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(
      response.status,
      error.message,
      import.meta.url,
      response.url,
    );
  }
  const data: IpInfo = await response.json();
  return data;
}

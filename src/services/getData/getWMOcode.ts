import { HttpError } from "../../error/HttpRequest.ts";

export async function getWMOcode(
  code?: number,
): Promise<string | Record<number, string>> {
  const response = await fetch(`/wmocode.json`);
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(
      response.status,
      error.message,
      import.meta.url,
      response.url,
    );
  }
  const wmoCodeList: Record<number, string> = await response.json();
  return code ? wmoCodeList[code] || "Invalid WMO Code" : wmoCodeList;
}

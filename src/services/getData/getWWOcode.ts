import { HttpError } from "../../error/HttpRequest.ts";

export async function getWWOcode(code: number) {
  const response = await fetch(`/wwocode.json`);
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(
      response.status,
      error.cause,
      import.meta.url,
      response.url,
    );
  }
  const wwoCodeList = await response.json();
  const weatherStatus: string = wwoCodeList[code];
  return weatherStatus;
}

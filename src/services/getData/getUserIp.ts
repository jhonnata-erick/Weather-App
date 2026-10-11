import { HttpError } from "../../error/HttpRequest.ts";

export async function getUserIp(): Promise<string> {
  const response = await fetch("https://api.ipify.org/?format=json");
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(
      response.status,
      error.cause,
      import.meta.url,
      response.url,
    );
  }
  const data = await response.json();
  return data.ip;
}

export class HttpError extends Error {
  url;
  reason;
  status;
  instance;
  constructor(
    message: string,
    status?: number,
    instance?: string,
    url?: string,
  ) {
    super(message);
    this.name = "HTTP Error";
    this.url = url || import.meta.url;
    this.status = status || 400;
    this.reason = message;
    this.instance = instance || import.meta.url;
  }
}

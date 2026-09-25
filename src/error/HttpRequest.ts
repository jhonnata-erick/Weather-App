export class HttpError extends Error {
  url;
  reason;
  status;
  instance;
  constructor(status: number, message: string, instance: string, url: string) {
    super(message);
    this.name = "HTTP Error";
    this.url = url;
    this.status = status;
    this.reason = message;
    this.instance = instance;
  }
}

import { ErrorPageLayout } from "../../components/layout/ErrorPage-layout.tsx";
import { HttpError } from "../../error/HttpRequest.ts";
import useWeatherStore from "../../store/weatherStore.ts";

export function Error() {
  const error = useWeatherStore((s) => s.error);
  const [message, status] =
    error instanceof HttpError ? [error.message, error.status] : [error, 400];
  return <ErrorPageLayout status={status} message={message} />;
}

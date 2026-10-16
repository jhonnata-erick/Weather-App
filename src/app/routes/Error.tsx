import { ErrorPageLayout } from "../../components/layout/ErrorPage-layout.tsx";
import { HttpError } from "../../error/HttpRequest.ts";
import useWeatherStore from "../../store/weatherStore.ts";

export function Error() {
  const error = useWeatherStore((s) => s.error);
  const { reason, status } = error || { reason: "Unknown error", status: 0 };
  return <ErrorPageLayout status={status} message={reason} />;
}

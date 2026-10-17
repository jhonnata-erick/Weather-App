import { Link } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

type PermissionLayoutProps = {
  setPermited: Dispatch<SetStateAction<boolean>>;
};

export function PermissionLayout({ setPermited }: PermissionLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-sky-200 via-sky-50 to-white px-5 py-12 text-slate-900">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-lg flex-col">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path
                d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="9"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Where do you want to
            <span className="block text-blue-600">see the weather?</span>
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-slate-600">
            Use your location or search for a city to discover the weather
            conditions.
          </p>
        </header>

        {/* Options */}
        <div className="flex flex-col gap-4">
          {/* Use current location */}
          <button
            type="button"
            onClick={() => setPermited(true)}
            className="group flex w-full items-center gap-4 rounded-3xl border border-blue-500 bg-blue-600 p-5 text-left text-white shadow-lg shadow-blue-600/15 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 active:scale-[0.99] sm:p-6"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 transition group-hover:bg-white/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path
                  d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold">
                Use my location
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-blue-100">
                Allow location access to get the weather for your current
                position.
              </span>
            </span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="m9 18 6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Search location */}
          <Link
            to="/search"
            className="group flex w-full items-center gap-4 rounded-3xl border border-white/80 bg-white/70 p-5 text-left shadow-sm backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 active:scale-[0.99] sm:p-6"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-blue-600 transition group-hover:bg-blue-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <circle
                  cx="10.8"
                  cy="10.8"
                  r="6.8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m16 16 4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold text-slate-900">
                Search a location
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-500">
                Find a city and explore its weather forecast.
              </span>
            </span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
              aria-hidden="true"
            >
              <path
                d="m9 18 6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Lunara · Weather App
        </p>
      </section>
    </main>
  );
}

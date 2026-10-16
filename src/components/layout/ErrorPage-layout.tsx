import { Link } from "react-router-dom";

export function ErrorPageLayout({
  status,
  message,
}: {
  status: number;
  message: string;
}) {
  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-sky-300 via-sky-100 to-white px-5 py-12 text-slate-900">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl"
        />

        <section
          role="alert"
          className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
        >
          {/* Cloud illustration */}
          <img src="/images/storm.svg" alt="" width={128} />
          {/* Error information */}
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Ops! Something went wrong
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Error {status}
          </h1>

          <p className="mt-4 max-w-sm text-lg font-medium leading-relaxed text-slate-700">
            {message}
          </p>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            Check your internet connection, if the error persists, go back and
            try again later.
          </p>

          {/* Actions */}
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <Link to={"/"}>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M20 7V3m0 4h-4M4.9 9a7.5 7.5 0 0 1 12.7-2L20 7M4 17v4m0-4h4m11.1-2a7.5 7.5 0 0 1-12.7 2L4 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Try Again
              </button>
            </Link>
            <Link to={"/"}>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/80 bg-white/60 px-6 py-3 font-semibold text-slate-700 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M19 12H5m7 7-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Go Back
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

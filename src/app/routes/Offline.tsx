import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useWeatherStore from "../../store/weatherStore.ts";

export function Offline() {
  const navigate = useNavigate();

  const status = useWeatherStore((s) => s.status);
  const [message, setMessage] = useState(useWeatherStore((s) => s.error));

  function handleRetry() {
    if (!navigator.onLine) {
      setMessage("Verifique sua conexão e tente novamente.");
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-sky-200 via-sky-50 to-white px-5 py-12 text-slate-900">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl"
      />

      <section
        role="status"
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
      >
        {/* Offline illustration */}
        <svg
          viewBox="0 0 200 160"
          className="mb-8 h-40 w-48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="offline-cloud"
              x1="100"
              y1="25"
              x2="100"
              y2="132"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#CDE8FA" />
            </linearGradient>
          </defs>

          <path
            d="M39 119C20 119 10 105 10 89C10 72 23 59 40 59C46 37 64 25 85 25C110 25 128 43 131 66C136 64 142 63 148 65C166 68 180 83 180 101C180 119 166 132 146 132H40"
            fill="url(#offline-cloud)"
          />

          <path
            d="M65 76C84 58 111 58 130 76"
            stroke="#438FE5"
            strokeWidth="7"
            strokeLinecap="round"
            opacity=".7"
          />

          <path
            d="M78 89C90 78 105 78 117 89"
            stroke="#438FE5"
            strokeWidth="7"
            strokeLinecap="round"
            opacity=".7"
          />

          <circle cx="97.5" cy="101" r="4.5" fill="#438FE5" />

          <circle
            cx="145"
            cy="119"
            r="24"
            fill="#F97360"
            stroke="#FFFFFF"
            strokeWidth="5"
          />

          <path
            d="M137 111L153 127M153 111L137 127"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Message */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          {navigator.onLine ? "Conexão disponível" : "Sem conexão"}
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Você está offline
        </h1>

        <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-600">
          Parece que perdemos contato com o céu. Verifique sua conexão com a
          internet para consultar a previsão do tempo.
        </p>

        {message && (
          <p
            aria-live="polite"
            className="mt-3 text-sm font-medium text-sky-700"
          >
            {message}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
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
            Tentar novamente
          </button>

          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/80 bg-white/60 px-6 py-3 font-semibold text-slate-700 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
          >
            Voltar para o início
          </Link>
        </div>

        <p className="mt-10 text-sm font-medium text-slate-400">
          Lunara · Weather App
        </p>
      </section>
    </main>
  );
}

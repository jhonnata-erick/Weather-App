import { useNavigate } from "react-router-dom";

export function StartLayout() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-sky-300 via-sky-100 to-white px-6 py-12 text-slate-900">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
        {/* Weather illustration */}
        <div className="mb-8 flex h-48 w-48 items-center justify-center">
          <svg
            viewBox="0 0 200 180"
            className="h-full w-full drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="start-cloud"
                x1="100"
                y1="65"
                x2="100"
                y2="150"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#D3EBFC" />
              </linearGradient>

              <linearGradient
                id="start-sun"
                x1="125"
                y1="20"
                x2="155"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFE98A" />
                <stop offset="1" stopColor="#FFC83D" />
              </linearGradient>
            </defs>

            {/* Sun */}
            <circle cx="139" cy="57" r="39" fill="url(#start-sun)" />

            {/* Sun rays */}
            <g stroke="#FFD65C" strokeWidth="4" strokeLinecap="round">
              <path d="M139 7V15" />
              <path d="M189 57H181" />
              <path d="M174 22L168 28" />
              <path d="M104 22L110 28" />
            </g>

            {/* Cloud */}
            <path
              d="M28 123C15 123 7 113 7 100C7 87 17 77 31 77C36 56 54 44 75 44C99 44 117 61 120 83C125 81 130 80 135 82C152 84 164 98 164 114C164 133 150 145 132 145H29"
              fill="url(#start-cloud)"
            />

            {/* Cloud subtle lower shade */}
            <path
              d="M20 119C37 125 52 128 68 122C85 116 100 116 115 127C126 135 141 135 153 128C147 139 138 145 126 145H29C24 145 21 133 20 119Z"
              fill="#B8DDF7"
              opacity=".65"
            />

            {/* Cloud highlight */}
            <path
              d="M39 75C47 59 61 51 77 51"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".85"
            />
          </svg>
        </div>

        {/* Branding */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
          Welcome to
        </p>

        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Lunara
          <span className="text-blue-600">.</span>
        </h1>

        <p className="mt-5 max-w-sm text-lg leading-relaxed text-slate-600 sm:text-xl">
          See the weather forecast for the next hours or the next days.
        </p>

        {/* Get started */}
        <button
          type="button"
          onClick={() => navigate("/permission")}
          className="group mt-9 inline-flex min-h-14 w-full max-w-xs items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 active:scale-[0.98]"
        >
          Get Started
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12H19M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="mt-8 text-sm font-medium text-slate-400">
          Your weather, your way.
        </p>
      </section>
    </main>
  );
}

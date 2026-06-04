export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[120px] pb-[80px] bg-white relative">
      <div
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-8"
        style={{ opacity: 0, animation: "fade-up 0.7s 0.1s forwards" }}
      >
        <div
          className="w-1.5 h-1.5 bg-[#00C896] rounded-full"
          style={{ animation: "blink 2s infinite" }}
        />
        Bêta privée — Bientôt disponible
      </div>

      <h1
        className="font-semibold leading-none max-w-[860px]"
        style={{
          fontSize: "clamp(44px, 6.5vw, 88px)",
          letterSpacing: "-3px",
          opacity: 0,
          animation: "fade-up 0.8s 0.25s forwards",
        }}
      >
        La location,<br />
        <em className="not-italic text-[#CCCCCC]">sans</em> le risque.
      </h1>

      <p
        className="text-[17px] text-[#6B6B6B] max-w-[420px] mt-6 font-light leading-[1.7]"
        style={{ opacity: 0, animation: "fade-up 0.8s 0.4s forwards" }}
      >
        Une plateforme qui protège chaque partie<br />
        à chaque étape du contrat de location.
      </p>

      <div
        className="flex gap-3 mt-9"
        style={{ opacity: 0, animation: "fade-up 0.8s 0.55s forwards" }}
      >
        <a
          href="#waitlist"
          className="bg-[#111111] text-white px-6 py-[13px] rounded-[7px] text-[14px] font-medium no-underline hover:opacity-75 transition-opacity duration-200"
        >
          Rejoindre la liste d&apos;attente
        </a>
        <a
          href="#solution"
          className="bg-transparent text-[#6B6B6B] border border-[#E5E5E3] px-6 py-[13px] rounded-[7px] text-[14px] no-underline hover:text-[#111111] hover:border-[#AAAAAA] transition-all duration-200"
        >
          En savoir plus
        </a>
      </div>
    </section>
  );
}

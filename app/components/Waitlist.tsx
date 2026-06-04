"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit() {
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    setSubmitted(true);
    console.log("Waitlist:", email);
  }

  return (
    <section
      id="waitlist"
      className="bg-[#F7F7F5] border-t border-b border-[#E5E5E3] py-[100px] px-5 md:px-12 text-center reveal"
    >
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-5">
        Accès anticipé
      </div>
      <h2
        className="font-semibold mb-3.5"
        style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1.5px" }}
      >
        Rejoignez la liste d&apos;attente.
      </h2>
      <p className="text-[#6B6B6B] text-[16px] font-light mb-9">
        Soyez parmi les premiers à tester Baillr lors de la bêta privée.
      </p>

      {!submitted ? (
        <div className="flex flex-col md:flex-row gap-2.5 max-w-[400px] mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="votre@email.fr"
            className="flex-1 bg-white rounded-[7px] px-4 py-3 text-[#111111] text-[14px] outline-none transition-colors duration-200 placeholder:text-[#BBBBBB] focus:border-[#AAAAAA]"
            style={{
              border: `1px solid ${error ? "#FFAAAA" : "#E5E5E3"}`,
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={handleSubmit}
            className="bg-[#111111] text-white border-none px-5 py-3 rounded-[7px] text-[13px] font-medium whitespace-nowrap hover:opacity-75 transition-opacity duration-200 cursor-pointer"
            style={{ fontFamily: "inherit" }}
          >
            Rejoindre →
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 justify-center text-[14px] text-[#00C896]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#00C896" strokeWidth="1.5" />
            <path
              d="M5 8l2.5 2.5L11 5"
              stroke="#00C896"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Vous êtes sur la liste. À bientôt.
        </div>
      )}

      <p className="font-mono text-[12px] text-[#BBBBBB] mt-3.5">
        Aucun spam. Désabonnement en un clic.
      </p>
    </section>
  );
}

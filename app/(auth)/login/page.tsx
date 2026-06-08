"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <Link href="/" className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] no-underline">
            Baill<span className="text-[#CCCCCC]">r</span>.
          </Link>
          <p className="text-[14px] text-[#6B6B6B] mt-2">Connexion à votre espace</p>
        </div>

        <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#111111]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-4 py-2.5 text-[14px] text-[#111111] outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#BBBBBB]"
                style={{ fontFamily: "inherit" }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#111111]">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-4 py-2.5 text-[14px] text-[#111111] outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#BBBBBB]"
                style={{ fontFamily: "inherit" }}
              />
            </div>

            {error && (
              <p className="text-[13px] text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#111111] text-white py-2.5 rounded-[7px] text-[14px] font-medium hover:opacity-75 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
              style={{ fontFamily: "inherit" }}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-[#6B6B6B] mt-4">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-[#111111] font-medium hover:opacity-75">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

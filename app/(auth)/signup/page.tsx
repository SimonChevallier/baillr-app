"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"bailleur" | "locataire">("bailleur");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, role },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4">
        <div className="text-center max-w-[400px]">
          <div className="text-[32px] mb-4">✓</div>
          <h2 className="text-[20px] font-semibold mb-2">Vérifiez votre email</h2>
          <p className="text-[14px] text-[#6B6B6B]">
            Un lien de confirmation a été envoyé à <strong>{email}</strong>. Cliquez dessus pour activer votre compte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <Link href="/" className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] no-underline">
            Baill<span className="text-[#CCCCCC]">r</span>.
          </Link>
          <p className="text-[14px] text-[#6B6B6B] mt-2">Créer votre compte</p>
        </div>

        <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Rôle */}
            <div className="grid grid-cols-2 gap-2">
              {(["bailleur", "locataire"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2.5 rounded-[7px] text-[13px] font-medium border transition-all cursor-pointer capitalize ${
                    role === r
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#6B6B6B] border-[#E5E5E3] hover:border-[#AAAAAA]"
                  }`}
                  style={{ fontFamily: "inherit" }}
                >
                  {r === "bailleur" ? "Je suis bailleur" : "Je suis locataire"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#111111]">Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean"
                  required
                  className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-3 py-2.5 text-[14px] outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#BBBBBB]"
                  style={{ fontFamily: "inherit" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#111111]">Nom</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Dupont"
                  required
                  className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-3 py-2.5 text-[14px] outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#BBBBBB]"
                  style={{ fontFamily: "inherit" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#111111]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-4 py-2.5 text-[14px] outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#BBBBBB]"
                style={{ fontFamily: "inherit" }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#111111]">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8 caractères minimum"
                minLength={8}
                required
                className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-4 py-2.5 text-[14px] outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#BBBBBB]"
                style={{ fontFamily: "inherit" }}
              />
            </div>

            {error && <p className="text-[13px] text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#111111] text-white py-2.5 rounded-[7px] text-[14px] font-medium hover:opacity-75 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
              style={{ fontFamily: "inherit" }}
            >
              {loading ? "Création..." : "Créer mon compte"}
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-[#6B6B6B] mt-4">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#111111] font-medium hover:opacity-75">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

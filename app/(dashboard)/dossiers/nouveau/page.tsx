"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NouveauDossierPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    adresse: "",
    ville: "",
    loyer: "",
    charges: "",
    date_debut: "",
    locataire_email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data, error } = await supabase.from("dossiers").insert({
      bailleur_id: user.id,
      adresse: form.adresse,
      ville: form.ville,
      loyer: parseFloat(form.loyer),
      charges: parseFloat(form.charges || "0"),
      date_debut: form.date_debut || null,
      locataire_email: form.locataire_email || null,
    }).select().single();

    if (error) {
      setError("Une erreur est survenue.");
      setLoading(false);
      return;
    }

    router.push(`/dossiers/${data.id}`);
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <header className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#E5E5E3] bg-white">
        <Link href="/dashboard" className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] no-underline">
          Baill<span className="text-[#CCCCCC]">r</span>.
        </Link>
      </header>

      <main className="max-w-[600px] mx-auto px-5 md:px-0 py-12">
        <div className="mb-8">
          <Link href="/dossiers" className="text-[13px] text-[#6B6B6B] hover:text-[#111111] no-underline transition-colors">
            ← Mes dossiers
          </Link>
          <h1 className="text-[24px] font-semibold tracking-[-0.5px] mt-4">Nouveau dossier</h1>
        </div>

        <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-4">
                Le bien
              </div>
              <div className="flex flex-col gap-4">
                <Field label="Adresse" name="adresse" value={form.adresse} onChange={handleChange} placeholder="12 rue de la Paix" required />
                <Field label="Ville" name="ville" value={form.ville} onChange={handleChange} placeholder="Paris" required />
              </div>
            </div>

            <div className="h-px bg-[#E5E5E3]" />

            <div>
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-4">
                Conditions financières
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Loyer (€/mois)" name="loyer" type="number" value={form.loyer} onChange={handleChange} placeholder="900" required />
                <Field label="Charges (€/mois)" name="charges" type="number" value={form.charges} onChange={handleChange} placeholder="50" />
              </div>
            </div>

            <div className="h-px bg-[#E5E5E3]" />

            <div>
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-4">
                Locataire
              </div>
              <div className="flex flex-col gap-4">
                <Field label="Date d'entrée" name="date_debut" type="date" value={form.date_debut} onChange={handleChange} />
                <Field label="Email du locataire" name="locataire_email" type="email" value={form.locataire_email} onChange={handleChange} placeholder="locataire@email.fr" />
              </div>
            </div>

            {error && <p className="text-[13px] text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#111111] text-white py-3 rounded-[7px] text-[14px] font-medium hover:opacity-75 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
              style={{ fontFamily: "inherit" }}
            >
              {loading ? "Création..." : "Créer le dossier"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text", required }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#111111]">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-4 py-2.5 text-[14px] text-[#111111] outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#BBBBBB]"
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
}

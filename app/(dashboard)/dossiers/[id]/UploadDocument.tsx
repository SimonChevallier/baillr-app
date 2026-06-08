"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Document } from "@/app/lib/types";

const TYPES: { value: Document["type"]; label: string }[] = [
  { value: "contrat", label: "Contrat de bail" },
  { value: "etat_des_lieux_entree", label: "État des lieux — entrée" },
  { value: "etat_des_lieux_sortie", label: "État des lieux — sortie" },
  { value: "quittance", label: "Quittance de loyer" },
  { value: "autre", label: "Autre document" },
];

export default function UploadDocument({ dossierId }: { dossierId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<Document["type"]>("contrat");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const path = `${dossierId}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(path, file);

    if (uploadError) {
      setError("Erreur lors de l'upload.");
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase.from("documents").insert({
      dossier_id: dossierId,
      uploaded_by: user.id,
      nom: file.name,
      type,
      storage_path: path,
    });

    if (dbError) {
      setError("Erreur lors de l'enregistrement.");
      setLoading(false);
      return;
    }

    setFile(null);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-6">
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-5">
        Ajouter un document
      </div>

      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#111111]">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Document["type"])}
            className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-[7px] px-4 py-2.5 text-[14px] text-[#111111] outline-none focus:border-[#AAAAAA] transition-colors"
            style={{ fontFamily: "inherit" }}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#111111]">Fichier (PDF)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="text-[13px] text-[#6B6B6B] file:mr-3 file:py-1.5 file:px-3 file:rounded-[5px] file:border-0 file:text-[12px] file:font-medium file:bg-[#111111] file:text-white file:cursor-pointer"
          />
        </div>

        {error && <p className="text-[13px] text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!file || loading}
          className="bg-[#111111] text-white py-2.5 rounded-[7px] text-[13px] font-medium hover:opacity-75 transition-opacity disabled:opacity-50 cursor-pointer"
          style={{ fontFamily: "inherit" }}
        >
          {loading ? "Upload en cours..." : "Ajouter le document"}
        </button>
      </form>
    </div>
  );
}

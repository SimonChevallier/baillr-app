import { createClient } from "@/app/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Dossier, Document } from "@/app/lib/types";
import UploadDocument from "./UploadDocument";

const TYPE_LABEL: Record<Document["type"], string> = {
  contrat: "Contrat de bail",
  etat_des_lieux_entree: "État des lieux — entrée",
  etat_des_lieux_sortie: "État des lieux — sortie",
  quittance: "Quittance de loyer",
  autre: "Autre document",
};

export default async function DossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: dossier } = await supabase
    .from("dossiers")
    .select("*")
    .eq("id", id)
    .single();

  if (!dossier) notFound();

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("dossier_id", id)
    .order("created_at", { ascending: false });

  const isBailleur = dossier.bailleur_id === user.id;

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <header className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#E5E5E3] bg-white">
        <Link href="/dashboard" className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] no-underline">
          Baill<span className="text-[#CCCCCC]">r</span>.
        </Link>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-[13px] text-[#6B6B6B] hover:text-[#111111] cursor-pointer bg-transparent border-none" style={{ fontFamily: "inherit" }}>
            Déconnexion
          </button>
        </form>
      </header>

      <main className="max-w-[1100px] mx-auto px-5 md:px-12 py-12">
        <div className="mb-8">
          <Link href="/dossiers" className="text-[13px] text-[#6B6B6B] hover:text-[#111111] no-underline transition-colors">
            ← Mes dossiers
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Infos du dossier */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-6">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-4">
                Le bien
              </div>
              <p className="text-[16px] font-semibold">{dossier.adresse}</p>
              <p className="text-[13px] text-[#6B6B6B]">{dossier.ville}</p>

              <div className="mt-5 flex flex-col gap-2">
                <InfoRow label="Loyer" value={`${dossier.loyer} €/mois`} />
                {dossier.charges > 0 && <InfoRow label="Charges" value={`${dossier.charges} €/mois`} />}
                {dossier.date_debut && <InfoRow label="Entrée" value={new Date(dossier.date_debut).toLocaleDateString("fr-FR")} />}
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-6">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-4">
                Locataire
              </div>
              {dossier.locataire_email ? (
                <p className="text-[13px] text-[#111111]">{dossier.locataire_email}</p>
              ) : (
                <p className="text-[13px] text-[#BBBBBB]">Aucun locataire invité</p>
              )}
              <div className={`mt-3 inline-block font-mono text-[11px] px-2 py-1 rounded-[4px] ${
                dossier.statut === "actif" ? "bg-[#00C896]/10 text-[#00C896]" :
                dossier.statut === "en_attente" ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                "bg-[#F7F7F5] text-[#6B6B6B]"
              }`}>
                {dossier.statut === "en_attente" ? "En attente" : dossier.statut === "actif" ? "Actif" : "Terminé"}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B]">
                  Documents
                </div>
              </div>

              {!documents || documents.length === 0 ? (
                <p className="text-[13px] text-[#BBBBBB]">Aucun document pour l&apos;instant.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {documents.map((doc: Document) => (
                    <DocumentRow key={doc.id} doc={doc} />
                  ))}
                </div>
              )}
            </div>

            {isBailleur && (
              <UploadDocument dossierId={id} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[12px] text-[#6B6B6B]">{label}</span>
      <span className="text-[12px] font-medium text-[#111111]">{value}</span>
    </div>
  );
}

function DocumentRow({ doc }: { doc: Document }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F7F7F5] last:border-0">
      <div>
        <p className="text-[13px] font-medium text-[#111111]">{doc.nom}</p>
        <p className="text-[11px] text-[#6B6B6B] font-mono mt-0.5">{TYPE_LABEL[doc.type]}</p>
      </div>
      <span className="text-[11px] text-[#BBBBBB]">
        {new Date(doc.created_at).toLocaleDateString("fr-FR")}
      </span>
    </div>
  );
}

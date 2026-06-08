import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Dossier } from "@/app/lib/types";

const STATUT_LABEL: Record<Dossier["statut"], string> = {
  en_attente: "En attente",
  actif: "Actif",
  termine: "Terminé",
};

const STATUT_COLOR: Record<Dossier["statut"], string> = {
  en_attente: "text-[#F59E0B]",
  actif: "text-[#00C896]",
  termine: "text-[#6B6B6B]",
};

export default async function DossiersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = user.user_metadata?.role ?? "bailleur";

  const { data: dossiers } = await supabase
    .from("dossiers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <header
        className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#E5E5E3] bg-white"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <Link href="/dashboard" className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] no-underline">
          Baill<span className="text-[#CCCCCC]">r</span>.
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-[13px] text-[#6B6B6B] hover:text-[#111111] transition-colors no-underline">
            Dashboard
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-[13px] text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer bg-transparent border-none" style={{ fontFamily: "inherit" }}>
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5 md:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-2">
              Dossiers de location
            </div>
            <h1 className="text-[24px] font-semibold tracking-[-0.5px]">Mes dossiers</h1>
          </div>
          {role === "bailleur" && (
            <Link
              href="/dossiers/nouveau"
              className="bg-[#111111] text-white px-5 py-2.5 rounded-[7px] text-[13px] font-medium no-underline hover:opacity-75 transition-opacity"
            >
              + Nouveau dossier
            </Link>
          )}
        </div>

        {!dossiers || dossiers.length === 0 ? (
          <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-12 text-center">
            <p className="text-[15px] font-medium mb-2">Aucun dossier pour l&apos;instant</p>
            <p className="text-[13px] text-[#6B6B6B] mb-6">
              {role === "bailleur"
                ? "Créez votre premier dossier de location."
                : "Vous n'avez pas encore été invité sur un dossier."}
            </p>
            {role === "bailleur" && (
              <Link
                href="/dossiers/nouveau"
                className="bg-[#111111] text-white px-5 py-2.5 rounded-[7px] text-[13px] font-medium no-underline hover:opacity-75 transition-opacity"
              >
                Créer un dossier
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {dossiers.map((d: Dossier) => (
              <Link
                key={d.id}
                href={`/dossiers/${d.id}`}
                className="bg-white border border-[#E5E5E3] rounded-[12px] px-6 py-5 flex items-center justify-between hover:border-[#AAAAAA] transition-colors no-underline"
              >
                <div>
                  <p className="text-[15px] font-semibold text-[#111111]">{d.adresse}</p>
                  <p className="text-[13px] text-[#6B6B6B] mt-0.5">{d.ville} · {d.loyer} €/mois</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-[12px] font-mono ${STATUT_COLOR[d.statut]}`}>
                    {STATUT_LABEL[d.statut]}
                  </span>
                  <span className="text-[#CCCCCC]">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

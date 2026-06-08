import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const role = user.user_metadata?.role ?? "bailleur";
  const firstName = user.user_metadata?.first_name ?? "";

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <header
        className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#E5E5E3] bg-white/92"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <span className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111]">
          Baill<span className="text-[#CCCCCC]">r</span>.
        </span>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-[#6B6B6B]">{user.email}</span>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="text-[13px] text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer bg-transparent border-none"
              style={{ fontFamily: "inherit" }}
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1100px] mx-auto px-5 md:px-12 py-12">
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-3">
            {role === "bailleur" ? "Espace bailleur" : "Espace locataire"}
          </div>
          <h1 className="text-[28px] font-semibold tracking-[-1px]">
            Bonjour{firstName ? `, ${firstName}` : ""} 👋
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-6">
            <div className="font-mono text-[11px] text-[#CCCCCC] mb-3">01 —</div>
            <h3 className="text-[15px] font-semibold mb-1.5">Dossiers de location</h3>
            <p className="text-[13px] text-[#6B6B6B]">Gérez vos contrats et documents.</p>
            <div className="mt-4 text-[13px] text-[#BBBBBB] font-mono">Bientôt disponible</div>
          </div>

          <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-6">
            <div className="font-mono text-[11px] text-[#CCCCCC] mb-3">02 —</div>
            <h3 className="text-[15px] font-semibold mb-1.5">État des lieux</h3>
            <p className="text-[13px] text-[#6B6B6B]">Réalisez et archivez vos états des lieux.</p>
            <div className="mt-4 text-[13px] text-[#BBBBBB] font-mono">Bientôt disponible</div>
          </div>

          <div className="bg-white border border-[#E5E5E3] rounded-[12px] p-6">
            <div className="font-mono text-[11px] text-[#CCCCCC] mb-3">03 —</div>
            <h3 className="text-[15px] font-semibold mb-1.5">Paiements</h3>
            <p className="text-[13px] text-[#6B6B6B]">Suivez loyers, caution et primes.</p>
            <div className="mt-4 text-[13px] text-[#BBBBBB] font-mono">Bientôt disponible</div>
          </div>
        </div>
      </main>
    </div>
  );
}

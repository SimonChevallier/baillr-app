const features = [
  {
    num: "01 —",
    title: "Contrat & paiements",
    body: "Signature électronique, paiements automatisés, historique complet. Tout est tracé et opposable.",
  },
  {
    num: "02 —",
    title: "État des lieux digitalisé",
    body: "Réalisé directement sur la plateforme avec photos horodatées. Traçabilité totale de l'état du bien.",
  },
  {
    num: "03 —",
    title: "Protection des deux parties",
    body: "En cas de litige, Baillr active automatiquement la couverture selon la nature du problème.",
  },
  {
    num: "04 —",
    title: "Intelligence artificielle",
    body: "En cas de contestation, notre IA analyse les états des lieux pour établir une vérité objective.",
  },
  {
    num: "05 —",
    title: "Système de notation",
    body: "Bailleurs et locataires sont évalués mutuellement. La transparence réduit les comportements abusifs.",
  },
  {
    num: "06 —",
    title: "Cadre assurantiel solide",
    body: "Baillr opère en partenariat avec un réassureur agréé. Le risque est porté par des professionnels.",
  },
];

export default function Solution() {
  return (
    <div className="bg-[#1A1A1A] text-white py-[80px] px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto reveal">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#666] mb-5">
          Notre réponse
        </div>
        <h2
          className="font-semibold leading-[1.1] text-white mb-4"
          style={{ fontSize: "clamp(28px, 3.5vw, 46px)", letterSpacing: "-1.5px" }}
        >
          Une plateforme.<br />Deux protections.
        </h2>
        <p className="text-[16px] text-[#888] max-w-[480px] leading-[1.7] font-light">
          Baillr centralise l&apos;intégralité de la relation locative et couvre les deux parties contre leurs risques respectifs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[60px]">
          {features.map((f) => (
            <div
              key={f.num}
              className="bg-[#222] border border-[#2A2A2A] rounded-[12px] p-8 hover:border-[#444] transition-colors duration-300"
            >
              <div className="font-mono text-[11px] text-[#555] mb-4">{f.num}</div>
              <h3 className="text-[16px] font-medium text-[#F0F0F0] mb-2.5 tracking-[-0.2px]">
                {f.title}
              </h3>
              <p className="text-[13px] text-[#666] leading-[1.65]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

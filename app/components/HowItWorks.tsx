const steps = [
  {
    num: "01 —",
    title: "Création du contrat",
    body: "Les deux parties signent électroniquement sur la plateforme.",
  },
  {
    num: "02 —",
    title: "État des lieux",
    body: "Réalisé en photos géolocalisées directement depuis l'application.",
  },
  {
    num: "03 —",
    title: "Paiements & prime",
    body: "Les loyers transitent par Baillr. Chaque partie est couverte automatiquement.",
  },
  {
    num: "04 —",
    title: "Protection activée",
    body: "En cas de litige, la couverture se déclenche selon les conditions du contrat.",
  },
];

export default function HowItWorks() {
  return (
    <div id="comment">
      <div className="py-[100px] px-5 md:px-12 max-w-[1100px] mx-auto reveal">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-5">
          Fonctionnement
        </div>
        <h2
          className="font-semibold leading-[1.1] mb-4"
          style={{ fontSize: "clamp(28px, 3.5vw, 46px)", letterSpacing: "-1.5px" }}
        >
          Simple par design.
        </h2>
        <p className="text-[16px] text-[#6B6B6B] max-w-[480px] leading-[1.7] font-light">
          Quatre étapes pour sécuriser une location de bout en bout.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-[60px] rounded-[12px] overflow-hidden border border-[#E5E5E3]">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`py-9 px-7 bg-white border-b border-[#E5E5E3] md:border-b-0${i < steps.length - 1 ? " md:border-r md:border-[#E5E5E3]" : ""}`}
            >
              <div className="font-mono text-[11px] text-[#00C896] mb-4">{s.num}</div>
              <h4 className="text-[15px] font-semibold mb-2 tracking-[-0.2px]">{s.title}</h4>
              <p className="text-[13px] text-[#6B6B6B] leading-[1.6]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

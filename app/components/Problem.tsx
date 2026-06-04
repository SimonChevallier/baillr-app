const problems = [
  {
    num: "01",
    title: "Le bailleur",
    body: "Impayés, procédures longues, absence de recours rapide. Le bailleur est exposé sans filet de sécurité efficace ni plateforme centralisée pour gérer sa location sereinement.",
  },
  {
    num: "02",
    title: "Le locataire",
    body: "Caution retenue sans justification, état des lieux approximatif, impossible à contester. Le locataire n'a aucune protection réelle face à un bailleur de mauvaise foi.",
  },
];

export default function Problem() {
  return (
    <div id="solution">
      <div className="py-[100px] px-5 md:px-12 max-w-[1100px] mx-auto reveal">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B] mb-5">
          Le constat
        </div>
        <h2
          className="font-semibold leading-[1.1] mb-4"
          style={{ fontSize: "clamp(28px, 3.5vw, 46px)", letterSpacing: "-1.5px" }}
        >
          La location reste un terrain<br />miné pour tout le monde.
        </h2>
        <p className="text-[16px] text-[#6B6B6B] max-w-[480px] leading-[1.7] font-light">
          Deux parties. Deux risques bien réels. Aucune solution satisfaisante aujourd&apos;hui.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 mt-[60px] rounded-[12px] overflow-hidden border border-[#E5E5E3]"
          style={{ gap: "1px", background: "#E5E5E3" }}
        >
          {problems.map((p) => (
            <div key={p.num} className="bg-white p-10">
              <div className="font-mono text-[11px] text-[#CCCCCC] mb-4">{p.num}</div>
              <h3 className="text-[16px] font-semibold mb-3 tracking-[-0.2px]">{p.title}</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-[1.7]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

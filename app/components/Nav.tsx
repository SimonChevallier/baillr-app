export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-16 px-5 md:px-12 border-b border-[#E5E5E3]"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}
    >
      <a
        href="#"
        className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] no-underline"
      >
        Baill<span className="text-[#CCCCCC]">r</span>.
      </a>
      <div className="hidden md:flex gap-8 items-center">
        <a
          href="#solution"
          className="text-[#6B6B6B] no-underline text-[14px] hover:text-[#111111] transition-colors duration-200"
        >
          Solution
        </a>
        <a
          href="#comment"
          className="text-[#6B6B6B] no-underline text-[14px] hover:text-[#111111] transition-colors duration-200"
        >
          Comment ça marche
        </a>
        <a
          href="#waitlist"
          className="bg-[#111111] text-white px-[18px] py-2 rounded-[6px] text-[13px] font-medium no-underline hover:opacity-80 transition-opacity duration-200"
        >
          Rejoindre la liste
        </a>
      </div>
    </nav>
  );
}

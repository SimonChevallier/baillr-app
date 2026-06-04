export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 py-7 px-5 md:py-9 md:px-12 border-t border-[#E5E5E3] text-center md:text-left">
      <div className="text-[17px] font-semibold tracking-[-0.5px]">
        Baill<span className="text-[#CCCCCC]">r</span>.
      </div>
      <div className="font-mono text-[12px] text-[#CCCCCC]">© 2026 Baillr</div>
      <div className="flex gap-5">
        <a
          href="mailto:simon@baillr.org"
          className="text-[13px] text-[#6B6B6B] no-underline hover:text-[#111111] transition-colors duration-200"
        >
          Contact
        </a>
        <a
          href="#"
          className="text-[13px] text-[#6B6B6B] no-underline hover:text-[#111111] transition-colors duration-200"
        >
          Mentions légales
        </a>
      </div>
    </footer>
  );
}

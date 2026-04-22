import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#about", label: "O meni" },
    { href: "#gallery", label: "Galerija" },
    { href: "#contact", label: "Kontakt" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-60 transition-all duration-500
      ${scrolled ? "bg-[#0505086]/92 shadow-lg backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="flex items-center justify-between px-[5%] md:px-[10%] py-4">
          <a
            href="#top"
            className="text-white font-naslov text-xl md:text-2xl tracking-wide"
          >
            Novica Jovičić
          </a>

          <nav className="hidden md:flex gap-10 text-base font-telo tracking-wider">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-300 hover:text-[#cbf2ff] transition-colors duration-300
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                after:bg-[#cbf2ff]/60 after:transition-all after:duration-300
                hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-60"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center
              ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300
              ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center
              ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#010101] flex flex-col items-center justify-center
          transition-all duration-500 z-50
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`font-telo text-xl tracking-wider text-white mb-8 mt-8 transition-all duration-500
      hover:text-[#cbf2ff] relative pb-2
      after:absolute after:left-0 after:bottom-0 after:h-0.5
      after:bg-[#cbf2ff]/40 after:transition-all after:duration-1333
      ${menuOpen ? "opacity-100 translate-y-0 after:w-full" : "opacity-0 translate-y-6 after:w-0"}`}
            style={{
              transitionDelay: menuOpen ? `${i * 100 + 150}ms` : "0ms",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

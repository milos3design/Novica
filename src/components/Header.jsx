import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${
        scrolled
          ? "bg-[#050505]/90 shadow-lg"
          : "bg-transparent backdrop-blur-xl"
      }`}
    >
      <div className="flex items-center justify-between px-[5%] md:px-[10%] py-4">
        {/* LOGO */}
        <a
          href="#top"
          className="text-white font-naslov text-xl md:text-2xl tracking-wide"
        >
          Novica Jovičić
        </a>

        {/* NAV */}
        <nav className="flex gap-6 md:gap-10 text-sm md:text-base font-telo tracking-wider">
          {[
            { href: "#about", label: "O meni" },
            { href: "#gallery", label: "Galerija" },
            { href: "#contact", label: "Kontakt" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-gray-300 hover:text-[#cbf2ff] transition-colors duration-300
      after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 
      after:bg-[#cbf2ff] after:transition-all after:duration-300
      hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

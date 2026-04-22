import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const links = [
    {
      label: "Email",
      href: "mailto:novica@example.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            ry="5"
            strokeWidth={1.5}
          />
          <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://facebook.com/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full py-32 px-[5%] md:px-[10%] bg-[#010101] scroll-mt-20"
    >
      <div
        className={`transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="inline-flex flex-col items-start mb-12">
          <h2 className="font-naslov text-4xl text-white mb-2">Kontakt</h2>
          <div className="w-16 h-0.5 bg-[#cbf2ff]/60" />
        </div>

        <div className="flex flex-col gap-6">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`flex items-center gap-4 text-gray-300 hover:text-[#cbf2ff]
                transition-all duration-500 group w-fit
                ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <span className="text-[#cbf2ff]/60 group-hover:text-[#cbf2ff] transition-colors duration-300">
                {link.icon}
              </span>
              <span
                className="font-telo tracking-wider text-lg relative
                after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0
                after:bg-[#cbf2ff]/60 after:transition-all after:duration-300
                group-hover:after:w-full"
              >
                {link.href.startsWith("mailto")
                  ? link.href.replace("mailto:", "")
                  : link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

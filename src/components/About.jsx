import { useEffect, useRef, useState } from "react";

export default function About() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 👇 ključ: setujemo true/false svaki put
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="w-full min-h-[99vh] py-32 px-[5%] md:px-[10%] bg-[#010101]"
    >
      <div
        className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        {/* TEXT */}
        <div>
          <div className="inline-flex flex-col items-start mb-4">
            <h2 className="font-naslov text-4xl text-white mb-2">O meni</h2>

            <div className="w-16 h-0.5 bg-[#cbf2ff]/60" />
          </div>

          <p className="text-gray-300 leading-relaxed">
            Svaki predmet koji nastane u mojoj radionici počinje kao ideja
            inspirisana prirodom i oblikom drveta. Ne pravim serijske proizvode
            — svaki komad je jedinstven, oblikovan ručno i sa pažnjom prema
            detalju.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Fokus je na jednostavnosti forme, funkcionalnosti i toplini
            materijala. Verujem da predmeti koje koristimo svakodnevno treba da
            imaju karakter i priču.
          </p>
        </div>

        {/* IMAGE / PLACEHOLDER */}
        <div className="w-full h-100 md:h-125 rounded-2xl overflow-hidden bg-linear-to-br from-[#111] to-[#222] flex items-center justify-center">
          {/* kasnije ubaci sliku */}
          <span className="text-gray-500 font-telo">fotografija radionice</span>
        </div>
      </div>
    </section>
  );
}

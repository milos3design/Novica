import { useState, useEffect, useRef } from "react";

const base = import.meta.env.BASE_URL;
const images = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  src: `${base}gallery/${i + 1}.jpg`,
}));

function useInView(threshold = 0.15) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [titleRef, titleVisible] = useInView(0.3);
  const [gridRef, gridVisible] = useInView(0.05);

  return (
    <section
      id="gallery"
      className="w-full  pt-20 pb-10 px-[10%] bg-[#010101] scroll-mt-20"
    >
      {/* TITLE */}
      <div
        ref={titleRef}
        className={`text-center mb-16 transition-all duration-700
          ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="font-naslov text-3xl md:text-5xl text-white">
          Galerija radova
        </h2>
        <div className="w-16 h-0.5 bg-[#cbf2ff]/60 mx-auto mt-2" />
      </div>

      {/* GRID */}
      <div ref={gridRef} className="grid grid-cols-12 gap-3 md:gap-6">
        {images.map((img, i) => {
          const desktopSpan = (() => {
            if (i % 9 === 0) return "md:col-span-7 md:h-[560px]";
            if (i % 5 === 0) return "md:col-span-5 md:h-[360px]";
            if (i % 3 === 0) return "md:col-span-4 md:h-[320px]";
            return "md:col-span-3 md:h-[280px]";
          })();

          const mobileHeight = (() => {
            if (i % 9 === 0) return "h-[280px]";
            if (i % 5 === 0) return "h-[200px]";
            if (i % 3 === 0) return "h-[240px]";
            return "h-[180px]";
          })();

          const mobileSpan = (() => {
            if (i % 9 === 0) return "col-span-12";
            if (i % 7 === 0) return "col-span-12";
            if (i % 4 === 0) return "col-span-6";
            if (i % 3 === 0) return "col-span-6";
            return "col-span-12";
          })();

          return (
            <div
              key={img.id}
              onClick={() => setActive(img.src)}
              className={`${mobileSpan} ${mobileHeight} ${desktopSpan} relative group cursor-pointer
                transition-all duration-700
                ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: gridVisible ? `${i * 60}ms` : "0ms" }}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  className="w-full h-full object-cover
              transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition" />
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#cbf2ff]/20 transition" />
              </div>
            </div>
          );
        })}

        {/* <div className="hidden md:block col-span-4 h-50" />
        <div className="hidden md:block col-span-5 h-75" /> */}
      </div>

      {/* LIGHTBOX */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        >
          <img
            src={active}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

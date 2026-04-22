import { useState } from "react";

const images = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  src: `../public/gallery/${i + 1}.jpg`,
}));

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="w-full py-40 px-[10%] bg-[#010101]">
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="font-naslov text-3xl md:text-5xl text-white">
          Galerija radova
        </h2>
        <div className="w-16 h-0.5 bg-[#cbf2ff]/60 mx-auto mt-2" />
      </div>

      {/* GRID (exploded layout) */}
      <div className="grid grid-cols-12 gap-6">
        {images.map((img, i) => {
          // 🎯 controlled chaos rules
          const span = (() => {
            if (i % 9 === 0) return "col-span-7 row-span-2 h-[420px]";
            if (i % 5 === 0) return "col-span-5 h-[260px]";
            if (i % 3 === 0) return "col-span-4 h-[220px]";
            return "col-span-3 h-[180px]";
          })();

          return (
            <div
              key={img.id}
              onClick={() => setActive(img.src)}
              className={`${span} relative group cursor-pointer`}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  className="w-full h-full object-cover
                  transition-transform duration-700 group-hover:scale-110"
                />

                {/* soft overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition" />

                {/* glow edge */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#cbf2ff]/20 transition" />
              </div>
            </div>
          );
        })}

        {/* EMPTY SPACE BLOCKS (IMPORTANT) */}
        <div className="col-span-4 h-50" />
        <div className="col-span-5 h-75" />
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

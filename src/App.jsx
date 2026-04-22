import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("THREE.Clock") || args[0].includes("PCFSoftShadowMap"))
  )
    return;
  originalWarn(...args);
};

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Contact />
    </>
  );
}

export default App;

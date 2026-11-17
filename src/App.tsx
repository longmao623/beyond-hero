import { useEffect, useRef } from 'react';

const HERO_VH = 120;
const WORDS_LEFT = ['spark', 'imagine', 'evolve', 'render'];
const WORDS_RIGHT = ['blaze', 'genesis', 'purpose', 'ignite'];
const MARQUEE_TEXT = 'SPARK · RENDER · IGNITE · UNFOLD · GENESIS · EVOLVE · PURPOSE · BEYOND ·';

function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
      const scaleFactor = window.innerWidth < 768 ? 0.5 : 1;

      const opacity = 0.35 + progress * 0.65;

      leftRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = -(60 + i * 40) * scaleFactor * (1 - progress);
        el.style.transform = `translateX(${offset}px)`;
        el.style.opacity = `${opacity}`;
      });

      rightRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = (60 + i * 40) * scaleFactor * (1 - progress);
        el.style.transform = `translateX(${offset}px)`;
        el.style.opacity = `${opacity}`;
      });
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const layerOffsets = isMobile ? [18, 12, 6, 0] : [36, 24, 12, 0];
  const layerColors = ['#89CFF0', '#EC612C', '#90EE90', '#FFFFFF'];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: `${HERO_VH}vh`, backgroundColor: '#EC612C' }}
      >
        {/* Character Image - z-10 */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <img
            src="./images/hero.png"
            alt="Hero character"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto max-w-none block"
            style={{
              height: '115%',
              maxHeight: '115%',
              minHeight: '80%',
            }}
          />
        </div>

        {/* Sticky Text Overlay - z-5 */}
        <div className="sticky top-0 h-screen w-full z-[5]">
          {/* BEYOND stacked title */}
          <div className="absolute inset-0 flex items-start justify-center pt-[2vh] md:pt-[3vh]">
            <div className="relative" style={{ lineHeight: 0.85 }}>
              {layerColors.map((color, index) => (
                <h1
                  key={index}
                  className="font-display text-center tracking-tight select-none"
                  style={{
                    color,
                    fontSize: 'clamp(7.5rem, 30vw, 28rem)',
                    transform: `translateY(${layerOffsets[index]}px)`,
                    position: index === 3 ? 'relative' : 'absolute',
                    inset: index === 3 ? 'auto' : '0',
                    letterSpacing: '0.02em',
                  }}
                >
                  BEYOND
                </h1>
              ))}
            </div>
          </div>

          {/* Side word columns */}
          <div
            className="absolute inset-0 flex items-end justify-between px-[3vw] md:px-[6vw] pointer-events-none"
            style={{ bottom: '-8vh' }}
          >
            {/* Left column */}
            <div className="flex flex-col gap-1 md:gap-2">
              {WORDS_LEFT.map((word, i) => (
                <div
                  key={word}
                  ref={(el) => { leftRefs.current[i] = el; }}
                  className="font-side font-medium uppercase text-white/80 select-none transition-transform duration-75 ease-linear"
                  style={{
                    fontSize: 'clamp(1.6rem, 7vw, 9rem)',
                    lineHeight: 1.1,
                  }}
                >
                  {word}
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-1 md:gap-2 items-end">
              {WORDS_RIGHT.map((word, i) => (
                <div
                  key={word}
                  ref={(el) => { rightRefs.current[i] = el; }}
                  className="font-side font-medium uppercase text-white/80 text-right select-none transition-transform duration-75 ease-linear"
                  style={{
                    fontSize: 'clamp(1.6rem, 7vw, 9rem)',
                    lineHeight: 1.1,
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="w-full bg-white overflow-hidden py-6 md:py-8">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="shrink-0 font-display uppercase select-none"
              style={{
                color: '#EC612C',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1,
                paddingRight: '0.25em',
              }}
            >
              {MARQUEE_TEXT}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;

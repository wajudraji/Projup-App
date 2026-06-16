import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    type: 'gradient',
    bgGradient: 'from-slate-800 to-slate-700',
    sideColor1: 'from-yellow-200 to-yellow-100',
    sideColor2: 'bg-orange-500',
    title: 'Epic holiday deals',
    subtitle: 'Shop early and save',
  },
  {
    id: 2,
    type: 'gradient',
    bgGradient: 'from-blue-900 to-blue-700',
    sideColor1: 'from-orange-300 to-orange-200',
    sideColor2: 'bg-orange-500',
    title: 'Celebrate with gifts',
    subtitle: 'from small businesses',
  },
  {
    id: 3,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80',
    title: 'Shop Together',
    subtitle: 'Find gifts for everyone at the table',
  },
];

function Banner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const banner = banners[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>

      {/* Slide wrapper with sliding transition */}
      <div
        style={{
          display: 'flex',
          width: `${banners.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(current * 100) / banners.length}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {banners.map((b) => (
          <div key={b.id} style={{ width: `${100 / banners.length}%`, flexShrink: 0, height: '100%' }}>

            {/* GRADIENT SLIDE */}
            {b.type === 'gradient' && (
              <div className="w-full h-full grid grid-cols-3">
                <div className={`col-span-2 bg-gradient-to-r ${b.bgGradient} flex items-center justify-start px-12`}>
                  <div className="text-white">
                    <h2 className="text-4xl font-bold mb-2 leading-tight">{b.title}</h2>
                    <p className="text-xl">{b.subtitle}</p>
                    <button className="mt-4 bg-orange-500 px-6 py-2 rounded font-semibold hover:bg-orange-600 transition text-sm">
                      Shop Now
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className={`flex-1 bg-gradient-to-b ${b.sideColor1}`}></div>
                  <div className={`flex-1 ${b.sideColor2}`}></div>
                </div>
              </div>
            )}

            {/* IMAGE SLIDE */}
            {b.type === 'image' && (
              <div className="w-full h-full relative">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center px-12">
                  <div className="text-white">
                    <h2 className="text-4xl font-bold mb-2">{b.title}</h2>
                    <p className="text-xl">{b.subtitle}</p>
                    <button className="mt-4 bg-orange-500 px-6 py-2 rounded font-semibold hover:bg-orange-600 transition text-sm">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
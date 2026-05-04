'use client';

import { useState, useEffect } from 'react';
import { api, utils } from '@/lib/api';

export default function Hero() {
  const [institucion, setInstitucion] = useState<any>(null);
  const [portadas, setPortadas] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const [instData, contentData] = await Promise.all([
          api.institution.getCurrentPrincipal(),
          api.content.getAll(),
        ]);

        setInstitucion(instData);
        setPortadas(contentData.portada || []);

        if (instData.colorinstitucion?.[0]) {
          const colors = instData.colorinstitucion[0];
          document.documentElement.style.setProperty('--color-primario', colors.color_primario);
          document.documentElement.style.setProperty('--color-secundario', colors.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', colors.color_terciario);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    if (!institucion) return;

    const fullText = institucion.institucion_nombre.toUpperCase();
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setDisplayedText('');
        }, 3000);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [institucion]);

  useEffect(() => {
    if (portadas.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % portadas.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [portadas]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-14 h-14 rounded-full border-4 border-white/10 border-t-white animate-spin"
            style={{ borderTopColor: 'var(--color-primario)' }}
          />
          <p className="text-sm tracking-[0.35em] uppercase text-white/70">
            Cargando
          </p>
        </div>
      </div>
    );
  }

  if (portadas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-950 text-white text-2xl">
        ❌ NO HAY PORTADAS
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">

      {/* IMÁGENES DE FONDO */}
      <div className="absolute inset-0 z-0">
        {portadas.map((portada, index) => (
          <div
            key={portada.portada_id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={portada.portada_imagen}
              alt={portada.portada_titulo}
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}

        <div className="absolute inset-0 z-20 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/35" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div
          className="absolute inset-0 z-20 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 75% 35%, rgba(255,255,255,0.12), transparent 28%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08), transparent 30%)',
          }}
        />
      </div>

      {/* DETALLES DECORATIVOS */}
      <div className="absolute inset-0 z-0 bg-construction-grid opacity-20 pointer-events-none" />
      <div className="hero-electric-overlay" aria-hidden="true">
      <div className="hero-circuit-board" />

      <span className="hero-lightning bolt-one" />
      <span className="hero-lightning bolt-two" />
      <span className="hero-lightning bolt-three" />

      <span className="hero-glitch-cut cut-one" />
      <span className="hero-glitch-cut cut-two" />
      <span className="hero-glitch-cut cut-three" />
    </div>
      <div
        className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: 'var(--color-primario)' }}
      />

      <div
        className="absolute -bottom-44 -left-44 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: 'var(--color-terciario)' }}
      />

      <div className="absolute top-0 left-0 w-full h-1 z-30 bg-white/10">
        <div
          className="h-full w-1/3"
          style={{
            background:
              'linear-gradient(90deg, var(--color-primario), var(--color-terciario))',
          }}
        />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full py-24">

          {/* TEXTO */}
          <div className="max-w-4xl">

            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-xl mb-8"
              style={{
                borderColor: 'rgba(255,255,255,0.18)',
                background: 'rgba(15,23,42,0.55)',
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--color-primario)' }}
              />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-white/80">
               UPEA
              </span>
            </div>

            <h2
              className="text-lg sm:text-xl lg:text-2xl font-medium tracking-[0.45em] uppercase mb-4"
              style={{ color: 'var(--color-primario)' }}
            >
              Carrera de
            </h2>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
              <span
                className="block"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primario), var(--color-terciario) 50%, var(--color-primario))',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                }}
              >
                {displayedText || institucion?.institucion_nombre.toUpperCase()}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 pt-8">
              <div
                className="h-px w-16 sm:w-24"
                style={{ backgroundColor: 'var(--color-primario)' }}
              />

              <span
                className="px-5 py-2 rounded-full text-sm sm:text-base font-black tracking-[0.35em] border backdrop-blur-md"
                style={{
                  color: 'var(--color-primario)',
                  borderColor: 'rgba(255,255,255,0.16)',
                  background: 'rgba(15,23,42,0.55)',
                }}
              >
                {institucion?.institucion_iniciales}
              </span>

              <div
                className="h-px flex-1 min-w-20 max-w-44"
                style={{
                  backgroundColor: 'var(--color-primario)',
                  opacity: 0.35,
                }}
              />
            </div>
          </div>

          {/* LOGO */}
          <div className="flex justify-center lg:justify-end items-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem]">

              <div
                className="absolute inset-0 rounded-[3rem] blur-2xl opacity-35"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primario), var(--color-terciario))',
                }}
              />

              <div className="absolute inset-0 rounded-[3rem] border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-2xl" />

              <div
                className="absolute -inset-4 rounded-[3.5rem] border border-white/10"
                style={{
                  boxShadow: 'inset 0 0 80px rgba(255,255,255,0.06)',
                }}
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center p-10">
                {institucion?.institucion_logo ? (
                  <img
                    src={utils.buildImageUrl(institucion.institucion_logo)}
                    alt={institucion.institucion_nombre}
                    className="w-full h-full object-contain drop-shadow-2xl floating-animation"
                    style={{
                      filter: 'drop-shadow(0 24px 70px rgba(16,185,129,0.45))',
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-3xl flex items-center justify-center text-7xl font-black"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(var(--color-primario-rgb, 0,166,81), 0.2), rgba(var(--color-secundario-rgb, 30,108,68), 0.1))',
                      color: 'var(--color-primario)',
                    }}
                  >
                    IC
                  </div>
                )}
              </div>

              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl border border-white/15 backdrop-blur-xl shadow-xl"
                style={{
                  background: 'rgba(2, 6, 23, 0.78)',
                }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INDICADORES DEL SLIDER */}
      {portadas.length > 1 && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/55 backdrop-blur-xl px-5 py-3">
          {portadas.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                i === currentSlide ? 'w-14 bg-white/20' : 'w-7 bg-white/25 hover:bg-white/45'
              }`}
              style={{
                backgroundColor: i === currentSlide ? 'rgba(255,255,255,0.18)' : undefined,
              }}
              aria-label={`Ir a portada ${i + 1}`}
            >
              {i === currentSlide && (
                <div
                  className="absolute inset-y-0 left-0 h-full rounded-full"
                  style={{
                    backgroundColor: 'var(--color-primario)',
                    animation: 'slideProgress 8s linear forwards',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* SCROLL INDICATOR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div
          className="w-7 h-11 border-2 rounded-full flex items-start justify-center p-2 bg-slate-950/40 backdrop-blur-md"
          style={{ borderColor: 'var(--color-primario)' }}
        >
          <div
            className="w-1.5 h-2.5 rounded-full"
            style={{ backgroundColor: 'var(--color-primario)' }}
          />
        </div>
      </div>
    </div>
  );
}
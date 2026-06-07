'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Video, Upload, MoreHorizontal } from 'lucide-react';
import type { CarModel } from '@/lib/types';
import McLarenLogo from './mclaren-logo';

interface IntroScreenProps {
  model: CarModel;
  onConfigure: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ model, onConfigure }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const prev = () => setImgIndex(i => (i - 1 + model.images.length) % model.images.length);
  const next = () => setImgIndex(i => (i + 1) % model.images.length);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Background car image */}
      <Image
        key={imgIndex}
        src={model.images[imgIndex]}
        alt={model.name}
        fill
        className="object-cover object-center img-fade"
        priority
      />

      {/* Gradient layers for depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.32) 42%, rgba(0,0,0,0.12) 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)' }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-7 pt-6 anim-up">
        <div style={{ width: 44 }} />
        <McLarenLogo size={190} textOnly />
        <button className="ctrl-btn"><MoreHorizontal size={17} /></button>
      </div>

      {/* Side arrows */}
      <button onClick={prev} className="ctrl-btn absolute left-6 top-1/2 -translate-y-1/2 z-10">
        <ChevronLeft size={19} />
      </button>
      <button onClick={next} className="ctrl-btn absolute right-6 top-1/2 -translate-y-1/2 z-10">
        <ChevronRight size={19} />
      </button>

      {/* Image pagination dots */}
      <div className="absolute z-10 flex gap-1.5" style={{ bottom: 112, left: '50%', transform: 'translateX(-50%)' }}>
        {model.images.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIndex(i)}
            style={{
              width: i === imgIndex ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: i === imgIndex ? '#FF8000' : 'rgba(255,255,255,0.28)',
              transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Media controls */}
      <div className="absolute z-10 flex gap-2" style={{ bottom: 22, left: '50%', transform: 'translateX(-50%)' }}>
        <button className="ctrl-btn"><Video size={16} /></button>
        <button className="ctrl-btn"><Upload size={16} /></button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8" style={{ paddingBottom: 28 }}>
        <div className="flex items-end justify-between">
          <div>
            {/* Brand accent bar */}
            <div className="anim-up" style={{ width: 32, height: 2, background: '#FF8000', borderRadius: 1, marginBottom: 14 }} />

            <h1
              className="anim-up font-display text-white"
              style={{ fontSize: 'clamp(54px, 5.8vw, 82px)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 10, animationDelay: '35ms' }}
            >
              {model.name}
            </h1>

            <p className="anim-up" style={{ color: 'rgba(255,255,255,0.48)', fontSize: 13, lineHeight: 1.7, fontWeight: 300, maxWidth: 380, marginBottom: 22, animationDelay: '70ms' }}>
              {model.tagline}
            </p>

            {/* Specs row */}
            <div className="flex items-center gap-5 stagger">
              {model.specs.map((spec, i) => (
                <React.Fragment key={spec.label}>
                  {i > 0 && <div className="stat-sep" />}
                  <div className="anim-up flex flex-col gap-1">
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 27, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '0.01em' }}>
                      {spec.value}
                      <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.5)', marginLeft: 4, letterSpacing: '0.06em' }}>{spec.unit}</span>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.13em' }}>
                      {spec.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onConfigure}
            className="btn-brand anim-up"
            style={{ animationDelay: '140ms', fontSize: 14, padding: '15px 34px' }}
          >
            Create your McLaren
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;

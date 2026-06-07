'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Video, Upload } from 'lucide-react';
import type { CarModel, ConfigSection } from '@/lib/types';
import McLarenLogo from './mclaren-logo';

interface CarViewerProps {
  model: CarModel;
  imgIndex: number;
  onPrev: () => void;
  onNext: () => void;
  activeSection: ConfigSection;
  onSectionChange: (s: ConfigSection) => void;
  onChangeModel?: () => void;
}

const CarViewer: React.FC<CarViewerProps> = ({
  model,
  imgIndex,
  onPrev,
  onNext,
  activeSection,
  onSectionChange,
  onChangeModel,
}) => (
  <div className="relative flex-1 h-full overflow-hidden">
    {/* Car image */}
    <Image
      key={imgIndex}
      src={model.images[imgIndex % model.images.length]}
      alt={model.name}
      fill
      className="object-cover object-center img-fade"
      priority
    />

    {/* Gradient: top fade */}
    <div
      className="absolute inset-x-0 top-0 pointer-events-none"
      style={{ height: 100, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
    />
    {/* Gradient: right edge — bleeds into sidebar */}
    <div
      className="absolute inset-y-0 right-0 pointer-events-none"
      style={{ width: 120, background: 'linear-gradient(to right, transparent 0%, rgba(14,14,14,0.7) 100%)' }}
    />
    {/* Gradient: bottom */}
    <div
      className="absolute inset-x-0 bottom-0 pointer-events-none"
      style={{ height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
    />

    {/* Change Model button */}
    <button
      onClick={onChangeModel}
      className="absolute top-5 left-5 z-10 flex items-center gap-2"
      style={{
        background: 'rgba(16,16,16,0.82)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 100,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '7px 14px 7px 10px',
        cursor: 'pointer',
        transition: 'background 0.18s ease, border-color 0.18s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.18)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,16,16,0.82)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {/* Speedmark icon only — no wordmark to avoid clutter */}
      <McLarenLogo markOnly size={28} />
      <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.02em' }}>
        Change Model
      </span>
    </button>

    {/* Left arrow */}
    <button onClick={onPrev} className="ctrl-btn absolute left-5 top-1/2 -translate-y-1/2 z-10">
      <ChevronLeft size={19} />
    </button>
    {/* Right arrow */}
    <button onClick={onNext} className="ctrl-btn absolute right-5 top-1/2 -translate-y-1/2 z-10">
      <ChevronRight size={19} />
    </button>

    {/* Bottom controls */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
      <div className="section-pills">
        {(['Exterior', 'Interior'] as ConfigSection[]).map(s => (
          <button
            key={s}
            className={activeSection === s ? 'active' : ''}
            onClick={() => onSectionChange(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <button className="ctrl-btn"><Video size={16} /></button>
      <button className="ctrl-btn"><Upload size={16} /></button>
    </div>
  </div>
);

export default CarViewer;

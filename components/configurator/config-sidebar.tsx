'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, MoreHorizontal, PanelRight } from 'lucide-react';
import type { CarModel, ConfigSection, SelectedOptions, ConfigCategory } from '@/lib/types';

interface ConfigSidebarProps {
  model: CarModel;
  activeSection: ConfigSection;
  currentStep: number;
  selectedOptions: SelectedOptions;
  onStepChange: (step: number) => void;
  onOptionSelect: (category: ConfigCategory, optionId: string) => void;
  onViewSummary: () => void;
}

const ConfigSidebar: React.FC<ConfigSidebarProps> = ({
  model,
  activeSection,
  currentStep,
  selectedOptions,
  onStepChange,
  onOptionSelect,
  onViewSummary,
}) => {
  const sectionData = model.sections.find(s => s.section === activeSection);
  if (!sectionData) return null;

  const totalSteps = sectionData.steps.length;
  const stepData   = sectionData.steps.find(s => s.step === currentStep);

  return (
    <div
      className="flex flex-col h-full anim-right"
      style={{
        width: 'var(--sidebar-width, 410px)',
        background: 'linear-gradient(172deg, #1d1d1d 0%, #161616 50%, #111111 100%)',
        borderLeft: '1px solid rgba(255,255,255,0.055)',
        flexShrink: 0,
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: '20px 20px 14px' }}>
        <div className="flex items-center justify-between">
          <h2
            className="font-display text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: '0.05em', lineHeight: 1 }}
          >
            {model.name}
          </h2>
          <div className="flex gap-1.5">
            <button className="ctrl-btn" style={{ width: 36, height: 36 }}><MoreHorizontal size={15} /></button>
            <button className="ctrl-btn" style={{ width: 36, height: 36 }}><PanelRight size={15} /></button>
          </div>
        </div>
      </div>

      {/* ── Section + Step strip ── */}
      <div style={{ padding: '0 20px 14px' }}>
        <h3
          className="font-display"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)', marginBottom: 10 }}
        >
          {activeSection}
        </h3>

        {/* Step pill bar — steps fill the full width */}
        <div
          className="flex items-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: 3 }}
        >
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              className={`step-dot${currentStep === n ? ' active' : ''}`}
              style={{ flex: 1, height: 34, borderRadius: 100 }}
              onClick={() => onStepChange(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── Options list ── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}
      >
        {/* Active step — expandable option selector */}
        {stepData?.categories.map(category => {
          const selected = selectedOptions[category.id]
            ?? category.options.find(o => o.id === category.defaultOptionId)
            ?? category.options[0];
          return (
            <CategoryRow
              key={category.id}
              category={category}
              selected={selected}
              onSelect={(id) => onOptionSelect(category, id)}
            />
          );
        })}

        {/* Other steps — collapsed nav rows */}
        {sectionData.steps
          .filter(s => s.step !== currentStep)
          .flatMap(step =>
            step.categories.map(category => {
              const selected = selectedOptions[category.id]
                ?? category.options.find(o => o.id === category.defaultOptionId)
                ?? category.options[0];
              return (
                <button
                  key={category.id}
                  className="opt-card"
                  onClick={() => onStepChange(step.step)}
                >
                  {selected.image && (
                    <div style={{ position: 'relative', width: 48, height: 36, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={selected.image} alt={selected.label} fill className="object-cover" />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{category.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selected.value}
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.28)', flexShrink: 0 }} />
                </button>
              );
            })
          )}
      </div>

      {/* ── Footer CTA ── */}
      <div style={{ padding: '12px 14px 20px', borderTop: '1px solid rgba(255,255,255,0.055)' }}>
        <button onClick={onViewSummary} className="btn-brand" style={{ width: '100%' }}>
          View your McLaren
        </button>
      </div>
    </div>
  );
};

/* ── Category row with dropdown ── */
interface CategoryRowProps {
  category: ConfigCategory;
  selected: { id: string; label: string; value: string; image?: string };
  onSelect: (optionId: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, selected, onSelect }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button className="opt-card active" onClick={() => setOpen(o => !o)}>
        {selected.image && (
          <div style={{ position: 'relative', width: 52, height: 38, borderRadius: 7, overflow: 'hidden', flexShrink: 0 }}>
            <Image src={selected.image} alt={selected.label} fill className="object-cover" />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{category.label}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{selected.value}</div>
        </div>
        <ChevronRight
          size={14}
          style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }}
        />
      </button>

      {open && (
        <div className="anim-down" style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 4 }}>
          {category.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => { onSelect(opt.id); setOpen(false); }}
              className={`opt-card${selected.id === opt.id ? ' active' : ''}`}
            >
              {opt.image && (
                <div style={{ position: 'relative', width: 44, height: 32, borderRadius: 5, overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={opt.image} alt={opt.label} fill className="object-cover" />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{opt.label}</div>
                {opt.price && (
                  <div style={{ fontSize: 11, color: 'rgba(255,128,0,0.75)', marginTop: 1 }}>
                    +£{opt.price.toLocaleString()}
                  </div>
                )}
              </div>
              {selected.id === opt.id && (
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#FF8000', flexShrink: 0, boxShadow: '0 0 8px rgba(255,128,0,0.55)' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigSidebar;

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown, Pencil, ChevronLeft, Send } from 'lucide-react';
import type { CarModel, SelectedOptions, SummaryTab } from '@/lib/types';

interface SummarySidebarProps {
  model: CarModel;
  selectedOptions: SelectedOptions;
  onReturnToConfig: () => void;
  onYourDetails: () => void;
  onEditCategory: (categoryId: string) => void;
}

const SummarySidebar: React.FC<SummarySidebarProps> = ({
  model,
  selectedOptions,
  onReturnToConfig,
  onYourDetails,
  onEditCategory,
}) => {
  const [activeTab, setActiveTab] = useState<SummaryTab>('Selected Options');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Exterior', 'Interior'])
  );

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  };

  const allSelected = model.sections.flatMap(section =>
    section.steps.flatMap(step =>
      step.categories.map(cat => {
        const sel = selectedOptions[cat.id]
          ?? cat.options.find(o => o.id === cat.defaultOptionId)
          ?? cat.options[0];
        return { section: section.section, category: cat, selected: sel };
      })
    )
  );

  const sectionGroups = model.sections.map(s => ({
    label: s.section,
    items: allSelected.filter(x => x.section === s.section),
  }));

  const totalUpgrade = allSelected.reduce((sum, x) => sum + (x.selected.price ?? 0), 0);

  return (
    <div
      className="flex flex-col h-full anim-right"
      style={{
        width: 'clamp(420px, 36vw, 560px)',
        background: 'linear-gradient(172deg, #1e1e1e 0%, #171717 50%, #111111 100%)',
        borderLeft: '1px solid rgba(255,255,255,0.055)',
        flexShrink: 0,
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: '20px 22px 0' }}>
        <div className="flex items-start justify-between" style={{ marginBottom: 16 }}>
          <div>
            {/* Brand accent */}
            <div style={{ width: 24, height: 2, background: '#FF8000', borderRadius: 1, marginBottom: 8 }} />
            <h2
              className="font-display text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: '0.04em', lineHeight: 1 }}
            >
              Your {model.name}
            </h2>
          </div>
          <button className="btn-ghost" style={{ fontSize: 12, padding: '8px 14px', gap: 6 }}>
            Email summary <Send size={12} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {(['Selected Options', 'Standard Features'] as SummaryTab[]).map(tab => (
            <button
              key={tab}
              className={`sum-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {activeTab === 'Selected Options' ? (
          <>
            {sectionGroups.map(group => (
              <div key={group.label}>
                {/* Section header */}
                <button
                  className="w-full flex items-center justify-between"
                  style={{ padding: '10px 6px 8px' }}
                  onClick={() => toggleSection(group.label)}
                >
                  <span
                    className="font-display text-white"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, letterSpacing: '0.07em' }}
                  >
                    {group.label}
                  </span>
                  {expandedSections.has(group.label)
                    ? <ChevronUp size={16} style={{ color: 'rgba(255,255,255,0.45)' }} />
                    : <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.45)' }} />
                  }
                </button>

                {expandedSections.has(group.label) && (
                  <div className="anim-down" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {group.items.map(({ category, selected }) => (
                      <div
                        key={category.id}
                        className="flex items-center gap-3"
                        style={{
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: 'rgba(255,255,255,0.025)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="thumb">
                          {selected.image
                            ? <Image src={selected.image} alt={selected.label} fill className="object-cover" />
                            : null
                          }
                        </div>

                        {/* Labels */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
                            {category.label}
                          </div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.43)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {selected.value}
                          </div>
                          {selected.price && (
                            <div style={{ fontSize: 11, color: 'rgba(255,128,0,0.8)', marginTop: 2 }}>
                              +£{selected.price.toLocaleString()}
                            </div>
                          )}
                        </div>

                        {/* Edit */}
                        <button
                          className="ctrl-btn"
                          style={{ width: 32, height: 32, flexShrink: 0 }}
                          onClick={() => onEditCategory(category.id)}
                        >
                          <Pencil size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Extras total */}
            {totalUpgrade > 0 && (
              <div
                className="flex justify-between items-center"
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,128,0,0.07)',
                  border: '1px solid rgba(255,128,0,0.2)',
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Optional extras</span>
                <span
                  className="font-condensed"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 18, fontWeight: 700, color: '#FF8000', letterSpacing: '0.02em' }}
                >
                  +£{totalUpgrade.toLocaleString()}
                </span>
              </div>
            )}
          </>
        ) : (
          <div style={{ padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              'Carbon fibre monocoque chassis',
              'McLaren-Ricardo 3.0L twin-turbo V6 hybrid',
              'E-motor producing 94 bhp',
              '8-speed seamless shift gearbox',
              'Proactive Chassis Control III suspension',
              'Carbon ceramic brakes (standard)',
              'Active aerodynamics',
              'Track Telemetry system',
            ].map(feat => (
              <div
                key={feat}
                className="flex items-center gap-3"
                style={{ padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}
              >
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF8000', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.45 }}>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div
        className="flex gap-2"
        style={{ padding: '12px 14px 20px', borderTop: '1px solid rgba(255,255,255,0.055)' }}
      >
        <button onClick={onReturnToConfig} className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}>
          <ChevronLeft size={14} />
          Return to configuration
        </button>
        <button onClick={onYourDetails} className="btn-brand" style={{ flex: 1 }}>
          Your details
        </button>
      </div>
    </div>
  );
};

export default SummarySidebar;

'use client';

import React, { useState, useCallback } from 'react';
import type { AppView, ConfigSection, SelectedOptions, ConfigCategory } from '@/lib/types';
import { ARTURA } from '@/lib/data';
import IntroScreen    from '@/components/configurator/intro-screen';
import CarViewer      from '@/components/configurator/car-viewer';
import ConfigSidebar  from '@/components/configurator/config-sidebar';
import SummarySidebar from '@/components/configurator/summary-sidebar';

function buildDefaultSelections(model: typeof ARTURA): SelectedOptions {
  const result: SelectedOptions = {};
  for (const section of model.sections) {
    for (const step of section.steps) {
      for (const cat of step.categories) {
        const def = cat.options.find(o => o.id === cat.defaultOptionId) ?? cat.options[0];
        result[cat.id] = def;
      }
    }
  }
  return result;
}

export default function Home() {
  const model = ARTURA;

  const [view,            setView]           = useState<AppView>('intro');
  const [activeSection,   setActiveSection]   = useState<ConfigSection>('Exterior');
  const [currentStep,     setCurrentStep]     = useState(1);
  const [imgIndex,        setImgIndex]        = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => buildDefaultSelections(model)
  );

  const handleOptionSelect = useCallback(
    (category: ConfigCategory, optionId: string) => {
      const opt = category.options.find(o => o.id === optionId);
      if (!opt) return;
      setSelectedOptions(prev => ({ ...prev, [category.id]: opt }));
    },
    []
  );

  const handleSectionChange = useCallback((s: ConfigSection) => {
    setActiveSection(s);
    setCurrentStep(1);
  }, []);

  const handleEditCategory = useCallback((categoryId: string) => {
    // Find which section + step contains this category and go there
    for (const section of model.sections) {
      for (const step of section.steps) {
        if (step.categories.some(c => c.id === categoryId)) {
          setActiveSection(section.section);
          setCurrentStep(step.step);
          setView('config');
          return;
        }
      }
    }
  }, [model]);

  const prevImg = () => setImgIndex(i => (i - 1 + model.images.length) % model.images.length);
  const nextImg = () => setImgIndex(i => (i + 1) % model.images.length);

  if (view === 'intro') {
    return (
      <div className="w-screen h-screen overflow-hidden">
        <IntroScreen
          model={model}
          onConfigure={() => setView('config')}
        />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col" style={{ background: '#111111' }}>
      {/* ── Main split layout ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Car viewer */}
        <CarViewer
          model={model}
          imgIndex={imgIndex}
          onPrev={prevImg}
          onNext={nextImg}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onChangeModel={() => setView('intro')}
        />

        {/* Right: Config or Summary panel */}
        {view === 'config' ? (
          <ConfigSidebar
            key={`${activeSection}-${currentStep}`}
            model={model}
            activeSection={activeSection}
            currentStep={currentStep}
            selectedOptions={selectedOptions}
            onStepChange={setCurrentStep}
            onOptionSelect={handleOptionSelect}
            onViewSummary={() => setView('summary')}
          />
        ) : (
          <SummarySidebar
            model={model}
            selectedOptions={selectedOptions}
            onReturnToConfig={() => setView('config')}
            onYourDetails={() => alert('Proceeding to contact details...')}
            onEditCategory={handleEditCategory}
          />
        )}
      </div>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-3 flex items-center justify-between"
        style={{
          background: '#0e0e0e',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: 12,
        }}
      >
        <span className="text-white/30">© McLaren Automotive 2026</span>
        <div className="flex gap-4">
          {['Terms & Conditions', 'Privacy', 'Cookies'].map(link => (
            <button key={link} className="text-white/40 hover:text-white/70 transition-colors underline">
              {link}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

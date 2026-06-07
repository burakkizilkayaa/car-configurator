export type AppView = 'intro' | 'config' | 'summary';
export type ConfigSection = 'Exterior' | 'Interior';
export type SummaryTab = 'Selected Options' | 'Standard Features';

export interface ConfigOption {
  id: string;
  label: string;
  value: string;
  image?: string;
  price?: number;
}

export interface ConfigCategory {
  id: string;
  label: string;
  options: ConfigOption[];
  defaultOptionId: string;
}

export interface ConfigStep {
  step: number;
  categories: ConfigCategory[];
}

export interface SectionConfig {
  section: ConfigSection;
  steps: ConfigStep[];
}

export interface CarSpec {
  label: string;
  value: string;
  unit: string;
}

export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  specs: CarSpec[];
  images: string[];
  sections: SectionConfig[];
}

export interface SelectedOptions {
  [categoryId: string]: ConfigOption;
}

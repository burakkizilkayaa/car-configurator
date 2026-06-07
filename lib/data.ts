import type { CarModel } from './types';

export const ARTURA: CarModel = {
  id: 'artura',
  name: 'Artura',
  tagline: "McLaren's first-ever high-performance hybrid supercar, born from Formula 1 minds, methods and materials.",
  specs: [
    { label: 'Power',    value: '680',  unit: 'BHP' },
    { label: 'Top Speed', value: '205', unit: 'MPH' },
    { label: '0–62 mph', value: '3.0',  unit: 'S'   },
  ],
  images: [
    'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1920&q=85',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1920&q=85',
  ],
  sections: [
    {
      section: 'Exterior',
      steps: [
        {
          step: 1,
          categories: [
            {
              id: 'body',
              label: 'Body',
              defaultOptionId: 'body-painted',
              options: [
                {
                  id: 'body-painted',
                  label: 'Fully Painted',
                  value: 'Fully Painted',
                  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
                },
                {
                  id: 'body-carbon',
                  label: 'Carbon Fibre Hood',
                  value: 'Carbon Fibre Hood',
                  image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&q=80',
                  price: 4500,
                },
              ],
            },
          ],
        },
        {
          step: 2,
          categories: [
            {
              id: 'paint',
              label: 'Paint',
              defaultOptionId: 'paint-papaya',
              options: [
                { id: 'paint-papaya',   label: 'Papaya Spark',      value: 'Papaya Spark',      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80' },
                { id: 'paint-yellow',   label: 'Volcano Yellow',    value: 'Volcano Yellow',    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&q=80', price: 2200 },
                { id: 'paint-onyx',     label: 'Onyx Black',        value: 'Onyx Black',        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&q=80', price: 1500 },
                { id: 'paint-silver',   label: 'Supernova Silver',  value: 'Supernova Silver',  image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=200&q=80', price: 1800 },
                { id: 'paint-azure',    label: 'Azure Blue',        value: 'Azure Blue',        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80', price: 2200 },
              ],
            },
          ],
        },
        {
          step: 3,
          categories: [
            {
              id: 'exterior-package',
              label: 'Exterior Packages',
              defaultOptionId: 'ext-pkg-carbon',
              options: [
                { id: 'ext-pkg-none',   label: 'No Package',            value: 'No Package' },
                { id: 'ext-pkg-carbon', label: 'Carbon Fibre Pack',     value: 'Carbon Fibre Pack',     price: 8900, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&q=80' },
                { id: 'ext-pkg-mso',    label: 'MSO Track Pack',        value: 'MSO Track Pack',        price: 14500, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&q=80' },
              ],
            },
          ],
        },
        {
          step: 4,
          categories: [
            {
              id: 'vane-grille',
              label: 'Vaned Grille Finish',
              defaultOptionId: 'grille-carbon',
              options: [
                { id: 'grille-body',   label: 'Body Colour',              value: 'Body Colour' },
                { id: 'grille-carbon', label: 'Gloss Carbon Fibre',       value: 'Gloss Carbon Fibre',  price: 1200 },
                { id: 'grille-satin',  label: 'Satin Carbon Fibre',       value: 'Satin Carbon Fibre',  price: 1200 },
              ],
            },
          ],
        },
        {
          step: 5,
          categories: [
            {
              id: 'mirror-caps',
              label: 'Mirror Caps',
              defaultOptionId: 'mirror-carbon',
              options: [
                { id: 'mirror-body',   label: 'Body Colour',        value: 'Body Colour' },
                { id: 'mirror-carbon', label: 'Gloss Carbon Fibre', value: 'Gloss Carbon Fibre', price: 950 },
                { id: 'mirror-satin',  label: 'Satin Carbon Fibre', value: 'Satin Carbon Fibre', price: 950 },
              ],
            },
          ],
        },
      ],
    },
    {
      section: 'Interior',
      steps: [
        {
          step: 1,
          categories: [
            {
              id: 'seat-material',
              label: 'Seat Material',
              defaultOptionId: 'seat-alcantara',
              options: [
                { id: 'seat-cloth',      label: 'Nappa Leather',   value: 'Nappa Leather' },
                { id: 'seat-alcantara',  label: 'Alcantara',       value: 'Alcantara',    price: 2800 },
                { id: 'seat-semi',       label: 'Semi-Aniline',    value: 'Semi-Aniline', price: 4200 },
              ],
            },
          ],
        },
        {
          step: 2,
          categories: [
            {
              id: 'interior-colour',
              label: 'Interior Colour',
              defaultOptionId: 'int-colour-black',
              options: [
                { id: 'int-colour-black', label: 'Jet Black',     value: 'Jet Black' },
                { id: 'int-colour-tan',   label: 'Tan',           value: 'Tan',           price: 1500 },
                { id: 'int-colour-cream',  label: 'Cream White',  value: 'Cream White',   price: 1500 },
                { id: 'int-colour-red',   label: 'Lava Red',      value: 'Lava Red',      price: 1800 },
              ],
            },
          ],
        },
        {
          step: 3,
          categories: [
            {
              id: 'carbon-trim',
              label: 'Carbon Fibre Trim',
              defaultOptionId: 'trim-gloss',
              options: [
                { id: 'trim-none',  label: 'Satin Aluminium',        value: 'Satin Aluminium' },
                { id: 'trim-gloss', label: 'Gloss Carbon Fibre',     value: 'Gloss Carbon Fibre', price: 3200 },
                { id: 'trim-satin', label: 'Satin Carbon Fibre',     value: 'Satin Carbon Fibre', price: 3200 },
              ],
            },
          ],
        },
        {
          step: 4,
          categories: [
            {
              id: 'steering-wheel',
              label: 'Steering Wheel',
              defaultOptionId: 'sw-carbon',
              options: [
                { id: 'sw-standard', label: 'Standard',            value: 'Standard' },
                { id: 'sw-carbon',   label: 'Carbon Fibre Insert', value: 'Carbon Fibre Insert', price: 2100 },
              ],
            },
          ],
        },
        {
          step: 5,
          categories: [
            {
              id: 'sill-plates',
              label: 'Sill Plates',
              defaultOptionId: 'sill-illum',
              options: [
                { id: 'sill-standard', label: 'Standard',       value: 'Standard' },
                { id: 'sill-illum',    label: 'Illuminated',    value: 'Illuminated', price: 750 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const ALL_MODELS = [ARTURA];

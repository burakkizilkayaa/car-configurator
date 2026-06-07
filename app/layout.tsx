import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'McLaren Configurator',
  description: 'Configure your McLaren Artura – choose paint, interior, and personalised options.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ '--sidebar-width': '400px', '--summary-sidebar-width': '520px' } as React.CSSProperties} className="h-full">
      <body className="h-full overflow-hidden" style={{ background: '#0e0e0e' }}>
        {children}
      </body>
    </html>
  );
}

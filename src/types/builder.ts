export type ComponentType = 
  | 'navbar'
  | 'themeToggle'
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'cta'
  | 'contact'
  | 'pricing'
  | 'faq'
  | 'footer'
  | 'imageGallery'
  | 'videoEmbed';

export interface ComponentBlock {
  id: string;
  type: ComponentType;
  content: Record<string, string>;
}

export interface ComponentTemplate {
  type: ComponentType;
  label: string;
  icon: string;
  description: string;
  defaultContent: Record<string, string>;
}

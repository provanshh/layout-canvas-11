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
  | 'videoEmbed'
  | 'team'
  | 'blog'
  | 'newsletter'
  | 'ctaBanner';

export interface BlockStyles {
  paddingTop?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundOpacity?: string;
  textColor?: string;
  accentColor?: string;
  fontFamily?: string;
  fontScale?: string;
}

export interface ComponentBlock {
  id: string;
  type: ComponentType;
  content: Record<string, string>;
  styles?: BlockStyles;
}

export interface ComponentTemplate {
  type: ComponentType;
  label: string;
  icon: string;
  description: string;
  defaultContent: Record<string, string>;
  defaultStyles?: BlockStyles;
}

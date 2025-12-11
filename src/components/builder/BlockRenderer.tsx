import { ComponentBlock } from '@/types/builder';
import { HeroBlock } from './blocks/HeroBlock';
import { FeaturesBlock } from './blocks/FeaturesBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';
import { CTABlock } from './blocks/CTABlock';
import { ContactBlock } from './blocks/ContactBlock';
import { PricingBlock } from './blocks/PricingBlock';
import { FAQBlock } from './blocks/FAQBlock';
import { NavbarBlock } from './blocks/NavbarBlock';
import { ThemeToggleBlock } from './blocks/ThemeToggleBlock';
import { FooterBlock } from './blocks/FooterBlock';
import { ImageGalleryBlock } from './blocks/ImageGalleryBlock';
import { VideoEmbedBlock } from './blocks/VideoEmbedBlock';
import { TeamBlock } from './blocks/TeamBlock';
import { BlogBlock } from './blocks/BlogBlock';
import { NewsletterBlock } from './blocks/NewsletterBlock';
import { CTABannerBlock } from './blocks/CTABannerBlock';

export interface ButtonEditConfig {
  text: string;
  bgColor: string;
  textColor: string;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
  link: string;
  openInNewTab: boolean;
  onTextChange: (v: string) => void;
  onBgColorChange: (v: string) => void;
  onTextColorChange: (v: string) => void;
  onPaddingXChange: (v: number) => void;
  onPaddingYChange: (v: number) => void;
  onBorderRadiusChange: (v: number) => void;
  onLinkChange: (v: string) => void;
  onOpenInNewTabChange: (v: boolean) => void;
}

interface BlockRendererProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
  isDarkTheme?: boolean;
  onToggleTheme?: () => void;
  onEditButton?: (buttonId: string, config: ButtonEditConfig) => void;
}

export const BlockRenderer = ({ block, onUpdate, isPreview, isDarkTheme, onToggleTheme, onEditButton }: BlockRendererProps) => {
  const blockComponents = {
    navbar: NavbarBlock,
    themeToggle: ThemeToggleBlock,
    hero: HeroBlock,
    features: FeaturesBlock,
    testimonials: TestimonialsBlock,
    cta: CTABlock,
    contact: ContactBlock,
    pricing: PricingBlock,
    faq: FAQBlock,
    footer: FooterBlock,
    imageGallery: ImageGalleryBlock,
    videoEmbed: VideoEmbedBlock,
    team: TeamBlock,
    blog: BlogBlock,
    newsletter: NewsletterBlock,
    ctaBanner: CTABannerBlock,
  };

  const Component = blockComponents[block.type];
  
  if (!Component) {
    return <div className="p-4 text-muted-foreground">Unknown block type: {block.type}</div>;
  }

  // Apply custom styles if present
  const customStyles: React.CSSProperties = {};
  if (block.content.styleBgColor) customStyles.backgroundColor = block.content.styleBgColor;
  if (block.content.styleTextColor) customStyles.color = block.content.styleTextColor;
  if (block.content.styleFontFamily) customStyles.fontFamily = block.content.styleFontFamily;
  if (block.content.styleFontScale) customStyles.fontSize = `${block.content.styleFontScale}%`;
  
  const spacingClass = {
    compact: 'py-4',
    normal: '',
    relaxed: 'py-8',
    spacious: 'py-12',
  }[block.content.styleSpacing || 'normal'] || '';

  return (
    <div style={customStyles} className={spacingClass}>
      <Component 
        block={block} 
        onUpdate={onUpdate} 
        isPreview={isPreview} 
        isDarkTheme={isDarkTheme}
        onToggleTheme={onToggleTheme}
        onEditButton={onEditButton}
      />
    </div>
  );
};

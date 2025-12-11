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

interface BlockRendererProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const BlockRenderer = ({ block, onUpdate, isPreview }: BlockRendererProps) => {
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
  };

  const Component = blockComponents[block.type];
  
  if (!Component) {
    return <div className="p-4 text-muted-foreground">Unknown block type: {block.type}</div>;
  }

  return <Component block={block} onUpdate={onUpdate} isPreview={isPreview} />;
};

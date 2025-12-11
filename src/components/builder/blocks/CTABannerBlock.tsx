import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';
import { ArrowRight } from 'lucide-react';

export const CTABannerBlock = ({ block, onUpdate, isPreview, onEditButton, onEditText }: BaseBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  return (
    <div className="py-12 px-6 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <EditableText
            as="h2"
            value={content.headline}
            onChange={(val) => updateField('headline', val)}
            className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-headline`}
          />
          <EditableText
            as="p"
            value={content.subtext}
            onChange={(val) => updateField('subtext', val)}
            className="text-primary-foreground/80 block"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-subtext`}
          />
        </div>
        
        <div className="flex gap-4">
          <EditableButton
            text={content.buttonText || 'Get Started'}
            bgColor={content.buttonBgColor || '#ffffff'}
            textColor={content.buttonTextColor || '#0891b2'}
            link={content.buttonLink || '#'}
            className="px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            isPreview={isPreview}
            onEditButton={onEditButton}
            buttonId={`${block.id}-cta-btn`}
            onTextChange={(v) => updateField('buttonText', v)}
            onBgColorChange={(v) => updateField('buttonBgColor', v)}
            onTextColorChange={(v) => updateField('buttonTextColor', v)}
            onLinkChange={(v) => updateField('buttonLink', v)}
          />
          
          {content.secondaryButtonText && (
            <EditableButton
              text={content.secondaryButtonText}
              bgColor={content.secondaryButtonBgColor || 'transparent'}
              textColor={content.secondaryButtonTextColor || '#ffffff'}
              link={content.secondaryButtonLink || '#'}
              className="px-6 py-3 rounded-lg font-medium border border-primary-foreground/30"
              isPreview={isPreview}
              onEditButton={onEditButton}
              buttonId={`${block.id}-secondary-btn`}
              onTextChange={(v) => updateField('secondaryButtonText', v)}
              onBgColorChange={(v) => updateField('secondaryButtonBgColor', v)}
              onTextColorChange={(v) => updateField('secondaryButtonTextColor', v)}
              onLinkChange={(v) => updateField('secondaryButtonLink', v)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
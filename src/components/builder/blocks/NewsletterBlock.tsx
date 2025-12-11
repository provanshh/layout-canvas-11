import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export const NewsletterBlock = ({ 
  block, 
  onUpdate, 
  isPreview,
  onEditButton,
  onEditText 
}: BaseBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  return (
    <div className="py-16 px-6 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <EditableText
          as="h2"
          value={content.title}
          onChange={(val) => updateField('title', val)}
          className="text-3xl font-bold mb-4"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-title`}
        />
        <EditableText
          as="p"
          value={content.subtitle}
          onChange={(val) => updateField('subtitle', val)}
          className="text-muted-foreground mb-8 block"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-subtitle`}
        />
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={content.placeholder}
            className="flex-1"
            disabled={isPreview}
          />
          <EditableButton
            text={content.buttonText || 'Subscribe'}
            bgColor={content.buttonColor || '#0891b2'}
            textColor={content.buttonTextColor || '#ffffff'}
            link={content.buttonLink || '#'}
            className="whitespace-nowrap px-6 py-2 rounded-md font-medium"
            isPreview={isPreview}
            onEditButton={onEditButton}
            buttonId={`${block.id}-cta-btn`}
            onTextChange={(v) => updateField('buttonText', v)}
            onBgColorChange={(v) => updateField('buttonColor', v)}
            onTextColorChange={(v) => updateField('buttonTextColor', v)}
            onLinkChange={(v) => updateField('buttonLink', v)}
          />
        </div>
        
        <EditableText
          as="p"
          value={content.disclaimer}
          onChange={(val) => updateField('disclaimer', val)}
          className="text-xs text-muted-foreground mt-4"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-disclaimer`}
        />
      </div>
    </div>
  );
};
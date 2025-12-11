import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';

interface CTABlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const CTABlock = ({ block, onUpdate, isPreview }: CTABlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const buttonBgColor = content.buttonBgColor || '#ffffff';
  const buttonTextColor = content.buttonTextColor || '#0891b2';

  if (isPreview) {
    return (
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ color: content.headlineColor }}
          >
            {content.headline}
          </h2>
          <p 
            className="text-xl mb-8"
            style={{ color: content.descriptionColor || '#cffafe' }}
          >
            {content.description}
          </p>
          <button 
            className="px-8 py-4 font-semibold rounded-lg hover:opacity-90 transition-colors shadow-lg"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {content.buttonText}
          </button>
          <p 
            className="mt-4 text-sm"
            style={{ color: content.noteColor || '#a5f3fc' }}
          >
            {content.note}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <EditableText
          as="h2"
          value={content.headline}
          onChange={(v) => updateField('headline', v)}
          color={content.headlineColor}
          onColorChange={(c) => updateField('headlineColor', c)}
          className="text-4xl font-bold mb-4"
        />
        <EditableText
          as="p"
          value={content.description}
          onChange={(v) => updateField('description', v)}
          color={content.descriptionColor || '#cffafe'}
          onColorChange={(c) => updateField('descriptionColor', c)}
          className="text-xl mb-8 block"
        />
        <button 
          className="px-8 py-4 font-semibold rounded-lg hover:opacity-90 transition-colors shadow-lg"
          style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
        >
          <EditableText
            value={content.buttonText}
            onChange={(v) => updateField('buttonText', v)}
            color={buttonTextColor}
            onColorChange={(c) => updateField('buttonTextColor', c)}
          />
        </button>
        <EditableText
          as="p"
          value={content.note}
          onChange={(v) => updateField('note', v)}
          color={content.noteColor || '#a5f3fc'}
          onColorChange={(c) => updateField('noteColor', c)}
          className="mt-4 text-sm block"
        />
        <div className="mt-4 flex gap-2 justify-center">
          <div className="flex items-center gap-2 text-xs text-cyan-200">
            <span>Button:</span>
            <input
              type="color"
              value={buttonBgColor}
              onChange={(e) => updateField('buttonBgColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0"
              title="Button background color"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';

interface HeroBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const HeroBlock = ({ block, onUpdate, isPreview }: HeroBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const buttonBgColor = content.buttonBgColor || '#06b6d4';
  const buttonTextColor = content.buttonTextColor || '#0f172a';
  const secondaryButtonBorderColor = content.secondaryButtonBorderColor || '#64748b';
  const secondaryButtonTextColor = content.secondaryButtonTextColor || '#e2e8f0';

  if (isPreview) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: content.headlineColor }}
          >
            {content.headline}
          </h1>
          <p 
            className="text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: content.subheadlineColor || '#cbd5e1' }}
          >
            {content.subheadline}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              className="px-8 py-3 font-semibold rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              {content.buttonText}
            </button>
            <button 
              className="px-8 py-3 border font-semibold rounded-lg transition-colors hover:opacity-80"
              style={{ borderColor: secondaryButtonBorderColor, color: secondaryButtonTextColor }}
            >
              {content.buttonSecondary}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <EditableText
          as="h1"
          value={content.headline}
          onChange={(v) => updateField('headline', v)}
          color={content.headlineColor}
          onColorChange={(c) => updateField('headlineColor', c)}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        />
        <EditableText
          as="p"
          value={content.subheadline}
          onChange={(v) => updateField('subheadline', v)}
          color={content.subheadlineColor || '#cbd5e1'}
          onColorChange={(c) => updateField('subheadlineColor', c)}
          className="text-xl mb-10 max-w-2xl mx-auto block"
        />
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            className="px-8 py-3 font-semibold rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            <EditableText
              value={content.buttonText}
              onChange={(v) => updateField('buttonText', v)}
              color={buttonTextColor}
              onColorChange={(c) => {
                updateField('buttonTextColor', c);
              }}
            />
          </button>
          <button 
            className="px-8 py-3 border font-semibold rounded-lg transition-colors hover:opacity-80"
            style={{ borderColor: secondaryButtonBorderColor, color: secondaryButtonTextColor }}
          >
            <EditableText
              value={content.buttonSecondary}
              onChange={(v) => updateField('buttonSecondary', v)}
              color={secondaryButtonTextColor}
              onColorChange={(c) => updateField('secondaryButtonTextColor', c)}
            />
          </button>
        </div>
        <div className="mt-6 flex gap-2 justify-center">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Primary Button:</span>
            <input
              type="color"
              value={buttonBgColor}
              onChange={(e) => updateField('buttonBgColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0"
              title="Button background color"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Secondary Border:</span>
            <input
              type="color"
              value={secondaryButtonBorderColor}
              onChange={(e) => updateField('secondaryButtonBorderColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0"
              title="Secondary button border color"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

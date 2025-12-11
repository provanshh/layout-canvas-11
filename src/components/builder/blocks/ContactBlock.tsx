import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';

export const ContactBlock = ({ 
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
    <div className="py-16 px-6 bg-slate-100">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <EditableText
            as="h2"
            value={content.title}
            onChange={(v) => updateField('title', v)}
            className="text-3xl font-bold text-slate-900 mb-2"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-title`}
          />
          <EditableText
            as="p"
            value={content.subtitle}
            onChange={(v) => updateField('subtitle', v)}
            className="text-slate-600 block"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-subtitle`}
          />
        </div>
        <form className="space-y-4 bg-white p-8 rounded-2xl shadow-sm">
          <div>
            <input
              type="text"
              placeholder={content.namePlaceholder}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={isPreview}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder={content.emailPlaceholder}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={isPreview}
            />
          </div>
          <div>
            <textarea
              rows={4}
              placeholder={content.messagePlaceholder}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              disabled={isPreview}
            />
          </div>
          <EditableButton
            text={content.buttonText || 'Send Message'}
            bgColor={content.buttonColor || '#0891b2'}
            textColor={content.buttonTextColor || '#ffffff'}
            link={content.buttonLink || '#'}
            className="w-full py-3 rounded-lg font-semibold"
            isPreview={isPreview}
            onEditButton={onEditButton}
            buttonId={`${block.id}-submit-btn`}
            onTextChange={(v) => updateField('buttonText', v)}
            onBgColorChange={(v) => updateField('buttonColor', v)}
            onTextColorChange={(v) => updateField('buttonTextColor', v)}
            onLinkChange={(v) => updateField('buttonLink', v)}
          />
        </form>
      </div>
    </div>
  );
};
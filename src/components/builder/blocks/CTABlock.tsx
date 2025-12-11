import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';

export const CTABlock = ({ block, onUpdate, isPreview, onEditButton, onEditText }: BaseBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const buttonConfig = {
    text: content.buttonText,
    bgColor: content.buttonBgColor || '#ffffff',
    textColor: content.buttonTextColor || '#0891b2',
    paddingX: parseInt(content.buttonPaddingX || '32'),
    paddingY: parseInt(content.buttonPaddingY || '16'),
    borderRadius: parseInt(content.buttonBorderRadius || '8'),
    link: content.buttonLink || '',
    openInNewTab: content.buttonOpenInNewTab === 'true',
  };

  if (isPreview) {
    const buttonStyle: React.CSSProperties = {
      backgroundColor: buttonConfig.bgColor,
      color: buttonConfig.textColor,
      paddingLeft: `${buttonConfig.paddingX}px`,
      paddingRight: `${buttonConfig.paddingX}px`,
      paddingTop: `${buttonConfig.paddingY}px`,
      paddingBottom: `${buttonConfig.paddingY}px`,
      borderRadius: `${buttonConfig.borderRadius}px`,
    };

    const button = (
      <button 
        className="font-semibold hover:opacity-90 transition-colors shadow-lg"
        style={buttonStyle}
      >
        {buttonConfig.text}
      </button>
    );

    return (
      <div className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
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
          {buttonConfig.link ? (
            <a
              href={buttonConfig.link}
              target={buttonConfig.openInNewTab ? '_blank' : '_self'}
              rel={buttonConfig.openInNewTab ? 'noopener noreferrer' : undefined}
            >
              {button}
            </a>
          ) : button}
          <p 
            className="mt-4 text-sm"
            style={{ color: content.noteColor || '#a5f3fc' }}
          >
            {content.note}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <EditableText
          as="h2"
          value={content.headline}
          onChange={(v) => updateField('headline', v)}
          color={content.headlineColor}
          onColorChange={(c) => updateField('headlineColor', c)}
          className="text-4xl font-bold mb-4"
          onEditText={onEditText}
          textId={`${block.id}-headline`}
        />
        <EditableText
          as="p"
          value={content.description}
          onChange={(v) => updateField('description', v)}
          color={content.descriptionColor || '#cffafe'}
          onColorChange={(c) => updateField('descriptionColor', c)}
          className="text-xl mb-8 block"
          onEditText={onEditText}
          textId={`${block.id}-description`}
          isMultiline
        />
        <EditableButton
          text={buttonConfig.text}
          bgColor={buttonConfig.bgColor}
          textColor={buttonConfig.textColor}
          paddingX={buttonConfig.paddingX}
          paddingY={buttonConfig.paddingY}
          borderRadius={buttonConfig.borderRadius}
          link={buttonConfig.link}
          openInNewTab={buttonConfig.openInNewTab}
          isPreview={isPreview}
          onEditButton={onEditButton}
          buttonId={`${block.id}-cta`}
          className="shadow-lg"
          onTextChange={(v) => updateField('buttonText', v)}
          onBgColorChange={(v) => updateField('buttonBgColor', v)}
          onTextColorChange={(v) => updateField('buttonTextColor', v)}
          onPaddingXChange={(v) => updateField('buttonPaddingX', v.toString())}
          onPaddingYChange={(v) => updateField('buttonPaddingY', v.toString())}
          onBorderRadiusChange={(v) => updateField('buttonBorderRadius', v.toString())}
          onLinkChange={(v) => updateField('buttonLink', v)}
          onOpenInNewTabChange={(v) => updateField('buttonOpenInNewTab', v.toString())}
        />
        <EditableText
          as="p"
          value={content.note}
          onChange={(v) => updateField('note', v)}
          color={content.noteColor || '#a5f3fc'}
          onColorChange={(c) => updateField('noteColor', c)}
          className="mt-4 text-sm block"
          onEditText={onEditText}
          textId={`${block.id}-note`}
        />
      </div>
    </div>
  );
};
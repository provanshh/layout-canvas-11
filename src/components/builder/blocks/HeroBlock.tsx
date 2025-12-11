import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';

export const HeroBlock = ({ block, onUpdate, isPreview, onEditButton, onEditText }: BaseBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const primaryBtn = {
    text: content.buttonText,
    bgColor: content.buttonBgColor || '#06b6d4',
    textColor: content.buttonTextColor || '#0f172a',
    paddingX: parseInt(content.buttonPaddingX || '32'),
    paddingY: parseInt(content.buttonPaddingY || '12'),
    borderRadius: parseInt(content.buttonBorderRadius || '8'),
    link: content.buttonLink || '',
    openInNewTab: content.buttonOpenInNewTab === 'true',
  };

  const secondaryBtn = {
    text: content.buttonSecondary,
    bgColor: content.secondaryButtonBgColor || 'transparent',
    textColor: content.secondaryButtonTextColor || '#e2e8f0',
    borderColor: content.secondaryButtonBorderColor || '#64748b',
    paddingX: parseInt(content.secondaryButtonPaddingX || '32'),
    paddingY: parseInt(content.secondaryButtonPaddingY || '12'),
    borderRadius: parseInt(content.secondaryButtonBorderRadius || '8'),
    link: content.secondaryButtonLink || '',
    openInNewTab: content.secondaryButtonOpenInNewTab === 'true',
  };

  if (isPreview) {
    const renderButton = (btn: typeof primaryBtn, isSecondary = false) => {
      const style: React.CSSProperties = {
        backgroundColor: btn.bgColor,
        color: btn.textColor,
        paddingLeft: `${btn.paddingX}px`,
        paddingRight: `${btn.paddingX}px`,
        paddingTop: `${btn.paddingY}px`,
        paddingBottom: `${btn.paddingY}px`,
        borderRadius: `${btn.borderRadius}px`,
        ...(isSecondary && { border: `1px solid ${secondaryBtn.borderColor}` }),
      };

      const button = (
        <button className="font-semibold transition-colors hover:opacity-90" style={style}>
          {btn.text}
        </button>
      );

      if (btn.link) {
        return (
          <a
            href={btn.link}
            target={btn.openInNewTab ? '_blank' : '_self'}
            rel={btn.openInNewTab ? 'noopener noreferrer' : undefined}
          >
            {button}
          </a>
        );
      }
      return button;
    };

    return (
      <div className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
            {renderButton(primaryBtn)}
            {renderButton(secondaryBtn as any, true)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <EditableText
          as="h1"
          value={content.headline}
          onChange={(v) => updateField('headline', v)}
          color={content.headlineColor}
          onColorChange={(c) => updateField('headlineColor', c)}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          onEditText={onEditText}
          textId={`${block.id}-headline`}
        />
        <EditableText
          as="p"
          value={content.subheadline}
          onChange={(v) => updateField('subheadline', v)}
          color={content.subheadlineColor || '#cbd5e1'}
          onColorChange={(c) => updateField('subheadlineColor', c)}
          className="text-xl mb-10 max-w-2xl mx-auto block"
          onEditText={onEditText}
          textId={`${block.id}-subheadline`}
          isMultiline
        />
        <div className="flex gap-4 justify-center flex-wrap">
          <EditableButton
            text={primaryBtn.text}
            bgColor={primaryBtn.bgColor}
            textColor={primaryBtn.textColor}
            paddingX={primaryBtn.paddingX}
            paddingY={primaryBtn.paddingY}
            borderRadius={primaryBtn.borderRadius}
            link={primaryBtn.link}
            openInNewTab={primaryBtn.openInNewTab}
            isPreview={isPreview}
            onEditButton={onEditButton}
            buttonId={`${block.id}-primary`}
            onTextChange={(v) => updateField('buttonText', v)}
            onBgColorChange={(v) => updateField('buttonBgColor', v)}
            onTextColorChange={(v) => updateField('buttonTextColor', v)}
            onPaddingXChange={(v) => updateField('buttonPaddingX', v.toString())}
            onPaddingYChange={(v) => updateField('buttonPaddingY', v.toString())}
            onBorderRadiusChange={(v) => updateField('buttonBorderRadius', v.toString())}
            onLinkChange={(v) => updateField('buttonLink', v)}
            onOpenInNewTabChange={(v) => updateField('buttonOpenInNewTab', v.toString())}
          />
          <EditableButton
            text={secondaryBtn.text}
            bgColor={secondaryBtn.bgColor}
            textColor={secondaryBtn.textColor}
            paddingX={secondaryBtn.paddingX}
            paddingY={secondaryBtn.paddingY}
            borderRadius={secondaryBtn.borderRadius}
            link={secondaryBtn.link}
            openInNewTab={secondaryBtn.openInNewTab}
            isPreview={isPreview}
            onEditButton={onEditButton}
            buttonId={`${block.id}-secondary`}
            className="border"
            onTextChange={(v) => updateField('buttonSecondary', v)}
            onBgColorChange={(v) => updateField('secondaryButtonBgColor', v)}
            onTextColorChange={(v) => updateField('secondaryButtonTextColor', v)}
            onPaddingXChange={(v) => updateField('secondaryButtonPaddingX', v.toString())}
            onPaddingYChange={(v) => updateField('secondaryButtonPaddingY', v.toString())}
            onBorderRadiusChange={(v) => updateField('secondaryButtonBorderRadius', v.toString())}
            onLinkChange={(v) => updateField('secondaryButtonLink', v)}
            onOpenInNewTabChange={(v) => updateField('secondaryButtonOpenInNewTab', v.toString())}
          />
        </div>
      </div>
    </div>
  );
};
import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';

interface HeroBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
  onEditButton?: (buttonId: string, config: {
    text: string;
    bgColor: string;
    textColor: string;
    paddingX: number;
    paddingY: number;
    borderRadius: number;
    link: string;
    openInNewTab: boolean;
  }) => void;
}

export const HeroBlock = ({ block, onUpdate, isPreview, onEditButton }: HeroBlockProps) => {
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

  const handlePrimaryClick = () => {
    if (onEditButton) {
      onEditButton(`${block.id}-primary`, {
        ...primaryBtn,
        onTextChange: (v: string) => updateField('buttonText', v),
        onBgColorChange: (v: string) => updateField('buttonBgColor', v),
        onTextColorChange: (v: string) => updateField('buttonTextColor', v),
        onPaddingXChange: (v: number) => updateField('buttonPaddingX', v.toString()),
        onPaddingYChange: (v: number) => updateField('buttonPaddingY', v.toString()),
        onBorderRadiusChange: (v: number) => updateField('buttonBorderRadius', v.toString()),
        onLinkChange: (v: string) => updateField('buttonLink', v),
        onOpenInNewTabChange: (v: boolean) => updateField('buttonOpenInNewTab', v.toString()),
      } as any);
    }
  };

  const handleSecondaryClick = () => {
    if (onEditButton) {
      onEditButton(`${block.id}-secondary`, {
        text: secondaryBtn.text,
        bgColor: secondaryBtn.bgColor,
        textColor: secondaryBtn.textColor,
        paddingX: secondaryBtn.paddingX,
        paddingY: secondaryBtn.paddingY,
        borderRadius: secondaryBtn.borderRadius,
        link: secondaryBtn.link,
        openInNewTab: secondaryBtn.openInNewTab,
        onTextChange: (v: string) => updateField('buttonSecondary', v),
        onBgColorChange: (v: string) => updateField('secondaryButtonBgColor', v),
        onTextColorChange: (v: string) => updateField('secondaryButtonTextColor', v),
        onPaddingXChange: (v: number) => updateField('secondaryButtonPaddingX', v.toString()),
        onPaddingYChange: (v: number) => updateField('secondaryButtonPaddingY', v.toString()),
        onBorderRadiusChange: (v: number) => updateField('secondaryButtonBorderRadius', v.toString()),
        onLinkChange: (v: string) => updateField('secondaryButtonLink', v),
        onOpenInNewTabChange: (v: boolean) => updateField('secondaryButtonOpenInNewTab', v.toString()),
      } as any);
    }
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
            {renderButton(primaryBtn)}
            {renderButton(secondaryBtn as any, true)}
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
          <EditableButton
            text={primaryBtn.text}
            bgColor={primaryBtn.bgColor}
            textColor={primaryBtn.textColor}
            paddingX={primaryBtn.paddingX}
            paddingY={primaryBtn.paddingY}
            borderRadius={primaryBtn.borderRadius}
            onClick={handlePrimaryClick}
          />
          <button
            onClick={handleSecondaryClick}
            className="font-semibold transition-all hover:opacity-80 cursor-pointer ring-2 ring-transparent hover:ring-primary/30"
            style={{
              backgroundColor: secondaryBtn.bgColor,
              color: secondaryBtn.textColor,
              border: `1px solid ${secondaryBtn.borderColor}`,
              paddingLeft: `${secondaryBtn.paddingX}px`,
              paddingRight: `${secondaryBtn.paddingX}px`,
              paddingTop: `${secondaryBtn.paddingY}px`,
              paddingBottom: `${secondaryBtn.paddingY}px`,
              borderRadius: `${secondaryBtn.borderRadius}px`,
            }}
            title="Click to edit button"
          >
            {secondaryBtn.text}
          </button>
        </div>
      </div>
    </section>
  );
};

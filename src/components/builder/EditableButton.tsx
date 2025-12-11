import { ButtonEditConfig } from './types';

interface EditableButtonProps {
  text: string;
  bgColor: string;
  textColor: string;
  paddingX?: number;
  paddingY?: number;
  borderRadius?: number;
  link?: string;
  openInNewTab?: boolean;
  isPreview?: boolean;
  className?: string;
  buttonId?: string;
  onEditButton?: (buttonId: string, config: ButtonEditConfig) => void;
  onTextChange?: (v: string) => void;
  onBgColorChange?: (v: string) => void;
  onTextColorChange?: (v: string) => void;
  onLinkChange?: (v: string) => void;
  onOpenInNewTabChange?: (v: boolean) => void;
  onPaddingXChange?: (v: number) => void;
  onPaddingYChange?: (v: number) => void;
  onBorderRadiusChange?: (v: number) => void;
}

export const EditableButton = ({
  text,
  bgColor,
  textColor,
  paddingX = 32,
  paddingY = 12,
  borderRadius = 8,
  link = '',
  openInNewTab = false,
  isPreview = false,
  className = '',
  buttonId,
  onEditButton,
  onTextChange,
  onBgColorChange,
  onTextColorChange,
  onLinkChange,
  onOpenInNewTabChange,
  onPaddingXChange,
  onPaddingYChange,
  onBorderRadiusChange,
}: EditableButtonProps) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: textColor,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    borderRadius: `${borderRadius}px`,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onEditButton && buttonId) {
      const config: ButtonEditConfig = {
        text,
        bgColor,
        textColor,
        paddingX,
        paddingY,
        borderRadius,
        link,
        openInNewTab,
        onTextChange: onTextChange || (() => {}),
        onBgColorChange: onBgColorChange || (() => {}),
        onTextColorChange: onTextColorChange || (() => {}),
        onPaddingXChange: onPaddingXChange || (() => {}),
        onPaddingYChange: onPaddingYChange || (() => {}),
        onBorderRadiusChange: onBorderRadiusChange || (() => {}),
        onLinkChange: onLinkChange || (() => {}),
        onOpenInNewTabChange: onOpenInNewTabChange || (() => {}),
      };
      onEditButton(buttonId, config);
    }
  };

  const buttonContent = (
    <button
      onClick={!isPreview ? handleClick : undefined}
      style={buttonStyle}
      className={`font-semibold transition-all hover:opacity-90 ${!isPreview ? 'cursor-pointer ring-2 ring-transparent hover:ring-primary/30' : ''} ${className}`}
      title={!isPreview ? 'Click to edit button' : undefined}
    >
      {text}
    </button>
  );

  if (isPreview && link) {
    return (
      <a
        href={link}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};
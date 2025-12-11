import { useState } from 'react';

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
  onClick?: () => void;
  className?: string;
}

export const EditableButton = ({
  text,
  bgColor,
  textColor,
  paddingX = 32,
  paddingY = 12,
  borderRadius = 8,
  link,
  openInNewTab = false,
  isPreview = false,
  onClick,
  className = '',
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

  const buttonContent = (
    <button
      onClick={onClick}
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
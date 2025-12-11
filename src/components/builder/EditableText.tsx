import { TextEditConfig } from './types';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  isPreview?: boolean;
  enableLink?: boolean;
  link?: string;
  onLinkChange?: (link: string, openInNewTab: boolean) => void;
  openInNewTab?: boolean;
  enableColor?: boolean;
  color?: string;
  onColorChange?: (color: string) => void;
  enableFontStyle?: boolean;
  fontStyle?: string;
  onFontStyleChange?: (style: string) => void;
  onEditText?: (textId: string, config: TextEditConfig) => void;
  textId?: string;
  isMultiline?: boolean;
}

export const EditableText = ({ 
  value, 
  onChange,
  onRemove,
  className = '', 
  as: Component = 'span',
  isPreview = false,
  enableLink = true,
  link,
  onLinkChange,
  openInNewTab = false,
  enableColor = true,
  color,
  onColorChange,
  enableFontStyle = true,
  fontStyle,
  onFontStyleChange,
  onEditText,
  textId,
  isMultiline = false,
}: EditableTextProps) => {
  // Build inline styles based on props
  const getInlineStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    if (color) styles.color = color;
    if (fontStyle?.includes('bold')) styles.fontWeight = 'bold';
    if (fontStyle?.includes('italic')) styles.fontStyle = 'italic';
    if (fontStyle?.includes('underline')) styles.textDecoration = 'underline';
    return styles;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onEditText && textId) {
      const config: TextEditConfig = {
        text: value,
        onTextChange: onChange,
        color: color || '',
        onColorChange: onColorChange || (() => {}),
        link: link || '',
        onLinkChange: (newLink: string) => onLinkChange?.(newLink, openInNewTab),
        openInNewTab: openInNewTab,
        onOpenInNewTabChange: (newTab: boolean) => onLinkChange?.(link || '', newTab),
        fontStyle: fontStyle || '',
        onFontStyleChange: onFontStyleChange || (() => {}),
        isMultiline,
      };
      onEditText(textId, config);
    }
  };

  // In preview mode, just render the text without editing capability
  if (isPreview) {
    const content = (
      <Component className={className} style={getInlineStyles()}>
        {value}
      </Component>
    );

    if (link) {
      return (
        <a 
          href={link} 
          target={openInNewTab ? '_blank' : '_self'} 
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          className="hover:underline"
        >
          {content}
        </a>
      );
    }

    return content;
  }

  return (
    <Component
      onClick={handleClick}
      className={`cursor-pointer hover:bg-primary/10 hover:outline hover:outline-2 hover:outline-primary/30 rounded px-1 -mx-1 transition-all ${className}`}
      style={getInlineStyles()}
      title="Click to edit"
    >
      {value}
    </Component>
  );
};

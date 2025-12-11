import { useState, useRef, useEffect } from 'react';
import { TextEditPopover } from './TextEditPopover';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
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
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onChange(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopoverOpen(true);
  };

  const handleClick = () => {
    if (!isPopoverOpen) {
      setIsEditing(true);
    }
  };

  // Build inline styles based on props
  const getInlineStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    if (color) styles.color = color;
    if (fontStyle === 'bold') styles.fontWeight = 'bold';
    if (fontStyle === 'italic') styles.fontStyle = 'italic';
    if (fontStyle === 'underline') styles.textDecoration = 'underline';
    return styles;
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

  if (isEditing && !isPopoverOpen) {
    return (
      <Component className={className} style={{ ...getInlineStyles(), position: 'relative' }}>
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="editable-text absolute inset-0 w-full h-full bg-transparent border-none outline-none"
          style={{ ...getInlineStyles(), font: 'inherit', padding: 0, margin: 0 }}
        />
        <span className="invisible">{editValue || ' '}</span>
      </Component>
    );
  }

  return (
    <TextEditPopover
      value={value}
      onChange={onChange}
      onRemove={onRemove}
      link={link}
      onLinkChange={enableLink ? onLinkChange : undefined}
      openInNewTab={openInNewTab}
      color={color}
      onColorChange={enableColor ? onColorChange : undefined}
      fontStyle={fontStyle}
      onFontStyleChange={enableFontStyle ? onFontStyleChange : undefined}
      isOpen={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      isPreview={isPreview}
    >
      <Component
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={`cursor-text hover:bg-primary/10 rounded px-1 -mx-1 transition-colors ${className}`}
        style={getInlineStyles()}
        title="Click to edit, double-click for more options"
      >
        {value}
      </Component>
    </TextEditPopover>
  );
};

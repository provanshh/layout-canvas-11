import { ComponentBlock } from '@/types/builder';

// Button edit config for right panel editing
export interface ButtonEditConfig {
  text: string;
  bgColor: string;
  textColor: string;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
  link: string;
  openInNewTab: boolean;
  onTextChange: (v: string) => void;
  onBgColorChange: (v: string) => void;
  onTextColorChange: (v: string) => void;
  onPaddingXChange: (v: number) => void;
  onPaddingYChange: (v: number) => void;
  onBorderRadiusChange: (v: number) => void;
  onLinkChange: (v: string) => void;
  onOpenInNewTabChange: (v: boolean) => void;
}

// Text edit config for right panel editing
export interface TextEditConfig {
  text: string;
  color?: string;
  link?: string;
  openInNewTab?: boolean;
  fontStyle?: string;
  isMultiline?: boolean;
  onTextChange: (v: string) => void;
  onColorChange?: (v: string) => void;
  onLinkChange?: (v: string) => void;
  onOpenInNewTabChange?: (v: boolean) => void;
  onFontStyleChange?: (v: string) => void;
}

// Image edit config for right panel editing
export interface ImageEditConfig {
  imageUrl: string;
  alt?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  borderRadius?: number;
  onImageUrlChange: (v: string) => void;
  onAltChange?: (v: string) => void;
  onOverlayColorChange?: (v: string) => void;
  onOverlayOpacityChange?: (v: number) => void;
  onBorderRadiusChange?: (v: number) => void;
}

// Common props for all block components
export interface BaseBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
  isDarkTheme?: boolean;
  onToggleTheme?: () => void;
  onEditButton?: (buttonId: string, config: ButtonEditConfig) => void;
  onEditText?: (textId: string, config: TextEditConfig) => void;
  onEditImage?: (imageId: string, config: ImageEditConfig) => void;
}
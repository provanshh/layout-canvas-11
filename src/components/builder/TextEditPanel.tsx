import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { X, Type, Palette, Link, ExternalLink, Bold, Italic, Underline } from 'lucide-react';

interface TextEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onTextChange: (text: string) => void;
  color?: string;
  onColorChange?: (color: string) => void;
  link?: string;
  onLinkChange?: (link: string) => void;
  openInNewTab?: boolean;
  onOpenInNewTabChange?: (value: boolean) => void;
  fontStyle?: string;
  onFontStyleChange?: (style: string) => void;
  isMultiline?: boolean;
}

const colorPresets = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', 
  '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4',
  '#0891b2', '#10b981', '#6366f1', '#d946ef', '#f43f5e'
];

export const TextEditPanel = ({
  isOpen,
  onClose,
  text,
  onTextChange,
  color = '#000000',
  onColorChange,
  link = '',
  onLinkChange,
  openInNewTab = false,
  onOpenInNewTabChange,
  fontStyle = 'normal',
  onFontStyleChange,
  isMultiline = false,
}: TextEditPanelProps) => {
  const [localText, setLocalText] = useState(text);
  const [localColor, setLocalColor] = useState(color);
  const [localLink, setLocalLink] = useState(link);
  const [localNewTab, setLocalNewTab] = useState(openInNewTab);
  const [localFontStyle, setLocalFontStyle] = useState(fontStyle);

  useEffect(() => {
    setLocalText(text);
    setLocalColor(color);
    setLocalLink(link);
    setLocalNewTab(openInNewTab);
    setLocalFontStyle(fontStyle);
  }, [text, color, link, openInNewTab, fontStyle]);

  const handleSave = () => {
    onTextChange(localText);
    if (onColorChange) onColorChange(localColor);
    if (onLinkChange) onLinkChange(localLink);
    if (onOpenInNewTabChange) onOpenInNewTabChange(localNewTab);
    if (onFontStyleChange) onFontStyleChange(localFontStyle);
    onClose();
  };

  const toggleFontStyle = (style: string) => {
    setLocalFontStyle(localFontStyle === style ? 'normal' : style);
  };

  if (!isOpen) return null;

  return (
    <div className="w-[280px] bg-card border-l border-border flex flex-col h-full">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="font-medium text-sm">Edit Text</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary rounded transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Text Content */}
        <div className="space-y-2">
          <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
            <Type className="w-3 h-3" />
            Text Content
          </Label>
          {isMultiline ? (
            <Textarea
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              className="text-sm min-h-[100px]"
              placeholder="Enter text..."
            />
          ) : (
            <Input
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              className="h-8 text-sm"
              placeholder="Enter text..."
            />
          )}
        </div>

        {/* Font Style */}
        {onFontStyleChange && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Font Style</Label>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFontStyle('bold')}
                className={`p-2 rounded-md border transition-all ${
                  localFontStyle === 'bold'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFontStyle('italic')}
                className={`p-2 rounded-md border transition-all ${
                  localFontStyle === 'italic'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFontStyle('underline')}
                className={`p-2 rounded-md border transition-all ${
                  localFontStyle === 'underline'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                <Underline className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Text Color */}
        {onColorChange && (
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
              <Palette className="w-3 h-3" />
              Text Color
            </Label>
            <div className="flex gap-1.5 flex-wrap">
              {colorPresets.slice(0, 10).map((c) => (
                <button
                  key={c}
                  onClick={() => setLocalColor(c)}
                  className={`w-6 h-6 rounded-md border-2 transition-all ${
                    localColor === c ? 'border-primary scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <Input
                type="color"
                value={localColor}
                onChange={(e) => setLocalColor(e.target.value)}
                className="w-6 h-6 p-0 border-0 cursor-pointer rounded-md"
              />
            </div>
          </div>
        )}

        {/* Link */}
        {onLinkChange && (
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
              <Link className="w-3 h-3" />
              Link URL
            </Label>
            <Input
              value={localLink}
              onChange={(e) => setLocalLink(e.target.value)}
              className="h-8 text-sm"
              placeholder="https://..."
            />
            {onOpenInNewTabChange && (
              <div className="flex items-center justify-between pt-1">
                <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
                  <ExternalLink className="w-3 h-3" />
                  Open in new tab
                </Label>
                <Switch
                  checked={localNewTab}
                  onCheckedChange={setLocalNewTab}
                  className="scale-75"
                />
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        <div className="space-y-2 pt-2 border-t border-border">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="p-4 bg-muted/30 rounded-lg">
            <span
              style={{
                color: localColor,
                fontWeight: localFontStyle === 'bold' ? 'bold' : 'normal',
                fontStyle: localFontStyle === 'italic' ? 'italic' : 'normal',
                textDecoration: localFontStyle === 'underline' ? 'underline' : 'none',
              }}
            >
              {localText || 'Preview text'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-border flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="flex-1 h-8 text-xs"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSave}
          className="flex-1 h-8 text-xs"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
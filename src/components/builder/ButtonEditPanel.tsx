import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { X, Type, Palette, Link, ExternalLink, Maximize2 } from 'lucide-react';

interface ButtonEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText: string;
  onTextChange: (text: string) => void;
  bgColor: string;
  onBgColorChange: (color: string) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  link?: string;
  onLinkChange?: (link: string) => void;
  openInNewTab?: boolean;
  onOpenInNewTabChange?: (value: boolean) => void;
  paddingX?: number;
  onPaddingXChange?: (value: number) => void;
  paddingY?: number;
  onPaddingYChange?: (value: number) => void;
  borderRadius?: number;
  onBorderRadiusChange?: (value: number) => void;
}

const colorPresets = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', 
  '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4',
  '#0891b2', '#10b981', '#6366f1', '#d946ef', '#f43f5e'
];

export const ButtonEditPanel = ({
  isOpen,
  onClose,
  buttonText,
  onTextChange,
  bgColor,
  onBgColorChange,
  textColor,
  onTextColorChange,
  link = '',
  onLinkChange,
  openInNewTab = false,
  onOpenInNewTabChange,
  paddingX = 32,
  onPaddingXChange,
  paddingY = 12,
  onPaddingYChange,
  borderRadius = 8,
  onBorderRadiusChange,
}: ButtonEditPanelProps) => {
  const [localText, setLocalText] = useState(buttonText);
  const [localLink, setLocalLink] = useState(link);
  const [localNewTab, setLocalNewTab] = useState(openInNewTab);
  const [localBgColor, setLocalBgColor] = useState(bgColor);
  const [localTextColor, setLocalTextColor] = useState(textColor);
  const [localPaddingX, setLocalPaddingX] = useState(paddingX);
  const [localPaddingY, setLocalPaddingY] = useState(paddingY);
  const [localBorderRadius, setLocalBorderRadius] = useState(borderRadius);

  useEffect(() => {
    setLocalText(buttonText);
    setLocalLink(link);
    setLocalNewTab(openInNewTab);
    setLocalBgColor(bgColor);
    setLocalTextColor(textColor);
    setLocalPaddingX(paddingX);
    setLocalPaddingY(paddingY);
    setLocalBorderRadius(borderRadius);
  }, [buttonText, link, openInNewTab, bgColor, textColor, paddingX, paddingY, borderRadius]);

  const handleSave = () => {
    onTextChange(localText);
    onBgColorChange(localBgColor);
    onTextColorChange(localTextColor);
    if (onLinkChange) onLinkChange(localLink);
    if (onOpenInNewTabChange) onOpenInNewTabChange(localNewTab);
    if (onPaddingXChange) onPaddingXChange(localPaddingX);
    if (onPaddingYChange) onPaddingYChange(localPaddingY);
    if (onBorderRadiusChange) onBorderRadiusChange(localBorderRadius);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-[280px] bg-card border-l border-border flex flex-col h-full">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="font-medium text-sm">Edit Button</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary rounded transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Button Text */}
        <div className="space-y-2">
          <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
            <Type className="w-3 h-3" />
            Button Text
          </Label>
          <Input
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            className="h-8 text-sm"
            placeholder="Button text..."
          />
        </div>

        {/* Background Color */}
        <div className="space-y-2">
          <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
            <Palette className="w-3 h-3" />
            Background Color
          </Label>
          <div className="flex gap-1.5 flex-wrap">
            {colorPresets.slice(0, 10).map((c) => (
              <button
                key={c}
                onClick={() => setLocalBgColor(c)}
                className={`w-6 h-6 rounded-md border-2 transition-all ${
                  localBgColor === c ? 'border-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
            <Input
              type="color"
              value={localBgColor}
              onChange={(e) => setLocalBgColor(e.target.value)}
              className="w-6 h-6 p-0 border-0 cursor-pointer rounded-md"
            />
          </div>
        </div>

        {/* Text Color */}
        <div className="space-y-2">
          <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
            <Type className="w-3 h-3" />
            Text Color
          </Label>
          <div className="flex gap-1.5 flex-wrap">
            {colorPresets.slice(0, 10).map((c) => (
              <button
                key={c}
                onClick={() => setLocalTextColor(c)}
                className={`w-6 h-6 rounded-md border-2 transition-all ${
                  localTextColor === c ? 'border-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
            <Input
              type="color"
              value={localTextColor}
              onChange={(e) => setLocalTextColor(e.target.value)}
              className="w-6 h-6 p-0 border-0 cursor-pointer rounded-md"
            />
          </div>
        </div>

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

        {/* Padding */}
        {onPaddingXChange && onPaddingYChange && (
          <div className="space-y-3">
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
              <Maximize2 className="w-3 h-3" />
              Padding
            </Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Horizontal</span>
                <span className="text-xs font-medium">{localPaddingX}px</span>
              </div>
              <Slider
                value={[localPaddingX]}
                onValueChange={([v]) => setLocalPaddingX(v)}
                min={8}
                max={64}
                step={4}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Vertical</span>
                <span className="text-xs font-medium">{localPaddingY}px</span>
              </div>
              <Slider
                value={[localPaddingY]}
                onValueChange={([v]) => setLocalPaddingY(v)}
                min={4}
                max={32}
                step={2}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Border Radius */}
        {onBorderRadiusChange && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Border Radius</Label>
              <span className="text-xs font-medium">{localBorderRadius}px</span>
            </div>
            <Slider
              value={[localBorderRadius]}
              onValueChange={([v]) => setLocalBorderRadius(v)}
              min={0}
              max={24}
              step={2}
              className="w-full"
            />
          </div>
        )}

        {/* Preview */}
        <div className="space-y-2 pt-2 border-t border-border">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="p-4 bg-muted/30 rounded-lg flex justify-center">
            <button
              style={{
                backgroundColor: localBgColor,
                color: localTextColor,
                paddingLeft: `${localPaddingX}px`,
                paddingRight: `${localPaddingX}px`,
                paddingTop: `${localPaddingY}px`,
                paddingBottom: `${localPaddingY}px`,
                borderRadius: `${localBorderRadius}px`,
              }}
              className="font-semibold transition-opacity hover:opacity-90"
            >
              {localText}
            </button>
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
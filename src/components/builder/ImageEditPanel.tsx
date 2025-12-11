import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { X, Image, Link, Palette, Maximize2 } from 'lucide-react';

interface ImageEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  alt?: string;
  onAltChange?: (alt: string) => void;
  overlayColor?: string;
  onOverlayColorChange?: (color: string) => void;
  overlayOpacity?: number;
  onOverlayOpacityChange?: (opacity: number) => void;
  borderRadius?: number;
  onBorderRadiusChange?: (radius: number) => void;
}

const colorPresets = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', 
  '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4',
];

export const ImageEditPanel = ({
  isOpen,
  onClose,
  imageUrl,
  onImageUrlChange,
  alt = '',
  onAltChange,
  overlayColor = '#000000',
  onOverlayColorChange,
  overlayOpacity = 0,
  onOverlayOpacityChange,
  borderRadius = 0,
  onBorderRadiusChange,
}: ImageEditPanelProps) => {
  const [localUrl, setLocalUrl] = useState(imageUrl);
  const [localAlt, setLocalAlt] = useState(alt);
  const [localOverlayColor, setLocalOverlayColor] = useState(overlayColor);
  const [localOverlayOpacity, setLocalOverlayOpacity] = useState(overlayOpacity);
  const [localBorderRadius, setLocalBorderRadius] = useState(borderRadius);

  useEffect(() => {
    setLocalUrl(imageUrl);
    setLocalAlt(alt);
    setLocalOverlayColor(overlayColor);
    setLocalOverlayOpacity(overlayOpacity);
    setLocalBorderRadius(borderRadius);
  }, [imageUrl, alt, overlayColor, overlayOpacity, borderRadius]);

  const handleSave = () => {
    onImageUrlChange(localUrl);
    if (onAltChange) onAltChange(localAlt);
    if (onOverlayColorChange) onOverlayColorChange(localOverlayColor);
    if (onOverlayOpacityChange) onOverlayOpacityChange(localOverlayOpacity);
    if (onBorderRadiusChange) onBorderRadiusChange(localBorderRadius);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-[280px] bg-card border-l border-border flex flex-col h-full">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="font-medium text-sm">Edit Image</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary rounded transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Image URL */}
        <div className="space-y-2">
          <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
            <Link className="w-3 h-3" />
            Image URL
          </Label>
          <Input
            value={localUrl}
            onChange={(e) => setLocalUrl(e.target.value)}
            className="h-8 text-sm"
            placeholder="https://..."
          />
        </div>

        {/* Alt Text */}
        {onAltChange && (
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
              <Image className="w-3 h-3" />
              Alt Text
            </Label>
            <Input
              value={localAlt}
              onChange={(e) => setLocalAlt(e.target.value)}
              className="h-8 text-sm"
              placeholder="Image description..."
            />
          </div>
        )}

        {/* Overlay Color */}
        {onOverlayColorChange && (
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
              <Palette className="w-3 h-3" />
              Overlay Color
            </Label>
            <div className="flex gap-1.5 flex-wrap">
              {colorPresets.map((c) => (
                <button
                  key={c}
                  onClick={() => setLocalOverlayColor(c)}
                  className={`w-6 h-6 rounded-md border-2 transition-all ${
                    localOverlayColor === c ? 'border-primary scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <Input
                type="color"
                value={localOverlayColor}
                onChange={(e) => setLocalOverlayColor(e.target.value)}
                className="w-6 h-6 p-0 border-0 cursor-pointer rounded-md"
              />
            </div>
          </div>
        )}

        {/* Overlay Opacity */}
        {onOverlayOpacityChange && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Overlay Opacity</Label>
              <span className="text-xs font-medium">{localOverlayOpacity}%</span>
            </div>
            <Slider
              value={[localOverlayOpacity]}
              onValueChange={([v]) => setLocalOverlayOpacity(v)}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
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
              max={48}
              step={4}
              className="w-full"
            />
          </div>
        )}

        {/* Preview */}
        <div className="space-y-2 pt-2 border-t border-border">
          <Label className="text-xs text-muted-foreground">Preview</Label>
          <div className="relative overflow-hidden" style={{ borderRadius: `${localBorderRadius}px` }}>
            <img
              src={localUrl || '/placeholder.svg'}
              alt={localAlt}
              className="w-full h-32 object-cover"
            />
            {localOverlayOpacity > 0 && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: localOverlayColor,
                  opacity: localOverlayOpacity / 100,
                }}
              />
            )}
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
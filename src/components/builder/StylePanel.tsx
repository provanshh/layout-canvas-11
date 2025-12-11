import { ComponentBlock } from '@/types/builder';
import { X, Paintbrush, Type, Move } from 'lucide-react';

interface StylePanelProps {
  block: ComponentBlock | null;
  onUpdateStyles: (id: string, styles: Record<string, string>) => void;
  onClose: () => void;
}

const colorPresets = [
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Slate', value: '#64748b' },
];

const fontPresets = [
  { name: 'Default', value: 'inherit' },
  { name: 'Sans Serif', value: 'ui-sans-serif, system-ui, sans-serif' },
  { name: 'Serif', value: 'ui-serif, Georgia, serif' },
  { name: 'Mono', value: 'ui-monospace, monospace' },
];

const spacingPresets = [
  { name: 'Compact', value: 'compact' },
  { name: 'Normal', value: 'normal' },
  { name: 'Relaxed', value: 'relaxed' },
  { name: 'Spacious', value: 'spacious' },
];

export const StylePanel = ({ block, onUpdateStyles, onClose }: StylePanelProps) => {
  if (!block) return null;

  const styles = block.content;

  const handleStyleChange = (key: string, value: string) => {
    onUpdateStyles(block.id, { ...styles, [key]: value });
  };

  return (
    <div className="w-72 bg-card border-l border-border flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Style Panel</h3>
          <p className="text-xs text-muted-foreground capitalize">{block.type} Block</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Colors Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Paintbrush className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-foreground">Colors</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Background</label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleStyleChange('styleBgColor', color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      styles.styleBgColor === color.value
                        ? 'border-foreground scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <input
                type="text"
                value={styles.styleBgColor || ''}
                onChange={(e) => handleStyleChange('styleBgColor', e.target.value)}
                className="w-full mt-2 px-3 py-1.5 text-xs bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Custom color (hex/rgb)"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Text Color</label>
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={() => handleStyleChange('styleTextColor', '#ffffff')}
                  className={`w-8 h-8 rounded-lg border-2 transition-all bg-white ${
                    styles.styleTextColor === '#ffffff'
                      ? 'border-foreground scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  title="White"
                />
                <button
                  onClick={() => handleStyleChange('styleTextColor', '#000000')}
                  className={`w-8 h-8 rounded-lg border-2 transition-all bg-black ${
                    styles.styleTextColor === '#000000'
                      ? 'border-foreground scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title="Black"
                />
                {colorPresets.slice(0, 3).map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleStyleChange('styleTextColor', color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      styles.styleTextColor === color.value
                        ? 'border-foreground scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Accent Color</label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleStyleChange('styleAccentColor', color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      styles.styleAccentColor === color.value
                        ? 'border-foreground scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-foreground">Typography</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Font Family</label>
              <div className="grid grid-cols-2 gap-2">
                {fontPresets.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => handleStyleChange('styleFontFamily', font.value)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                      styles.styleFontFamily === font.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-secondary hover:border-primary/50'
                    }`}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Font Size Scale</label>
              <input
                type="range"
                min="80"
                max="120"
                value={parseInt(styles.styleFontScale || '100')}
                onChange={(e) => handleStyleChange('styleFontScale', e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Smaller</span>
                <span>{styles.styleFontScale || '100'}%</span>
                <span>Larger</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Move className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-foreground">Spacing</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {spacingPresets.map((spacing) => (
              <button
                key={spacing.value}
                onClick={() => handleStyleChange('styleSpacing', spacing.value)}
                className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                  styles.styleSpacing === spacing.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-secondary hover:border-primary/50'
                }`}
              >
                {spacing.name}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            const resetStyles = { ...styles };
            delete resetStyles.styleBgColor;
            delete resetStyles.styleTextColor;
            delete resetStyles.styleAccentColor;
            delete resetStyles.styleFontFamily;
            delete resetStyles.styleFontScale;
            delete resetStyles.styleSpacing;
            onUpdateStyles(block.id, resetStyles);
          }}
          className="w-full py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          Reset Styles
        </button>
      </div>
    </div>
  );
};

import { ComponentBlock, BlockStyles } from '@/types/builder';
import { X, Paintbrush, Type, Move, Image, Layers } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface StylePanelProps {
  block: ComponentBlock | null;
  onUpdateStyles: (id: string, styles: BlockStyles) => void;
  onClose: () => void;
}

const colorPresets = [
  { name: 'White', value: '#ffffff' },
  { name: 'Slate 50', value: '#f8fafc' },
  { name: 'Slate 100', value: '#f1f5f9' },
  { name: 'Slate 900', value: '#0f172a' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Green', value: '#22c55e' },
];

const gradientPresets = [
  { name: 'None', value: '' },
  { name: 'Blue to Purple', value: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' },
  { name: 'Cyan to Blue', value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
  { name: 'Purple to Pink', value: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
  { name: 'Green to Cyan', value: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)' },
  { name: 'Dark Gradient', value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
];

const spacingValues = ['0', '8', '16', '24', '32', '48', '64', '80', '96'];

const fontPresets = [
  { name: 'Default', value: 'inherit' },
  { name: 'Sans Serif', value: 'ui-sans-serif, system-ui, sans-serif' },
  { name: 'Serif', value: 'ui-serif, Georgia, serif' },
  { name: 'Mono', value: 'ui-monospace, monospace' },
];

const backgroundPositions = [
  { name: 'Center', value: 'center' },
  { name: 'Top', value: 'top' },
  { name: 'Bottom', value: 'bottom' },
  { name: 'Left', value: 'left' },
  { name: 'Right', value: 'right' },
];

const backgroundRepeats = [
  { name: 'No Repeat', value: 'no-repeat' },
  { name: 'Repeat', value: 'repeat' },
  { name: 'Repeat X', value: 'repeat-x' },
  { name: 'Repeat Y', value: 'repeat-y' },
];

export const StylePanel = ({ block, onUpdateStyles, onClose }: StylePanelProps) => {
  if (!block) return null;

  const styles = block.styles || {};

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onUpdateStyles(block.id, { ...styles, [key]: value });
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Block Settings</h3>
          <p className="text-xs text-muted-foreground capitalize">{block.type} Section</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Spacing Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Move className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-foreground">Spacing</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Padding Top: {styles.paddingTop || '0'}px</label>
              <Slider
                value={[parseInt(styles.paddingTop || '0')]}
                onValueChange={(value) => handleStyleChange('paddingTop', value[0].toString())}
                max={120}
                step={8}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Padding Bottom: {styles.paddingBottom || '0'}px</label>
              <Slider
                value={[parseInt(styles.paddingBottom || '0')]}
                onValueChange={(value) => handleStyleChange('paddingBottom', value[0].toString())}
                max={120}
                step={8}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Margin Top: {styles.marginTop || '0'}px</label>
              <Slider
                value={[parseInt(styles.marginTop || '0')]}
                onValueChange={(value) => handleStyleChange('marginTop', value[0].toString())}
                max={64}
                step={8}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Margin Bottom: {styles.marginBottom || '0'}px</label>
              <Slider
                value={[parseInt(styles.marginBottom || '0')]}
                onValueChange={(value) => handleStyleChange('marginBottom', value[0].toString())}
                max={64}
                step={8}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Background Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-foreground">Background</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Solid Color</label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      handleStyleChange('backgroundColor', color.value);
                      handleStyleChange('backgroundGradient', '');
                    }}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      styles.backgroundColor === color.value && !styles.backgroundGradient
                        ? 'border-foreground scale-110'
                        : 'border-border hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <input
                type="text"
                value={styles.backgroundColor || ''}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="w-full mt-2 px-3 py-1.5 text-xs bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Custom color (hex/rgb)"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Gradient</label>
              <div className="grid grid-cols-3 gap-2">
                {gradientPresets.map((gradient) => (
                  <button
                    key={gradient.name}
                    onClick={() => handleStyleChange('backgroundGradient', gradient.value)}
                    className={`h-8 rounded-lg border-2 transition-all text-xs ${
                      styles.backgroundGradient === gradient.value
                        ? 'border-foreground'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ background: gradient.value || '#f1f5f9' }}
                    title={gradient.name}
                  >
                    {gradient.name === 'None' && <span className="text-muted-foreground">None</span>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Background Image URL</label>
              <input
                type="text"
                value={styles.backgroundImage || ''}
                onChange={(e) => handleStyleChange('backgroundImage', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {styles.backgroundImage && (
              <>
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Image Position</label>
                  <div className="grid grid-cols-3 gap-1">
                    {backgroundPositions.map((pos) => (
                      <button
                        key={pos.value}
                        onClick={() => handleStyleChange('backgroundPosition', pos.value)}
                        className={`px-2 py-1.5 text-xs rounded border transition-all ${
                          (styles.backgroundPosition || 'center') === pos.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-secondary hover:border-primary/50'
                        }`}
                      >
                        {pos.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Image Repeat</label>
                  <div className="grid grid-cols-2 gap-1">
                    {backgroundRepeats.map((repeat) => (
                      <button
                        key={repeat.value}
                        onClick={() => handleStyleChange('backgroundRepeat', repeat.value)}
                        className={`px-2 py-1.5 text-xs rounded border transition-all ${
                          (styles.backgroundRepeat || 'no-repeat') === repeat.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-secondary hover:border-primary/50'
                        }`}
                      >
                        {repeat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Image Opacity: {styles.backgroundOpacity || '100'}%</label>
                  <Slider
                    value={[parseInt(styles.backgroundOpacity || '100')]}
                    onValueChange={(value) => handleStyleChange('backgroundOpacity', value[0].toString())}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Colors Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Paintbrush className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-foreground">Colors</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Text Color</label>
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={() => handleStyleChange('textColor', '#ffffff')}
                  className={`w-8 h-8 rounded-lg border-2 transition-all bg-white ${
                    styles.textColor === '#ffffff'
                      ? 'border-foreground scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  title="White"
                />
                <button
                  onClick={() => handleStyleChange('textColor', '#000000')}
                  className={`w-8 h-8 rounded-lg border-2 transition-all bg-black ${
                    styles.textColor === '#000000'
                      ? 'border-foreground scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title="Black"
                />
                <button
                  onClick={() => handleStyleChange('textColor', '#0f172a')}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    styles.textColor === '#0f172a'
                      ? 'border-foreground scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: '#0f172a' }}
                  title="Slate 900"
                />
                <button
                  onClick={() => handleStyleChange('textColor', '#64748b')}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    styles.textColor === '#64748b'
                      ? 'border-foreground scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: '#64748b' }}
                  title="Slate 500"
                />
                <button
                  onClick={() => handleStyleChange('textColor', '')}
                  className={`w-8 h-8 rounded-lg border-2 transition-all bg-gradient-to-br from-gray-200 to-gray-400 ${
                    !styles.textColor
                      ? 'border-foreground scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title="Default"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Accent Color</label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.slice(4).map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleStyleChange('accentColor', color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      styles.accentColor === color.value
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
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Font Family</label>
              <div className="grid grid-cols-2 gap-2">
                {fontPresets.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => handleStyleChange('fontFamily', font.value)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                      styles.fontFamily === font.value
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
              <label className="text-xs text-muted-foreground mb-2 block">Font Size Scale: {styles.fontScale || '100'}%</label>
              <Slider
                value={[parseInt(styles.fontScale || '100')]}
                onValueChange={(value) => handleStyleChange('fontScale', value[0].toString())}
                min={80}
                max={120}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            onUpdateStyles(block.id, {});
          }}
          className="w-full py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          Reset All Styles
        </button>
      </div>
    </div>
  );
};

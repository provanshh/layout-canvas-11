import { useState } from 'react';
import { ComponentBlock, BlockStyles } from '@/types/builder';
import { X, Paintbrush, Type, Move, Image, Layers, Plus, Trash2, MousePointer, ChevronDown, ChevronRight, Upload } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SectionEditorPanelProps {
  block: ComponentBlock | null;
  onUpdateContent: (id: string, content: Record<string, string>) => void;
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
  { name: 'Orange', value: '#f97316' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#eab308' },
];

const gradientPresets = [
  { name: 'None', value: '' },
  { name: 'Blue to Purple', value: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' },
  { name: 'Cyan to Blue', value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
  { name: 'Purple to Pink', value: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
  { name: 'Green to Cyan', value: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)' },
  { name: 'Dark Gradient', value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
  { name: 'Sunset', value: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)' },
];

const fontPresets = [
  { name: 'Default', value: 'inherit' },
  { name: 'Sans Serif', value: 'ui-sans-serif, system-ui, sans-serif' },
  { name: 'Serif', value: 'ui-serif, Georgia, serif' },
  { name: 'Mono', value: 'ui-monospace, monospace' },
];

// Extract editable fields from content based on block type
const getEditableFields = (block: ComponentBlock) => {
  const { type, content } = block;
  const fields: { key: string; label: string; type: 'text' | 'textarea' | 'color' | 'image' | 'button'; group: string }[] = [];

  // Common text fields
  const textKeys = Object.keys(content).filter(k => 
    (k.toLowerCase().includes('title') || 
     k.toLowerCase().includes('headline') || 
     k.toLowerCase().includes('heading') ||
     k.toLowerCase().includes('name') ||
     k.toLowerCase().includes('label')) &&
    !k.toLowerCase().includes('color') &&
    !k.toLowerCase().includes('button')
  );

  const descriptionKeys = Object.keys(content).filter(k => 
    (k.toLowerCase().includes('description') || 
     k.toLowerCase().includes('subheadline') ||
     k.toLowerCase().includes('subtitle') ||
     k.toLowerCase().includes('text') ||
     k.toLowerCase().includes('content') ||
     k.toLowerCase().includes('body')) &&
    !k.toLowerCase().includes('color') &&
    !k.toLowerCase().includes('button')
  );

  const colorKeys = Object.keys(content).filter(k => 
    k.toLowerCase().includes('color') && !k.toLowerCase().includes('button')
  );

  const imageKeys = Object.keys(content).filter(k => 
    (k.toLowerCase().includes('image') || 
     k.toLowerCase().includes('avatar') || 
     k.toLowerCase().includes('logo') ||
     k.toLowerCase().includes('photo') ||
     (k.toLowerCase().includes('url') && !k.toLowerCase().includes('video')))
  );

  const buttonKeys = Object.keys(content).filter(k => 
    k.toLowerCase().includes('button')
  );

  // Add text fields
  textKeys.forEach(key => {
    fields.push({ key, label: formatLabel(key), type: 'text', group: 'Text Content' });
  });

  descriptionKeys.forEach(key => {
    fields.push({ key, label: formatLabel(key), type: 'textarea', group: 'Text Content' });
  });

  // Add color fields
  colorKeys.forEach(key => {
    fields.push({ key, label: formatLabel(key), type: 'color', group: 'Colors' });
  });

  // Add image fields
  imageKeys.forEach(key => {
    fields.push({ key, label: formatLabel(key), type: 'image', group: 'Images' });
  });

  return fields;
};

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// Get button configurations from content
const getButtonConfigs = (content: Record<string, string>) => {
  const buttons: { id: string; prefix: string; label: string }[] = [];
  
  // Primary button
  if (content.buttonText !== undefined) {
    buttons.push({ id: 'primary', prefix: 'button', label: 'Primary Button' });
  }
  
  // Secondary button
  if (content.buttonSecondary !== undefined) {
    buttons.push({ id: 'secondary', prefix: 'secondaryButton', label: 'Secondary Button' });
  }

  // CTA button
  if (content.ctaButtonText !== undefined) {
    buttons.push({ id: 'cta', prefix: 'ctaButton', label: 'CTA Button' });
  }

  // Submit button (for forms)
  if (content.submitButtonText !== undefined) {
    buttons.push({ id: 'submit', prefix: 'submitButton', label: 'Submit Button' });
  }

  return buttons;
};

const ColorPicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <div className="grid grid-cols-6 gap-1.5">
      {colorPresets.map((color) => (
        <button
          key={color.value}
          onClick={() => onChange(color.value)}
          className={`w-6 h-6 rounded border-2 transition-all ${
            value === color.value ? 'border-foreground scale-110' : 'border-border hover:scale-105'
          }`}
          style={{ backgroundColor: color.value }}
          title={color.name}
        />
      ))}
    </div>
    <Input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 text-xs"
      placeholder="#hex or rgb()"
    />
  </div>
);

const SectionGroup = ({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = true 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full py-2 hover:bg-secondary/50 rounded-lg px-2 transition-colors">
        {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-medium text-sm text-foreground">{title}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pr-2 pb-2 space-y-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const ButtonEditor = ({ 
  content, 
  prefix, 
  label,
  onUpdate 
}: { 
  content: Record<string, string>; 
  prefix: string; 
  label: string;
  onUpdate: (key: string, value: string) => void;
}) => {
  const textKey = prefix === 'button' ? 'buttonText' : 
                  prefix === 'secondaryButton' ? 'buttonSecondary' : 
                  `${prefix}Text`;
  const bgColorKey = prefix === 'button' ? 'buttonBgColor' : `${prefix}BgColor`;
  const textColorKey = prefix === 'button' ? 'buttonTextColor' : `${prefix}TextColor`;
  const linkKey = prefix === 'button' ? 'buttonLink' : `${prefix}Link`;
  const paddingXKey = prefix === 'button' ? 'buttonPaddingX' : `${prefix}PaddingX`;
  const paddingYKey = prefix === 'button' ? 'buttonPaddingY' : `${prefix}PaddingY`;
  const borderRadiusKey = prefix === 'button' ? 'buttonBorderRadius' : `${prefix}BorderRadius`;

  return (
    <div className="space-y-3 p-3 bg-secondary/30 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
      </div>
      
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Button Text</label>
        <Input
          value={content[textKey] || ''}
          onChange={(e) => onUpdate(textKey, e.target.value)}
          className="h-8 text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Background</label>
          <Input
            type="color"
            value={content[bgColorKey] || '#06b6d4'}
            onChange={(e) => onUpdate(bgColorKey, e.target.value)}
            className="h-8 w-full cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Text Color</label>
          <Input
            type="color"
            value={content[textColorKey] || '#ffffff'}
            onChange={(e) => onUpdate(textColorKey, e.target.value)}
            className="h-8 w-full cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Link URL</label>
        <Input
          value={content[linkKey] || ''}
          onChange={(e) => onUpdate(linkKey, e.target.value)}
          className="h-8 text-xs"
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Padding X</label>
          <Input
            type="number"
            value={content[paddingXKey] || '32'}
            onChange={(e) => onUpdate(paddingXKey, e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Padding Y</label>
          <Input
            type="number"
            value={content[paddingYKey] || '12'}
            onChange={(e) => onUpdate(paddingYKey, e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Radius</label>
          <Input
            type="number"
            value={content[borderRadiusKey] || '8'}
            onChange={(e) => onUpdate(borderRadiusKey, e.target.value)}
            className="h-8 text-xs"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="pt-2 border-t border-border">
        <label className="text-xs text-muted-foreground mb-2 block">Preview</label>
        <button
          className="font-semibold transition-colors"
          style={{
            backgroundColor: content[bgColorKey] || '#06b6d4',
            color: content[textColorKey] || '#ffffff',
            paddingLeft: `${content[paddingXKey] || 32}px`,
            paddingRight: `${content[paddingXKey] || 32}px`,
            paddingTop: `${content[paddingYKey] || 12}px`,
            paddingBottom: `${content[paddingYKey] || 12}px`,
            borderRadius: `${content[borderRadiusKey] || 8}px`,
          }}
        >
          {content[textKey] || 'Button'}
        </button>
      </div>
    </div>
  );
};

export const SectionEditorPanel = ({ block, onUpdateContent, onUpdateStyles, onClose }: SectionEditorPanelProps) => {
  if (!block) return null;

  const styles = block.styles || {};
  const content = block.content;
  const editableFields = getEditableFields(block);
  const buttonConfigs = getButtonConfigs(content);

  const handleStyleChange = (key: keyof BlockStyles, value: string) => {
    onUpdateStyles(block.id, { ...styles, [key]: value });
  };

  const handleContentChange = (key: string, value: string) => {
    onUpdateContent(block.id, { ...content, [key]: value });
  };

  // Group fields by category
  const textFields = editableFields.filter(f => f.type === 'text' || f.type === 'textarea');
  const colorFields = editableFields.filter(f => f.type === 'color');
  const imageFields = editableFields.filter(f => f.type === 'image');

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Edit Section</h3>
          <p className="text-xs text-muted-foreground capitalize">{block.type}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {/* Text Content Section */}
          {textFields.length > 0 && (
            <SectionGroup title="Text Content" icon={Type} defaultOpen={true}>
              {textFields.map(field => (
                <div key={field.key}>
                  <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      value={content[field.key] || ''}
                      onChange={(e) => handleContentChange(field.key, e.target.value)}
                      className="text-xs min-h-[60px]"
                      rows={3}
                    />
                  ) : (
                    <Input
                      value={content[field.key] || ''}
                      onChange={(e) => handleContentChange(field.key, e.target.value)}
                      className="h-8 text-xs"
                    />
                  )}
                </div>
              ))}
            </SectionGroup>
          )}

          {/* Buttons Section */}
          {buttonConfigs.length > 0 && (
            <SectionGroup title="Buttons" icon={MousePointer} defaultOpen={true}>
              {buttonConfigs.map(btn => (
                <ButtonEditor
                  key={btn.id}
                  content={content}
                  prefix={btn.prefix}
                  label={btn.label}
                  onUpdate={handleContentChange}
                />
              ))}
            </SectionGroup>
          )}

          {/* Images Section */}
          {imageFields.length > 0 && (
            <SectionGroup title="Images" icon={Image} defaultOpen={true}>
              {imageFields.map(field => {
                const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleContentChange(field.key, reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                };

                return (
                  <div key={field.key} className="space-y-2">
                    <label className="text-xs text-muted-foreground">{field.label}</label>
                    <Input
                      value={content[field.key] || ''}
                      onChange={(e) => handleContentChange(field.key, e.target.value)}
                      className="h-8 text-xs"
                      placeholder="Image URL"
                    />
                    <div className="flex gap-2">
                      <label className="flex-1 flex items-center justify-center gap-2 h-8 px-3 rounded-md border border-dashed border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Upload from device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {content[field.key] && (
                      <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden">
                        <img 
                          src={content[field.key]} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Invalid+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </SectionGroup>
          )}

          {/* Text Colors Section */}
          {colorFields.length > 0 && (
            <SectionGroup title="Text Colors" icon={Paintbrush} defaultOpen={false}>
              {colorFields.map(field => (
                <div key={field.key}>
                  <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                  <ColorPicker
                    value={content[field.key] || ''}
                    onChange={(v) => handleContentChange(field.key, v)}
                  />
                </div>
              ))}
            </SectionGroup>
          )}

          {/* Spacing Section */}
          <SectionGroup title="Spacing" icon={Move} defaultOpen={false}>
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
          </SectionGroup>

          {/* Background Section */}
          <SectionGroup title="Background" icon={Layers} defaultOpen={false}>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Solid Color</label>
                <ColorPicker
                  value={styles.backgroundColor || ''}
                  onChange={(v) => {
                    handleStyleChange('backgroundColor', v);
                    handleStyleChange('backgroundGradient', '');
                  }}
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Gradient</label>
                <div className="grid grid-cols-2 gap-2">
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
                <Input
                  value={styles.backgroundImage || ''}
                  onChange={(e) => handleStyleChange('backgroundImage', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {styles.backgroundImage && (
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
              )}
            </div>
          </SectionGroup>

          {/* Typography Section */}
          <SectionGroup title="Typography" icon={Type} defaultOpen={false}>
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

              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Text Color</label>
                <ColorPicker
                  value={styles.textColor || ''}
                  onChange={(v) => handleStyleChange('textColor', v)}
                />
              </div>
            </div>
          </SectionGroup>

          {/* Reset Button */}
          <button
            onClick={() => {
              onUpdateStyles(block.id, {});
            }}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary transition-colors mt-4"
          >
            Reset All Styles
          </button>
        </div>
      </ScrollArea>
    </div>
  );
};

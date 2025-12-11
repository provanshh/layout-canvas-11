import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Zap, Smartphone, MousePointer } from 'lucide-react';

interface FeaturesBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const FeaturesBlock = ({ block, onUpdate, isPreview }: FeaturesBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const features = [
    { icon: Zap, titleKey: 'feature1Title', descKey: 'feature1Desc', titleColorKey: 'feature1TitleColor', descColorKey: 'feature1DescColor' },
    { icon: Smartphone, titleKey: 'feature2Title', descKey: 'feature2Desc', titleColorKey: 'feature2TitleColor', descColorKey: 'feature2DescColor' },
    { icon: MousePointer, titleKey: 'feature3Title', descKey: 'feature3Desc', titleColorKey: 'feature3TitleColor', descColorKey: 'feature3DescColor' },
  ];

  const FeatureCard = ({ icon: Icon, titleKey, descKey, titleColorKey, descColorKey }: { 
    icon: typeof Zap; 
    titleKey: string; 
    descKey: string;
    titleColorKey: string;
    descColorKey: string;
  }) => (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-cyan-600" />
      </div>
      {isPreview ? (
        <>
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: content[titleColorKey] || '#0f172a' }}
          >
            {content[titleKey]}
          </h3>
          <p style={{ color: content[descColorKey] || '#475569' }}>{content[descKey]}</p>
        </>
      ) : (
        <>
          <EditableText
            as="h3"
            value={content[titleKey]}
            onChange={(v) => updateField(titleKey, v)}
            color={content[titleColorKey] || '#0f172a'}
            onColorChange={(c) => updateField(titleColorKey, c)}
            className="text-lg font-semibold mb-2"
          />
          <EditableText
            as="p"
            value={content[descKey]}
            onChange={(v) => updateField(descKey, v)}
            color={content[descColorKey] || '#475569'}
            onColorChange={(c) => updateField(descColorKey, c)}
            className="block"
          />
        </>
      )}
    </div>
  );

  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {isPreview ? (
            <>
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: content.titleColor || '#0f172a' }}
              >
                {content.title}
              </h2>
              <p 
                className="text-lg max-w-2xl mx-auto"
                style={{ color: content.subtitleColor || '#475569' }}
              >
                {content.subtitle}
              </p>
            </>
          ) : (
            <>
              <EditableText
                as="h2"
                value={content.title}
                onChange={(v) => updateField('title', v)}
                color={content.titleColor || '#0f172a'}
                onColorChange={(c) => updateField('titleColor', c)}
                className="text-3xl font-bold mb-4"
              />
              <EditableText
                as="p"
                value={content.subtitle}
                onChange={(v) => updateField('subtitle', v)}
                color={content.subtitleColor || '#475569'}
                onColorChange={(c) => updateField('subtitleColor', c)}
                className="text-lg max-w-2xl mx-auto block"
              />
            </>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.titleKey} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

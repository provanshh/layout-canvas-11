import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';
import { Check } from 'lucide-react';

export const PricingBlock = ({ 
  block, 
  onUpdate, 
  isPreview, 
  onEditButton,
  onEditText 
}: BaseBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const plans = [
    { 
      nameKey: 'plan1Name', 
      priceKey: 'plan1Price', 
      featuresKey: 'plan1Features',
      buttonTextKey: 'plan1ButtonText',
      buttonColorKey: 'plan1ButtonColor',
      buttonTextColorKey: 'plan1ButtonTextColor',
      buttonLinkKey: 'plan1ButtonLink',
      highlighted: false 
    },
    { 
      nameKey: 'plan2Name', 
      priceKey: 'plan2Price', 
      featuresKey: 'plan2Features',
      badgeKey: 'plan2Badge',
      buttonTextKey: 'plan2ButtonText',
      buttonColorKey: 'plan2ButtonColor',
      buttonTextColorKey: 'plan2ButtonTextColor',
      buttonLinkKey: 'plan2ButtonLink',
      highlighted: true 
    },
  ];

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <EditableText
            as="h2"
            value={content.title}
            onChange={(v) => updateField('title', v)}
            color={content.titleColor || '#0f172a'}
            onColorChange={(c) => updateField('titleColor', c)}
            className="text-3xl font-bold mb-4"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-title`}
          />
          <EditableText
            as="p"
            value={content.subtitle}
            onChange={(v) => updateField('subtitle', v)}
            color={content.subtitleColor || '#475569'}
            onColorChange={(c) => updateField('subtitleColor', c)}
            className="text-lg block"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-subtitle`}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map(({ nameKey, priceKey, featuresKey, badgeKey, buttonTextKey, buttonColorKey, buttonTextColorKey, buttonLinkKey, highlighted }) => {
            const buttonBg = content[buttonColorKey] || (highlighted ? '#0891b2' : '#f1f5f9');
            const buttonText = content[buttonTextColorKey] || (highlighted ? '#ffffff' : '#0f172a');
            const buttonLabel = content[buttonTextKey] || 'Get Started';
            const buttonLink = content[buttonLinkKey] || '#';
            
            return (
              <div
                key={nameKey}
                className={`p-8 rounded-2xl border-2 relative ${
                  highlighted
                    ? 'border-cyan-500 bg-cyan-50/50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {badgeKey && content[badgeKey] && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-white text-sm font-medium rounded-full">
                    {content[badgeKey]}
                  </span>
                )}
                <div className="text-center mb-6">
                  <EditableText
                    as="h3"
                    value={content[nameKey]}
                    onChange={(v) => updateField(nameKey, v)}
                    className="text-xl font-semibold text-slate-900 mb-2"
                    isPreview={isPreview}
                    onEditText={onEditText}
                    textId={`${block.id}-${nameKey}`}
                  />
                  <div className="text-4xl font-bold text-slate-900">
                    <EditableText
                      value={content[priceKey]}
                      onChange={(v) => updateField(priceKey, v)}
                      isPreview={isPreview}
                      onEditText={onEditText}
                      textId={`${block.id}-${priceKey}`}
                    />
                    <span className="text-lg font-normal text-slate-500">/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {content[featuresKey]?.split(', ').map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <EditableButton
                  text={buttonLabel}
                  bgColor={buttonBg}
                  textColor={buttonText}
                  link={buttonLink}
                  className="w-full py-3 rounded-lg font-semibold"
                  isPreview={isPreview}
                  onEditButton={onEditButton}
                  buttonId={`${block.id}-${nameKey}-btn`}
                  onTextChange={(v) => updateField(buttonTextKey, v)}
                  onBgColorChange={(v) => updateField(buttonColorKey, v)}
                  onTextColorChange={(v) => updateField(buttonTextColorKey, v)}
                  onLinkChange={(v) => updateField(buttonLinkKey, v)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableImage } from '../EditableImage';
import { Quote } from 'lucide-react';

export const TestimonialsBlock = ({ 
  block, 
  onUpdate, 
  isPreview,
  onEditText,
  onEditImage 
}: BaseBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const testimonials = [
    { quoteKey: 'quote1', authorKey: 'author1', roleKey: 'role1', avatarKey: 'avatar1' },
    { quoteKey: 'quote2', authorKey: 'author2', roleKey: 'role2', avatarKey: 'avatar2' },
  ];

  return (
    <div className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <EditableText
            as="h2"
            value={content.title}
            onChange={(v) => updateField('title', v)}
            className="text-3xl font-bold text-foreground"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-title`}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(({ quoteKey, authorKey, roleKey, avatarKey }) => (
            <div key={quoteKey} className="p-8 bg-muted rounded-2xl relative">
              <Quote className="w-10 h-10 text-primary/30 absolute top-6 left-6" />
              <div className="pt-8">
                <EditableText
                  as="p"
                  value={content[quoteKey]}
                  onChange={(v) => updateField(quoteKey, v)}
                  className="text-lg text-foreground/80 mb-6 italic block"
                  isPreview={isPreview}
                  onEditText={onEditText}
                  textId={`${block.id}-${quoteKey}`}
                />
                <div className="flex items-center gap-4">
                  <EditableImage
                    src={content[avatarKey] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                    alt={content[authorKey]}
                    className="w-12 h-12 rounded-full object-cover"
                    isPreview={isPreview}
                    borderRadius={9999}
                    onClick={() => {
                      if (!isPreview && onEditImage) {
                        onEditImage(`${block.id}-${avatarKey}`, {
                          imageUrl: content[avatarKey] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                          alt: content[authorKey],
                          onImageUrlChange: (v) => updateField(avatarKey, v),
                          onAltChange: (v) => updateField(`${authorKey}Alt`, v),
                        });
                      }
                    }}
                  />
                  <div>
                    <EditableText
                      as="p"
                      value={content[authorKey]}
                      onChange={(v) => updateField(authorKey, v)}
                      className="font-semibold text-foreground block"
                      isPreview={isPreview}
                      onEditText={onEditText}
                      textId={`${block.id}-${authorKey}`}
                    />
                    <EditableText
                      as="p"
                      value={content[roleKey]}
                      onChange={(v) => updateField(roleKey, v)}
                      className="text-sm text-muted-foreground block"
                      isPreview={isPreview}
                      onEditText={onEditText}
                      textId={`${block.id}-${roleKey}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Quote } from 'lucide-react';

interface TestimonialsBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const TestimonialsBlock = ({ block, onUpdate, isPreview }: TestimonialsBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const testimonials = [
    { quoteKey: 'quote1', authorKey: 'author1', roleKey: 'role1', avatarKey: 'avatar1' },
    { quoteKey: 'quote2', authorKey: 'author2', roleKey: 'role2', avatarKey: 'avatar2' },
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {isPreview ? (
            <h2 className="text-3xl font-bold text-foreground">{content.title}</h2>
          ) : (
            <EditableText
              as="h2"
              value={content.title}
              onChange={(v) => updateField('title', v)}
              className="text-3xl font-bold text-foreground"
            />
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(({ quoteKey, authorKey, roleKey, avatarKey }) => (
            <div key={quoteKey} className="p-8 bg-muted rounded-2xl relative">
              <Quote className="w-10 h-10 text-primary/30 absolute top-6 left-6" />
              <div className="pt-8">
                {isPreview ? (
                  <>
                    <p className="text-lg text-foreground/80 mb-6 italic">{content[quoteKey]}</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={content[avatarKey] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                        alt={content[authorKey]}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{content[authorKey]}</p>
                        <p className="text-sm text-muted-foreground">{content[roleKey]}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <EditableText
                      as="p"
                      value={content[quoteKey]}
                      onChange={(v) => updateField(quoteKey, v)}
                      className="text-lg text-foreground/80 mb-6 italic block"
                    />
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <img
                          src={content[avatarKey] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                          alt={content[authorKey]}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <input
                          type="text"
                          value={content[avatarKey] || ''}
                          onChange={(e) => updateField(avatarKey, e.target.value)}
                          placeholder="Image URL"
                          className="absolute inset-0 w-12 h-12 opacity-0 group-hover:opacity-100 bg-background/90 rounded-full text-[8px] text-center cursor-pointer"
                          title="Click to edit avatar URL"
                        />
                      </div>
                      <div>
                        <EditableText
                          as="p"
                          value={content[authorKey]}
                          onChange={(v) => updateField(authorKey, v)}
                          className="font-semibold text-foreground block"
                        />
                        <EditableText
                          as="p"
                          value={content[roleKey]}
                          onChange={(v) => updateField(roleKey, v)}
                          className="text-sm text-muted-foreground block"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

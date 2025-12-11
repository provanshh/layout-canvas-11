import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableImage } from '../EditableImage';

export const BlogBlock = ({ block, onUpdate, isPreview, onEditText, onEditImage }: BaseBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  return (
    <div className="py-16 px-6 bg-background">
      <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
        <EditableText
          as="h1"
          value={content.title}
          onChange={(val) => updateField('title', val)}
          className="text-4xl font-bold mb-4 text-foreground"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-title`}
        />
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <EditableText
            value={content.author}
            onChange={(val) => updateField('author', val)}
            className="inline"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-author`}
          />
          <span>•</span>
          <EditableText
            value={content.date}
            onChange={(val) => updateField('date', val)}
            className="inline"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-date`}
          />
        </div>
        {content.featuredImage && (
          <div className="mb-8">
            <EditableImage
              src={content.featuredImage}
              alt={content.title}
              className="w-full h-64 object-cover rounded-xl"
              isPreview={isPreview}
              borderRadius={12}
              onClick={() => {
                if (!isPreview && onEditImage) {
                  onEditImage(`${block.id}-featuredImage`, {
                    imageUrl: content.featuredImage,
                    alt: content.title,
                    onImageUrlChange: (v) => updateField('featuredImage', v),
                    onAltChange: (v) => updateField('featuredImageAlt', v),
                  });
                }
              }}
            />
          </div>
        )}
        <EditableText
          as="p"
          value={content.excerpt}
          onChange={(val) => updateField('excerpt', val)}
          className="text-xl text-muted-foreground mb-6 font-medium"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-excerpt`}
          isMultiline
        />
        <EditableText
          as="h2"
          value={content.heading1}
          onChange={(val) => updateField('heading1', val)}
          className="text-2xl font-semibold mt-8 mb-4 text-foreground"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-heading1`}
        />
        <EditableText
          as="p"
          value={content.paragraph1}
          onChange={(val) => updateField('paragraph1', val)}
          className="text-foreground/80 mb-6 whitespace-pre-line block"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-paragraph1`}
          isMultiline
        />
        <EditableText
          as="h2"
          value={content.heading2}
          onChange={(val) => updateField('heading2', val)}
          className="text-2xl font-semibold mt-8 mb-4 text-foreground"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-heading2`}
        />
        <EditableText
          as="p"
          value={content.paragraph2}
          onChange={(val) => updateField('paragraph2', val)}
          className="text-foreground/80 mb-6 whitespace-pre-line block"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-paragraph2`}
          isMultiline
        />
      </article>
    </div>
  );
};
import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableImage } from '../EditableImage';
import { Plus, X } from 'lucide-react';

export const ImageGalleryBlock = ({ 
  block, 
  onUpdate, 
  isPreview,
  onEditText,
  onEditImage 
}: BaseBlockProps) => {
  const { content } = block;

  const handleUpdateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const getImageCount = () => {
    let count = 0;
    for (let i = 1; i <= 6; i++) {
      if (content[`image${i}Url`]) count++;
    }
    return Math.max(count, 3);
  };

  const imageCount = getImageCount();

  const addImage = () => {
    if (imageCount < 6) {
      const newIndex = imageCount + 1;
      onUpdate({
        ...content,
        [`image${newIndex}Url`]: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
        [`image${newIndex}Caption`]: `Image ${newIndex}`,
      });
    }
  };

  const removeImage = (index: number) => {
    const newContent = { ...content };
    delete newContent[`image${index}Url`];
    delete newContent[`image${index}Caption`];
    
    for (let i = index + 1; i <= 6; i++) {
      if (newContent[`image${i}Url`]) {
        newContent[`image${i - 1}Url`] = newContent[`image${i}Url`];
        newContent[`image${i - 1}Caption`] = newContent[`image${i}Caption`];
        delete newContent[`image${i}Url`];
        delete newContent[`image${i}Caption`];
      }
    }
    
    onUpdate(newContent);
  };

  const defaultImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop',
  ];

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <EditableText
            as="h2"
            value={content.title || 'Our Gallery'}
            onChange={(val) => handleUpdateField('title', val)}
            className="text-3xl font-bold text-slate-900 mb-4"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-title`}
          />
          <EditableText
            as="p"
            value={content.subtitle || 'A collection of our finest work and moments'}
            onChange={(val) => handleUpdateField('subtitle', val)}
            className="text-lg text-slate-600"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-subtitle`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: imageCount }).map((_, index) => {
            const i = index + 1;
            const imageUrl = content[`image${i}Url`] || defaultImages[index] || defaultImages[0];
            const caption = content[`image${i}Caption`] || `Beautiful Image ${i}`;

            return (
              <div key={i} className="group relative">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-slate-100">
                  <EditableImage
                    src={imageUrl}
                    alt={caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    isPreview={isPreview}
                    borderRadius={12}
                    onClick={() => {
                      if (!isPreview && onEditImage) {
                        onEditImage(`${block.id}-image${i}`, {
                          imageUrl: imageUrl,
                          alt: caption,
                          onImageUrlChange: (v) => handleUpdateField(`image${i}Url`, v),
                          onAltChange: (v) => handleUpdateField(`image${i}Caption`, v),
                        });
                      }
                    }}
                  />
                  {!isPreview && imageCount > 1 && (
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
                <div className="mt-3">
                  <EditableText
                    value={caption}
                    onChange={(val) => handleUpdateField(`image${i}Caption`, val)}
                    className="text-slate-700 font-medium"
                    isPreview={isPreview}
                    onEditText={onEditText}
                    textId={`${block.id}-image${i}Caption`}
                  />
                </div>
              </div>
            );
          })}

          {!isPreview && imageCount < 6 && (
            <button
              onClick={addImage}
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-cyan-500 hover:bg-cyan-50 transition-colors"
            >
              <Plus className="w-8 h-8 text-slate-400" />
              <span className="text-slate-500">Add Image</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
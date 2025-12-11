import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Video } from 'lucide-react';

interface VideoEmbedBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

const getEmbedUrl = (url: string): string => {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  return url;
};

export const VideoEmbedBlock = ({ block, onUpdate, isPreview }: VideoEmbedBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const embedUrl = getEmbedUrl(content.videoUrl || '');
  const hasValidUrl = embedUrl && embedUrl !== content.videoUrl;

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {isPreview ? (
            <>
              <h2 className="text-3xl font-bold text-foreground mb-2">{content.title}</h2>
              <p className="text-muted-foreground">{content.subtitle}</p>
            </>
          ) : (
            <>
              <EditableText
                as="h2"
                value={content.title}
                onChange={(v) => updateField('title', v)}
                className="text-3xl font-bold text-foreground mb-2"
              />
              <EditableText
                as="p"
                value={content.subtitle}
                onChange={(v) => updateField('subtitle', v)}
                className="text-muted-foreground"
              />
            </>
          )}
        </div>
        
        <div className="aspect-video rounded-xl overflow-hidden bg-muted">
          {hasValidUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <Video className="w-16 h-16 mb-4" />
              {!isPreview && (
                <div className="text-center px-4">
                  <p className="text-sm mb-2">Paste a YouTube or Vimeo URL:</p>
                  <input
                    type="text"
                    value={content.videoUrl || ''}
                    onChange={(e) => updateField('videoUrl', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm w-full max-w-md"
                  />
                </div>
              )}
              {isPreview && <p className="text-sm">No video URL provided</p>}
            </div>
          )}
        </div>
        
        {content.caption && (
          <div className="text-center mt-4">
            {isPreview ? (
              <p className="text-sm text-muted-foreground">{content.caption}</p>
            ) : (
              <EditableText
                as="p"
                value={content.caption}
                onChange={(v) => updateField('caption', v)}
                className="text-sm text-muted-foreground"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

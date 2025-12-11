interface EditableImageProps {
  src: string;
  alt?: string;
  className?: string;
  isPreview?: boolean;
  onClick?: () => void;
  overlayColor?: string;
  overlayOpacity?: number;
  borderRadius?: number;
}

export const EditableImage = ({
  src,
  alt = '',
  className = '',
  isPreview = false,
  onClick,
  overlayColor,
  overlayOpacity = 0,
  borderRadius = 0,
}: EditableImageProps) => {
  const containerStyle: React.CSSProperties = {
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
  };

  return (
    <div
      className={`relative ${!isPreview ? 'cursor-pointer group' : ''}`}
      style={containerStyle}
      onClick={!isPreview ? onClick : undefined}
      title={!isPreview ? 'Click to edit image' : undefined}
    >
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className={`${className} ${!isPreview ? 'ring-2 ring-transparent group-hover:ring-primary/30 transition-all' : ''}`}
      />
      {overlayColor && overlayOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
          }}
        />
      )}
      {!isPreview && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
            Click to edit
          </span>
        </div>
      )}
    </div>
  );
};
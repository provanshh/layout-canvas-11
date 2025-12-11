import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableImage } from '../EditableImage';

export const TeamBlock = ({ 
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

  const teamMembers = [
    {
      name: content.member1Name,
      role: content.member1Role,
      bio: content.member1Bio,
      photo: content.member1Photo,
      nameKey: 'member1Name',
      roleKey: 'member1Role',
      bioKey: 'member1Bio',
      photoKey: 'member1Photo',
    },
    {
      name: content.member2Name,
      role: content.member2Role,
      bio: content.member2Bio,
      photo: content.member2Photo,
      nameKey: 'member2Name',
      roleKey: 'member2Role',
      bioKey: 'member2Bio',
      photoKey: 'member2Photo',
    },
    {
      name: content.member3Name,
      role: content.member3Role,
      bio: content.member3Bio,
      photo: content.member3Photo,
      nameKey: 'member3Name',
      roleKey: 'member3Role',
      bioKey: 'member3Bio',
      photoKey: 'member3Photo',
    },
  ];

  return (
    <div className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <EditableText
          as="h2"
          value={content.title}
          onChange={(val) => updateField('title', val)}
          className="text-3xl font-bold text-center mb-4"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-title`}
        />
        <EditableText
          as="p"
          value={content.subtitle}
          onChange={(val) => updateField('subtitle', val)}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto block"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-subtitle`}
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <EditableImage
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  isPreview={isPreview}
                  borderRadius={12}
                  onClick={() => {
                    if (!isPreview && onEditImage) {
                      onEditImage(`${block.id}-${member.photoKey}`, {
                        imageUrl: member.photo,
                        alt: member.name,
                        onImageUrlChange: (v) => updateField(member.photoKey, v),
                        onAltChange: (v) => updateField(`${member.nameKey}Alt`, v),
                      });
                    }
                  }}
                />
              </div>
              <EditableText
                as="h3"
                value={member.name}
                onChange={(val) => updateField(member.nameKey, val)}
                className="text-xl font-semibold mb-1"
                isPreview={isPreview}
                onEditText={onEditText}
                textId={`${block.id}-${member.nameKey}`}
              />
              <EditableText
                as="p"
                value={member.role}
                onChange={(val) => updateField(member.roleKey, val)}
                className="text-primary font-medium mb-2"
                isPreview={isPreview}
                onEditText={onEditText}
                textId={`${block.id}-${member.roleKey}`}
              />
              <EditableText
                as="p"
                value={member.bio}
                onChange={(val) => updateField(member.bioKey, val)}
                className="text-muted-foreground text-sm"
                isPreview={isPreview}
                onEditText={onEditText}
                textId={`${block.id}-${member.bioKey}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
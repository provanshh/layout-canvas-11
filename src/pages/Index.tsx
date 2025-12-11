import { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ComponentBlock, ComponentTemplate, BlockStyles } from '@/types/builder';
import { componentTemplates } from '@/data/componentTemplates';
import { ComponentSidebar } from '@/components/builder/ComponentSidebar';
import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { BuilderToolbar } from '@/components/builder/BuilderToolbar';
import { PreviewModal } from '@/components/builder/PreviewModal';
import { ExportModal } from '@/components/builder/ExportModal';
import { SectionEditorPanel } from '@/components/builder/SectionEditorPanel';
import { LayoutOverviewModal } from '@/components/builder/LayoutOverviewModal';
import { TemplatesModal } from '@/components/builder/TemplatesModal';
import { ButtonEditPanel } from '@/components/builder/ButtonEditPanel';
import { TextEditPanel } from '@/components/builder/TextEditPanel';
import { ImageEditPanel } from '@/components/builder/ImageEditPanel';
import { useBuilderHistory } from '@/hooks/useBuilderHistory';
import { ButtonEditConfig, TextEditConfig, ImageEditConfig } from '@/components/builder/types';
import { toast } from 'sonner';

const STORAGE_KEY = 'builder-blocks';

const generateId = () => `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const loadFromStorage = (): ComponentBlock[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
  return [];
};

const saveToStorage = (blocks: ComponentBlock[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

const Index = () => {
  const { blocks, setBlocks, undo, redo, canUndo, canRedo } = useBuilderHistory(loadFromStorage());
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isEditorDark, setIsEditorDark] = useState(false);
  const [showLayoutOverview, setShowLayoutOverview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  // Panel states
  const [showButtonPanel, setShowButtonPanel] = useState(false);
  const [buttonEditConfig, setButtonEditConfig] = useState<ButtonEditConfig | null>(null);
  const [showTextPanel, setShowTextPanel] = useState(false);
  const [textEditConfig, setTextEditConfig] = useState<TextEditConfig | null>(null);
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [imageEditConfig, setImageEditConfig] = useState<ImageEditConfig | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    saveToStorage(blocks);
  }, [blocks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    // Handle dropping a new template from sidebar
    if (active.id.toString().startsWith('template-')) {
      const template = active.data.current?.template as ComponentTemplate;
      if (template) {
        const newBlock: ComponentBlock = {
          id: generateId(),
          type: template.type,
          content: { ...template.defaultContent },
          styles: {
            paddingTop: '0',
            paddingBottom: '0',
            marginTop: '0',
            marginBottom: '0',
          },
        };

        // If dropped over an existing block, insert at that position
        if (over && over.id !== 'canvas') {
          const overIndex = blocks.findIndex((b) => b.id === over.id);
          if (overIndex >= 0) {
            const newBlocks = [...blocks];
            newBlocks.splice(overIndex, 0, newBlock);
            setBlocks(newBlocks);
            toast.success('Component added');
            return;
          }
        }
        
        // Otherwise append to the end
        setBlocks([...blocks, newBlock]);
        toast.success('Component added');
      }
      return;
    }

    // Handle reordering existing blocks
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setBlocks(arrayMove(blocks, oldIndex, newIndex));
      }
    }
  };

  const handleUpdateBlock = useCallback(
    (id: string, content: Record<string, string>) => {
      setBlocks(
        blocks.map((block) =>
          block.id === id ? { ...block, content } : block
        ),
        true
      );
    },
    [blocks, setBlocks]
  );

  const handleUpdateBlockStyles = useCallback(
    (id: string, styles: BlockStyles) => {
      setBlocks(
        blocks.map((block) =>
          block.id === id ? { ...block, styles } : block
        ),
        true
      );
    },
    [blocks, setBlocks]
  );

  const handleDeleteBlock = useCallback(
    (id: string) => {
      setBlocks(blocks.filter((block) => block.id !== id));
      if (selectedBlockId === id) {
        setSelectedBlockId(null);
        setShowSectionEditor(false);
      }
      toast.success('Block deleted');
    },
    [blocks, setBlocks, selectedBlockId]
  );

  const handleSelectBlock = (id: string | null) => {
    setSelectedBlockId(id);
    if (id) {
      closeAllPanels();
      setShowSectionEditor(true);
    } else {
      setShowSectionEditor(false);
    }
  };

  const handleTogglePreviewTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleToggleEditorTheme = () => {
    setIsEditorDark(!isEditorDark);
  };

  const handleReorderBlocks = (newBlocks: ComponentBlock[]) => {
    setBlocks(newBlocks);
  };

  const handleSelectTemplate = (newBlocks: ComponentBlock[]) => {
    setBlocks(newBlocks);
    toast.success('Template loaded');
  };

  const closeAllPanels = () => {
    setShowButtonPanel(false);
    setShowTextPanel(false);
    setShowImagePanel(false);
  };

  const handleEditButton = useCallback((buttonId: string, config: ButtonEditConfig) => {
    closeAllPanels();
    setButtonEditConfig(config);
    setShowButtonPanel(true);
  }, []);

  const handleEditText = useCallback((textId: string, config: TextEditConfig) => {
    closeAllPanels();
    setTextEditConfig(config);
    setShowTextPanel(true);
  }, []);

  const handleEditImage = useCallback((imageId: string, config: ImageEditConfig) => {
    closeAllPanels();
    setImageEditConfig(config);
    setShowImagePanel(true);
  }, []);

  const handleCloseButtonPanel = () => {
    setShowButtonPanel(false);
    setButtonEditConfig(null);
  };

  const handleCloseTextPanel = () => {
    setShowTextPanel(false);
    setTextEditConfig(null);
  };

  const handleCloseImagePanel = () => {
    setShowImagePanel(false);
    setImageEditConfig(null);
  };

  const selectedBlock = selectedBlockId
    ? blocks.find(b => b.id === selectedBlockId) || null 
    : null;

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${isEditorDark ? 'dark' : ''}`}>
      <div className="h-full flex flex-col bg-background">
        <BuilderToolbar
          onPreview={() => setShowPreview(true)}
          onExport={() => setShowExport(true)}
          blockCount={blocks.length}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          isDarkTheme={isEditorDark}
          onToggleTheme={handleToggleEditorTheme}
          onOpenLayoutOverview={() => setShowLayoutOverview(true)}
          onOpenTemplates={() => setShowTemplates(true)}
        />
      
      <div className="flex-1 flex overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <ComponentSidebar
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <BuilderCanvas
            blocks={blocks}
            onUpdateBlock={handleUpdateBlock}
            onDeleteBlock={handleDeleteBlock}
            selectedBlockId={selectedBlockId}
            onSelectBlock={handleSelectBlock}
            onOpenStylePanel={(id) => handleSelectBlock(id)}
            isDarkTheme={isDarkTheme}
            onToggleTheme={handleTogglePreviewTheme}
            onEditButton={handleEditButton}
            onEditText={handleEditText}
            onEditImage={handleEditImage}
          />
          <DragOverlay>
            {activeId && activeId.startsWith('template-') && (
              <div className="p-4 bg-card border border-primary rounded-lg shadow-lg opacity-80">
                <span className="font-medium">
                  {componentTemplates.find(
                    (t) => `template-${t.type}` === activeId
                  )?.label}
                </span>
              </div>
            )}
          </DragOverlay>
        </DndContext>

        {showSectionEditor && selectedBlock && (
          <SectionEditorPanel
            block={selectedBlock}
            onUpdateContent={handleUpdateBlock}
            onUpdateStyles={handleUpdateBlockStyles}
            onClose={() => {
              setShowSectionEditor(false);
              setSelectedBlockId(null);
            }}
          />
        )}

        {showButtonPanel && buttonEditConfig && (
          <ButtonEditPanel
            isOpen={showButtonPanel}
            onClose={handleCloseButtonPanel}
            buttonText={buttonEditConfig.text}
            onTextChange={buttonEditConfig.onTextChange}
            bgColor={buttonEditConfig.bgColor}
            onBgColorChange={buttonEditConfig.onBgColorChange}
            textColor={buttonEditConfig.textColor}
            onTextColorChange={buttonEditConfig.onTextColorChange}
            link={buttonEditConfig.link}
            onLinkChange={buttonEditConfig.onLinkChange}
            openInNewTab={buttonEditConfig.openInNewTab}
            onOpenInNewTabChange={buttonEditConfig.onOpenInNewTabChange}
            paddingX={buttonEditConfig.paddingX}
            onPaddingXChange={buttonEditConfig.onPaddingXChange}
            paddingY={buttonEditConfig.paddingY}
            onPaddingYChange={buttonEditConfig.onPaddingYChange}
            borderRadius={buttonEditConfig.borderRadius}
            onBorderRadiusChange={buttonEditConfig.onBorderRadiusChange}
          />
        )}

        {showTextPanel && textEditConfig && (
          <TextEditPanel
            isOpen={showTextPanel}
            onClose={handleCloseTextPanel}
            text={textEditConfig.text}
            onTextChange={textEditConfig.onTextChange}
            color={textEditConfig.color}
            onColorChange={textEditConfig.onColorChange}
            link={textEditConfig.link}
            onLinkChange={textEditConfig.onLinkChange}
            openInNewTab={textEditConfig.openInNewTab}
            onOpenInNewTabChange={textEditConfig.onOpenInNewTabChange}
            fontStyle={textEditConfig.fontStyle}
            onFontStyleChange={textEditConfig.onFontStyleChange}
            isMultiline={textEditConfig.isMultiline}
          />
        )}

        {showImagePanel && imageEditConfig && (
          <ImageEditPanel
            isOpen={showImagePanel}
            onClose={handleCloseImagePanel}
            imageUrl={imageEditConfig.imageUrl}
            onImageUrlChange={imageEditConfig.onImageUrlChange}
            alt={imageEditConfig.alt}
            onAltChange={imageEditConfig.onAltChange}
            overlayColor={imageEditConfig.overlayColor}
            onOverlayColorChange={imageEditConfig.onOverlayColorChange}
            overlayOpacity={imageEditConfig.overlayOpacity}
            onOverlayOpacityChange={imageEditConfig.onOverlayOpacityChange}
            borderRadius={imageEditConfig.borderRadius}
            onBorderRadiusChange={imageEditConfig.onBorderRadiusChange}
          />
        )}
      </div>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        blocks={blocks}
        isDarkTheme={isDarkTheme}
      />
      
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        blocks={blocks}
      />

      <LayoutOverviewModal
        isOpen={showLayoutOverview}
        onClose={() => setShowLayoutOverview(false)}
        blocks={blocks}
        onReorder={handleReorderBlocks}
        onDelete={handleDeleteBlock}
      />

      <TemplatesModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />
      </div>
    </div>
  );
};

export default Index;

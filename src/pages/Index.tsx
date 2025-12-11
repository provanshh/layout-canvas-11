import { useState, useCallback } from 'react';
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
import { ComponentBlock, ComponentTemplate } from '@/types/builder';
import { componentTemplates } from '@/data/componentTemplates';
import { ComponentSidebar } from '@/components/builder/ComponentSidebar';
import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { BuilderToolbar } from '@/components/builder/BuilderToolbar';
import { PreviewModal } from '@/components/builder/PreviewModal';
import { ExportModal } from '@/components/builder/ExportModal';
import { StylePanel } from '@/components/builder/StylePanel';
import { LayoutOverviewModal } from '@/components/builder/LayoutOverviewModal';
import { TemplatesModal } from '@/components/builder/TemplatesModal';
import { ButtonEditPanel } from '@/components/builder/ButtonEditPanel';
import { useBuilderHistory } from '@/hooks/useBuilderHistory';
import { ButtonEditConfig } from '@/components/builder/BlockRenderer';

const generateId = () => `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const Index = () => {
  const { blocks, setBlocks, undo, redo, canUndo, canRedo } = useBuilderHistory([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [stylePanelBlockId, setStylePanelBlockId] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Preview/website theme
  const [isEditorDark, setIsEditorDark] = useState(false); // Editor UI theme
  const [showLayoutOverview, setShowLayoutOverview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  // Button edit panel state
  const [showButtonPanel, setShowButtonPanel] = useState(false);
  const [buttonEditConfig, setButtonEditConfig] = useState<ButtonEditConfig | null>(null);

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

    if (!over) return;

    // Check if dragging from sidebar (new component)
    if (active.id.toString().startsWith('template-')) {
      const template = active.data.current?.template as ComponentTemplate;
      if (template) {
        const newBlock: ComponentBlock = {
          id: generateId(),
          type: template.type,
          content: { ...template.defaultContent },
        };

        // Find insertion index
        const overIndex = blocks.findIndex((b) => b.id === over.id);
        const insertIndex = overIndex >= 0 ? overIndex : blocks.length;
        
        const newBlocks = [...blocks];
        newBlocks.splice(insertIndex, 0, newBlock);
        setBlocks(newBlocks);
      }
      return;
    }

    // Reordering existing blocks
    if (active.id !== over.id) {
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
        true // Skip history for content updates
      );
    },
    [blocks, setBlocks]
  );

  const handleDeleteBlock = useCallback(
    (id: string) => {
      setBlocks(blocks.filter((block) => block.id !== id));
      if (selectedBlockId === id) {
        setSelectedBlockId(null);
      }
      if (stylePanelBlockId === id) {
        setShowStylePanel(false);
        setStylePanelBlockId(null);
      }
    },
    [blocks, setBlocks, selectedBlockId, stylePanelBlockId]
  );

  const handleOpenStylePanel = (id: string) => {
    setStylePanelBlockId(id);
    setShowStylePanel(true);
    setSelectedBlockId(id);
    setShowButtonPanel(false);
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
  };

  const handleEditButton = useCallback((buttonId: string, config: ButtonEditConfig) => {
    setButtonEditConfig(config);
    setShowButtonPanel(true);
    setShowStylePanel(false);
  }, []);

  const handleCloseButtonPanel = () => {
    setShowButtonPanel(false);
    setButtonEditConfig(null);
  };

  const selectedBlock = stylePanelBlockId
    ? blocks.find(b => b.id === stylePanelBlockId) || null 
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
            onSelectBlock={setSelectedBlockId}
            onOpenStylePanel={handleOpenStylePanel}
            isDarkTheme={isDarkTheme}
            onToggleTheme={handleTogglePreviewTheme}
            onEditButton={handleEditButton}
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

        {showStylePanel && (
          <StylePanel
            block={selectedBlock}
            onUpdateStyles={handleUpdateBlock}
            onClose={() => {
              setShowStylePanel(false);
              setStylePanelBlockId(null);
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

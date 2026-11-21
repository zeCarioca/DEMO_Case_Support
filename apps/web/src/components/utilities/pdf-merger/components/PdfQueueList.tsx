import React, { useState, DragEvent } from 'react';
import { QueueItem } from '../types.js';
import { PdfQueueItem } from './PdfQueueItem.js';
import { PdfExhibitDivider } from './PdfExhibitDivider.js';
import { getExhibitLetter } from '../utils/formatters.js';

interface PdfQueueListProps {
  items: QueueItem[];
  onReorder: (newItems: QueueItem[]) => void;
  onRemoveItem: (index: number) => void;
  disabled?: boolean;
}

export const PdfQueueList: React.FC<PdfQueueListProps> = ({
  items,
  onReorder,
  onRemoveItem,
  disabled
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    if (disabled) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent or standard drag image
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || draggedIndex === null || draggedIndex === index) return;
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    const updated = [...items];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    setDraggedIndex(null);
    onReorder(updated);
  };

  const moveStep = (fromIndex: number, toIndex: number) => {
    if (disabled || toIndex < 0 || toIndex >= items.length) return;
    const updated = [...items];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    onReorder(updated);
  };

  // Compute sequential exhibit counters and file counters
  let exhibitCounter = 0;
  let fileCounter = 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxHeight: '480px',
        overflowY: 'auto',
        paddingRight: '0.25rem'
      }}
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        if (item.type === 'exhibit') {
          const letter = getExhibitLetter(exhibitCounter);
          exhibitCounter++;

          return (
            <PdfExhibitDivider
              key={item.id}
              item={item}
              index={index}
              letter={letter}
              isFirst={isFirst}
              isLast={isLast}
              onMoveUp={() => moveStep(index, index - 1)}
              onMoveDown={() => moveStep(index, index + 1)}
              onRemove={() => onRemoveItem(index)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              disabled={disabled}
            />
          );
        }

        fileCounter++;
        return (
          <PdfQueueItem
            key={item.id}
            item={item}
            index={index}
            positionNumber={fileCounter}
            isFirst={isFirst}
            isLast={isLast}
            onMoveUp={() => moveStep(index, index - 1)}
            onMoveDown={() => moveStep(index, index + 1)}
            onRemove={() => onRemoveItem(index)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};


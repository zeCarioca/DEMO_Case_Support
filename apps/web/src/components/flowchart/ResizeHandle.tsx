import React from 'react';
import { GripVertical } from 'lucide-react';

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
  onReset?: () => void;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  onMouseDown,
  isDragging,
  onReset
}) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onDoubleClick={onReset}
      title="Arraste para redimensionar (Duplo clique para redefinir)"
      style={{
        position: 'absolute',
        left: '-10px',
        top: 0,
        bottom: 0,
        width: '16px',
        cursor: 'col-resize',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        userSelect: 'none'
      }}
    >
      <div
        style={{
          width: '4px',
          height: '48px',
          borderRadius: '4px',
          background: isDragging ? '#38bdf8' : 'rgba(255, 255, 255, 0.25)',
          boxShadow: isDragging ? '0 0 10px rgba(56, 189, 248, 0.8)' : 'none',
          transition: 'all 0.15s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  );
};

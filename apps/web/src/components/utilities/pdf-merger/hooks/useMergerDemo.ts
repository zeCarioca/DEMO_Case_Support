import { useState, useEffect, useRef } from 'react';
import { QueueItem } from '../types.js';
import { generateMergerDemoFiles } from '../../demo/demoPdfGenerator.js';
import { useLanguage } from '../../../i18n/LanguageContext.js';

interface UseMergerDemoProps {
  setItems: React.Dispatch<React.SetStateAction<QueueItem[]>>;
  setFeedbackMessage: (msg: string | null) => void;
  initialDemo?: boolean;
}

export function useMergerDemo({ setItems, setFeedbackMessage, initialDemo = false }: UseMergerDemoProps) {
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const { t } = useLanguage();
  const hasAutoRunRef = useRef(false);

  const runDemo = async () => {
    setIsDemoLoading(true);
    try {
      const mockFiles = await generateMergerDemoFiles();
      const now = Date.now();

      const newItems: QueueItem[] = [
        {
          id: `file-demo-1-${now}`,
          type: 'file',
          fileKind: 'pdf',
          file: mockFiles[0],
          name: mockFiles[0].name,
          size: mockFiles[0].size,
          addedAt: now
        },
        {
          id: `exhibit-demo-a-${now + 1}`,
          type: 'exhibit',
          addedAt: now + 1
        },
        {
          id: `file-demo-2-${now + 2}`,
          type: 'file',
          fileKind: 'pdf',
          file: mockFiles[1],
          name: mockFiles[1].name,
          size: mockFiles[1].size,
          addedAt: now + 2
        },
        {
          id: `exhibit-demo-b-${now + 3}`,
          type: 'exhibit',
          addedAt: now + 3
        },
        {
          id: `file-demo-3-${now + 4}`,
          type: 'file',
          fileKind: 'pdf',
          file: mockFiles[2],
          name: mockFiles[2].name,
          size: mockFiles[2].size,
          addedAt: now + 4
        }
      ];

      setItems(newItems);
      setFeedbackMessage(t('demo.loadedMerger'));
      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch (err) {
      console.error('Failed to generate merger demo files', err);
    } finally {
      setIsDemoLoading(false);
    }
  };

  useEffect(() => {
    if (initialDemo && !hasAutoRunRef.current) {
      hasAutoRunRef.current = true;
      runDemo();
    }
  }, [initialDemo]);

  return {
    isDemoLoading,
    runDemo
  };
}

import React, { useState, useEffect } from 'react';
import * as pdfjsLib from '@native_modules/pdfjs-dist';
// [ISSUE #6]
// @ts-ignore
import PDFJSWorker from '../../../release/app/node_modules/pdfjs-dist/legacy/build/pdf.worker.entry';
import { TaskResult } from '@type/main';
import { useNavigate } from 'react-router-dom';

interface UseSourceProps {
  sourceUrl: string;
}

function useSource({ sourceUrl }: UseSourceProps) {
  const [source, setSource] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  console.log(sourceUrl);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sourceUrl);
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
    window.electron.fileHandler.getFileData({
      url: sourceUrl,
    });
    window.electron.fileHandler.onFileData(async (res: any) => {
      if (res.message === TaskResult.SUCCESS) {
        const pdfSource = await pdfjsLib.getDocument(res.data).promise;
        setSource(pdfSource);
      } else if (res.message === TaskResult.FAIL) {
        alert('Failed on opening source');
        navigate('/');
      }
    });
  }, []);
  return { source };
}

export default useSource;

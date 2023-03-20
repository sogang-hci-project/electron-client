import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

interface ReaderPageProps {
  source: pdfjsLib.PDFDocumentProxy | undefined;
  pageNumber: number;
}

const PageCanvas = styled('canvas')(() => ({
  backgroundColor: 'white',
}));

export const ReaderPage = ({ source, pageNumber }: ReaderPageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderPdf = async () => {
    console.log(source);
    if (!source) return;
    const page = await source.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext('2d');

    if (canvas && canvasContext) {
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext, viewport });
    }
  };

  useEffect(() => {
    renderPdf();
  }, [source]);

  return (
    <div>
      <PageCanvas ref={canvasRef}></PageCanvas>
    </div>
  );
};

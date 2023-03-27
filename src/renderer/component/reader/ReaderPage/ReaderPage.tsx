import React, { useRef, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

interface ReaderPageProps {
  source: pdfjsLib.PDFDocumentProxy | undefined;
  pageNumber: number;
  pageHeight: number;
  isActive: boolean;
}

const PageCanvas = styled('canvas')(() => ({
  backgroundColor: 'white',
}));

export const ReaderPage = ({
  source,
  pageNumber,
  pageHeight,
  isActive,
}: ReaderPageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<PageViewport>();

  const computeSize = async () => {
    const canvas = canvasRef.current;
    if (!source || !canvas) return;
    const page = await source.getPage(pageNumber);

    // Height based viewport calculation
    const nativeViewport = page.getViewport({ scale: 1 });
    const aspectRatio = nativeViewport.width / nativeViewport.height;
    const sizeRatio = pageHeight / nativeViewport.height;
    const pageWidth = pageHeight * aspectRatio;
    const newViewport = page.getViewport({ scale: sizeRatio });

    // Apply calculated value
    canvas.height = pageHeight;
    canvas.width = pageWidth;
    setViewport(newViewport);
  };

  const renderPdf = async () => {
    const canvas = canvasRef.current;
    if (!source || !canvas) return;
    const page = await source.getPage(pageNumber);

    if (isActive && viewport) {
      const canvasContext = canvas.getContext('2d');
      canvasContext && page.render({ canvasContext, viewport });
    }
  };

  useEffect(() => {
    computeSize();
  }, [source, pageHeight]);

  useEffect(() => {
    renderPdf();
  }, [isActive, viewport]);

  return (
    <div>
      <PageCanvas ref={canvasRef}></PageCanvas>
    </div>
  );
};

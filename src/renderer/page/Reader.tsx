import React, { useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  VscSearchFuzzy,
  VscChevronLeft,
  VscDebugReverseContinue,
  VscDebugContinue,
  VscDebugStop,
} from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
// [ISSUE #6]
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import { TaskResult } from 'type/main';
import { ReaderAppBar } from 'renderer/component/reader';

const Reader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileUrl = location.state.fileUrl || '';
  const fileName = location.state.fileName || '';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleBack = () => {
    navigate('/');
  };

  const loadPdf = async (fileUrl: string) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
    window.electron.fileHandler.getFileData({
      url: fileUrl,
    });
    window.electron.fileHandler.onFileData(async (res) => {
      if (res.message === TaskResult.SUCCESS) {
        const pdf = await pdfjsLib.getDocument(res.data).promise;
        renderPdf(pdf);
      } else if (res.message === TaskResult.FAIL) {
        alert('Failed on opening file');
        navigate('/');
      }
    });
  };

  const renderPdf = async (pdf: pdfjsLib.PDFDocumentProxy) => {
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });

    // Prepare canvas using PDF page dimensions.
    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext('2d');

    if (canvas && canvasContext) {
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context.
      const renderContext = { canvasContext, viewport };
      page.render(renderContext);
    }
  };

  useEffect(() => {
    loadPdf(fileUrl);
  }, [fileUrl]);

  return (
    <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
      <ReaderAppBar handleBack={handleBack} fileName={fileName} />
      <Box sx={{ width: '100%', height: '100%', padding: 1 }}>
        <canvas ref={canvasRef}></canvas>
      </Box>
    </Box>
  );
};

export default Reader;

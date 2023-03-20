import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
// [ISSUE #6]
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import { TaskResult } from 'type/main';
import { ReaderAppBar, ReaderPage } from 'renderer/component/reader';

const Reader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileUrl = location.state.fileUrl || '';
  const fileName = location.state.fileName || '';
  const [source, setSource] = useState<pdfjsLib.PDFDocumentProxy>();
  const [pageIndexArray, setPageIndexArray] = useState<Array<number>>([]);

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
        const pdfSource = await pdfjsLib.getDocument(res.data).promise;
        const pageCount = pdfSource?.numPages || 0;
        setSource(pdfSource);
        setPageIndexArray(new Array(pageCount).fill(0).map((_, i) => i + 1));
      } else if (res.message === TaskResult.FAIL) {
        alert('Failed on opening source');
        navigate('/');
      }
    });
  };

  useEffect(() => {
    loadPdf(fileUrl);
  }, [fileUrl]);

  useEffect(() => {}, [source]);

  return (
    <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
      <ReaderAppBar handleBack={handleBack} fileName={fileName} />
      <Box
        sx={{
          width: '100%',
          height: '90vh',
          marginTop: '2px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'scroll',
        }}
      >
        {pageIndexArray.map((pageNumber, i) => {
          console.log('got item');
          return <ReaderPage key={i} pageNumber={pageNumber} source={source} />;
        })}
      </Box>
    </Box>
  );
};

export default Reader;

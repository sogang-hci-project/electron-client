import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { OverridableComponent } from '@mui/types';

import { BoxTypeMap } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
// [ISSUE #6]
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import { TaskResult } from 'type/main';
import { ReaderAppBar, ReaderPage } from 'renderer/component/reader';

interface PageWrapper {
  index: number;
  isActive: boolean;
}

const Reader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileUrl = location.state.fileUrl || '';
  const fileName = location.state.fileName || '';
  const [source, setSource] = useState<pdfjsLib.PDFDocumentProxy>();
  const [pageWrapperArray, setPageWrapperArray] = useState<Array<PageWrapper>>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);
  const [magnification, setMagnification] = useState(1);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const pageMargin = 2;

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
        setPageWrapperArray(
          new Array(pageCount).fill(0).map((_, i) => {
            if (i < 5) {
              return { index: i + 1, isActive: true };
            } else {
              return { index: i + 1, isActive: false };
            }
          })
        );
      } else if (res.message === TaskResult.FAIL) {
        alert('Failed on opening source');
        navigate('/');
      }
    });
  };

  const computeIndex = () => {
    const computedIndex =
      ~~(
        (pageContainerRef.current?.scrollTop || 0) /
        (pageHeight + pageMargin)
      ) + 1;
    setCurrentPage(computedIndex);
  };

  useEffect(() => {
    fileUrl && loadPdf(fileUrl);
  }, []);

  useEffect(() => {
    pageContainerRef.current &&
      pageContainerRef.current.addEventListener('scroll', computeIndex, {
        passive: true,
      });
    pageContainerRef.current &&
      setPageHeight(pageContainerRef.current.clientHeight);

    return () => {
      pageContainerRef.current &&
        pageContainerRef.current.removeEventListener('scroll', computeIndex);
    };
  }, [pageContainerRef]);

  useEffect(() => {
    const newArray = pageWrapperArray.map((pageWrapper) => {
      const isActive = Math.abs(pageWrapper.index - currentPage) < 3;
      return { ...pageWrapper, isActive };
    });
    setPageWrapperArray(newArray);
  }, [currentPage]);

  return (
    <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
      <ReaderAppBar
        handleBack={handleBack}
        fileName={fileName}
        magnification={magnification}
        setMagnification={setMagnification}
        currentPage={currentPage}
        totalPage={source?.numPages || 0}
      />
      <div
        style={{
          width: '100%',
          height: '90vh',
          marginTop: pageMargin,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'scroll',
        }}
        ref={pageContainerRef}
      >
        {pageWrapperArray.map((pageWrapper, i) => {
          return (
            <ReaderPage
              key={i}
              pageNumber={pageWrapper.index}
              pageHeight={pageHeight * magnification}
              source={source}
              isActive={pageWrapper.isActive}
            />
          );
        })}
      </div>
    </Box>
  );
};

export default Reader;

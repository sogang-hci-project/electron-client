import React, { useRef, useState, useEffect } from 'react';
import { ReaderPage } from '@component/reader';
import { ReaderPageBar } from '@component/reader';
import * as pdfjsLib from '@pdf/legacy/build/pdf';
import Box from '@mui/material/Box';

interface PageStatus {
  index: number;
  isActive: boolean;
}

interface ReaderPageViewerProps {
  source: pdfjsLib.PDFDocumentProxy | null;
}

export const ReaderPageViewer = ({ source }: ReaderPageViewerProps) => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);
  const [pageZoom, setPageZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageMargin = 2;
  const [pageStatus, setPageStatus] = useState<Array<PageStatus>>([]);

  const getCurrentPage = () => {
    const newIndex =
      ~~(
        (pageContainerRef.current?.scrollTop || 0) /
        ((pageHeight + pageMargin) * pageZoom)
      ) + 1;
    setCurrentPage(newIndex);
  };

  const changeCurrentPage = (page: number) => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop =
        (pageHeight + pageMargin) * pageZoom * (page - 1);
    }
    getCurrentPage();
  };

  useEffect(() => {
    pageContainerRef.current &&
      pageContainerRef.current.addEventListener('scroll', getCurrentPage, {
        passive: true,
      });
    pageContainerRef.current &&
      setPageHeight(pageContainerRef.current.clientHeight);

    return () => {
      pageContainerRef.current &&
        pageContainerRef.current.removeEventListener('scroll', getCurrentPage);
    };
  }, [pageContainerRef, pageHeight, pageZoom]);

  useEffect(() => {
    const pageCount = source?.numPages || 0;
    setPageStatus(
      new Array(pageCount).fill(0).map((_, i) => {
        if (i < 5) {
          return { index: i + 1, isActive: true };
        } else {
          return { index: i + 1, isActive: false };
        }
      })
    );
  }, [source]);

  useEffect(() => {
    const newArray = pageStatus.map((status) => {
      const isActive = Math.abs(status.index - currentPage) < 3;
      return { ...status, isActive };
    });
    setPageStatus(newArray);
  }, [currentPage]);

  return (
    <Box>
      <ReaderPageBar
        pageZoom={pageZoom}
        setPageZoom={setPageZoom}
        currentPage={currentPage}
        changeCurrentPage={changeCurrentPage}
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
        {pageStatus.map((pageWrapper, i) => {
          return (
            <ReaderPage
              key={i}
              pageNumber={pageWrapper.index}
              pageHeight={pageHeight * pageZoom}
              source={source}
              isActive={pageWrapper.isActive}
            />
          );
        })}
      </div>
    </Box>
  );
};

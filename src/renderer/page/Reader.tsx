import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { OverridableComponent } from '@mui/types';

import { BoxTypeMap } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import * as pdfjsLib from '@native_modules/pdfjs-dist';
import { ReaderAppBar, ReaderPage, ReaderPageViewer } from '@component/reader';
// [ISSUE #6]
// @ts-ignore
import { useAppDispatch } from '../store';
import useSource from '../hook/useSource';

interface PageWrapper {
  index: number;
  isActive: boolean;
}

const Reader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileUrl = location.state.fileUrl || '';
  const fileName = location.state.fileName || '';
  const { source } = useSource({ sourceUrl: fileUrl });

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
      <ReaderAppBar handleBack={handleBack} fileName={fileName} />
      <ReaderPageViewer source={source} />
    </Box>
  );
};

export default Reader;

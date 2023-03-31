import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  InputBase,
  TextField,
  Slider,
  Chip,
} from '@mui/material';
import {
  VscSearchFuzzy,
  VscChevronLeft,
  VscDebugReverseContinue,
  VscDebugContinue,
  VscDebugStop,
  VscZoomIn,
  VscZoomOut,
} from 'react-icons/vsc';

interface ReaderPageBarProps {
  pageZoom: number;
  setPageZoom: Dispatch<SetStateAction<number>>;
  changeCurrentPage: (page: number) => void;
  currentPage: number;
  totalPage: number;
}

export const ReaderPageBar = ({
  pageZoom,
  setPageZoom,
  changeCurrentPage,
  currentPage,
  totalPage,
}: ReaderPageBarProps) => {
  // [#7] 줌인, 줌아웃시 렌더링이 반복되는 문제
  const zoomIn = () => {
    setPageZoom(Math.round((pageZoom + 0.1) * 10) / 10);
  };
  const zoomOut = () => {
    setPageZoom(Math.round((pageZoom - 0.1) * 10) / 10);
  };
  const handlePageChange = (event: Event, newValue: number | number[]) => {
    const v = Array.isArray(newValue) ? newValue[0] : newValue;
    changeCurrentPage(v);
  };

  return (
    <AppBar position="static" color="secondary" elevation={1}>
      <Toolbar
        variant="dense"
        sx={{ backgroundColor: 'white', color: 'black' }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
              <Chip label={`${currentPage}/${totalPage}`} variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 2,
              }}
            >
              <Slider
                aria-label="Temperature"
                defaultValue={currentPage}
                value={currentPage}
                valueLabelDisplay="auto"
                min={1}
                max={totalPage}
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
          <Grid item xs={0}></Grid>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton size="small">
                <VscDebugReverseContinue />
              </IconButton>
              <IconButton size="small">
                <VscDebugStop />
              </IconButton>
              <IconButton size="small">
                <VscDebugContinue />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <IconButton size="small" onClick={zoomIn}>
                <VscZoomIn />
              </IconButton>
              <IconButton size="small" onClick={zoomOut}>
                <VscZoomOut />
              </IconButton>
              <Chip
                label={`${Math.round(pageZoom * 100)} %`}
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

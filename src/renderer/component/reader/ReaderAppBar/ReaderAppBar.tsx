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
import { styled, alpha } from '@mui/material/styles';
import {
  VscSearchFuzzy,
  VscChevronLeft,
  VscDebugReverseContinue,
  VscDebugContinue,
  VscDebugStop,
  VscZoomIn,
  VscZoomOut,
} from 'react-icons/vsc';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface ReaderAppBarProps {
  handleBack: () => void;
  fileName: string;
  magnification: number;
  setMagnification: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPage: number;
}

export const ReaderAppBar = ({
  handleBack,
  fileName,
  magnification,
  setMagnification,
  currentPage,
  totalPage,
}: ReaderAppBarProps) => {
  const zoomIn = () => {
    setMagnification(Math.round((magnification + 0.1) * 10) / 10);
  };
  const zoomOut = () => {
    setMagnification(Math.round((magnification - 0.1) * 10) / 10);
  };

  return (
    <AppBar position="static" color="secondary" elevation={1}>
      <Toolbar variant="dense">
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            xs={9}
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              onClick={handleBack}
            >
              <VscChevronLeft />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              fontSize={17}
              sx={{ overflow: 'clip' }}
            >
              {`${fileName}`}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Search>
              <SearchIconWrapper>
                <VscSearchFuzzy />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Grid>
        </Grid>
      </Toolbar>
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
                defaultValue={30}
                // getAriaValueText={30}
                valueLabelDisplay="auto"
                step={20}
                marks
                min={10}
                max={100}
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
                label={`${Math.round(magnification * 100)} %`}
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

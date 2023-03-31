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
import { useNavigate } from 'react-router-dom';

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
  fileName: string;
  handleBack: () => void;
}

export const ReaderAppBar = ({ fileName, handleBack }: ReaderAppBarProps) => {
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
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whitespace: 'nowrap',
                wordWrap: 'break-word',
                maxHeight: '1.5rem',
                maxWidth: '80%',
              }}
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
    </AppBar>
  );
};

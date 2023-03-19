import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {
  VscSearchFuzzy,
  VscChevronLeft,
  VscDebugReverseContinue,
  VscDebugContinue,
  VscDebugStop,
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
}

export const ReaderAppBar = ({ handleBack, fileName }: ReaderAppBarProps) => {
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
            <Typography variant="h6" color="inherit" fontSize={17}>
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
          <IconButton size="small">
            <VscDebugReverseContinue />
          </IconButton>
          <IconButton size="small">
            <VscDebugStop />
          </IconButton>
          <IconButton size="small">
            <VscDebugContinue />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

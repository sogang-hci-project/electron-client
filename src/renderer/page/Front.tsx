import React from 'react';
import { Container, Button, Typography, Grid, Paper, Box } from '@mui/material';
import { GiLighthouse } from 'react-icons/gi';
import { FileType, TargetType, TaskResult } from 'type/main';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import PackageJson from '../../../package.json';

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

const Front = () => {
  const navigate = useNavigate();

  const handleLoadPDF = () => {
    window.electron.fileHandler.getFileUrl({
      type: FileType.PDF,
    });

    window.electron.fileHandler.onFileUrl(async (res) => {
      console.log(res);
      if (res.message === TaskResult.SUCCESS) {
        navigate('/reader', {
          state: { fileUrl: res.data.fileUrl, fileName: res.data.fileName },
        });
      } else if (res.message === TaskResult.FAIL) {
        alert('Failed on Loading Resources');
      }
    });
  };

  return (
    <React.Fragment>
      <Paper style={{ width: '30rem', height: '30rem' }} elevation={1}>
        <Grid container style={{ width: '100%', height: '100%' }}>
          <Grid item xs={12}>
            <CenteredBox>
              <Box padding={3}>
                <GiLighthouse size={50} />
              </Box>
              <Typography variant="h4" color="black" gutterBottom={true}>
                Lighthouse
              </Typography>
              <Typography variant="h6" fontSize={18}>
                Escort towards vast ocean of information
              </Typography>
            </CenteredBox>
          </Grid>
          <Grid item xs={6}>
            <CenteredBox>
              <Button variant="outlined" size="large" onClick={handleLoadPDF}>
                PDF 문서 읽기
              </Button>
            </CenteredBox>
          </Grid>
          <Grid item xs={6} justifyContent="center" alignItems="center">
            <CenteredBox>
              <Button variant="outlined" size="large">
                웹브라우저
              </Button>
            </CenteredBox>
          </Grid>
          <Grid item xs={12}>
            <CenteredBox>
              <Typography variant="h6" fontSize={13}>
                Internal Test Version
              </Typography>
            </CenteredBox>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Front;

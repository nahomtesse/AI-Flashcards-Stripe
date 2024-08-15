'use client';


import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const GetStarted = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/get-started'); 
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2, backgroundColor: "#003B2C" }}
      onClick={handleButtonClick}
    >
      Get started
    </Button>
  );
};

export default GetStarted;

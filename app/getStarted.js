'use client';


import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { useAuth } from '@clerk/nextjs';


const GetStarted = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleButtonClick = () => {
    if (isSignedIn) {
      router.push('/generate');
    } else {
      router.push('/sign-in');
    }
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

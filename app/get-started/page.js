'use client';

import React, { useState } from 'react';
import { Typography, Box, Button, Grid, TextField } from '@mui/material';
import Head from 'next/head';

const GetStarted = () => {
  const [inputText, setInputText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGenerateFlashcards = () => {
    // Example hardcoded flashcard
    const generatedFlashcards = [
      { id: 1, question: 'This is a Question?', answer: 'This is the answer for the question.' },
    ];
    setFlashcards(generatedFlashcards);
  };

  return (
    <Box maxWidth='100vw' sx={{backgroundColor: '#081C15', color: '#D8F3DC', padding: 2}}>
      <Head>
        <title>Get Started - Career Flashcard SaaS</title>
        <meta name="description" content="Get started with Career Flashcard SaaS" />
      </Head>

      <Box textAlign='center' my={10}>
        <Typography variant="h2">Get Started</Typography>
        <Typography variant="h6" my={2}>
          Here you can start creating your flashcards and explore more features.
        </Typography>
      </Box>

      <Box my={10} textAlign='center'>
        <TextField
          label="Enter your text"
          multiline
          rows={4}
          variant="outlined"
          value={inputText}
          onChange={handleInputChange}
          sx={{ width: '100%', maxWidth: 600, mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#D8F3DC', 
              },
              '&:hover fieldset': {
                borderColor: '#95D5B2', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#95D5B2',
              },
            },
            '& .MuiInputBase-input': {
              color: '#D8F3DC', 
            },
          }} 
        />
        <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: "#003B2C" }} onClick={handleGenerateFlashcards}>
          Generate Flashcards
        </Button>

        <Box mt={4}>
          {flashcards.length > 0 && (
            <Grid container spacing={4} justifyContent='center'>
              {flashcards.map((flashcard) => (
                <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                  <Box sx={{ p: 3, backgroundColor: '#1B4332', borderRadius: 2 }}>
                    <Typography variant='h6' mb={2}>
                      {flashcard.question}
                    </Typography>
                    <Typography variant='body1'>
                      {flashcard.answer}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GetStarted;

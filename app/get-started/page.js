'use client';

import React, { useState } from 'react';
import { Typography, Box, Button, Grid, TextField, CardContent, Card } from '@mui/material';
import Head from 'next/head';

const GetStarted = () => {
  const [inputText, setInputText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGenerateFlashcards = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: inputText,
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('An error occurred while generating flashcards. Please try again.');
    }
  };

  return (
    <Box maxWidth="100vw" sx={{ backgroundColor: '#081C15', color: '#D8F3DC', padding: 2 }}>
      <Head>
        <title>Get Started - Career Flashcard SaaS</title>
        <meta name="description" content="Get started with Career Flashcard SaaS" />
      </Head>

      <Box textAlign="center" my={10}>
        <Typography variant="h2">Get Started</Typography>
        <Typography variant="h6" my={2}>
          Here you can start creating your flashcards and explore more features.
        </Typography>
      </Box>

      <Box my={10} textAlign="center">
        <TextField
          label="Enter your text"
          multiline
          rows={4}
          variant="outlined"
          value={inputText}
          onChange={handleInputChange}
          sx={{
            width: '100%',
            maxWidth: 600,
            mb: 2,
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
        <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#003B2C' }} onClick={handleGenerateFlashcards}>
          Generate Flashcards
        </Button>

        <Box mt={4}>
          {flashcards.length > 0 && (
            <Grid container spacing={4} justifyContent="center">
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" mb={2}>Front:</Typography>
                      <Typography>{flashcard.front}</Typography>
                      <Typography variant="h6" mb={2} sx={{ mt: 2 }}>Back:</Typography>
                      <Typography>{flashcard.back}</Typography>
                    </CardContent>
                  </Card>
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

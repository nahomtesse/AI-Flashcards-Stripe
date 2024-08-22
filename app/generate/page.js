'use client';

import React, { useState } from 'react';
import { Typography, Box, Button, Grid, TextField, CardContent, Card, CardActionArea, Container, Dialog, DialogContentText, DialogAction, DialogTitle, DialogActions, DialogContent  } from '@mui/material';
import Head from 'next/head';
import {useUser} from '@clerk/nextjs'
import {writeBatch} from 'firebase/firestore'
import {useRouter} from 'next/navigation'
import db from '@/firebase'
import {doc, collection,setDoc, getDoc } from 'firebase/firestore'



const GetStarted = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  const [inputText, setInputText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // const handleInputChange = (event) => {
  //   setInputText(event.target.value);
  // };

  const handleGenerateFlashcards = async () => {

    if (!inputText.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: inputText,
      })
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }
  
      const data = await response.json()
      setFlashcards(data.flashcards)
    } catch (error) {
      //console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
        ...prev,
        [id]: !prev[id],
    }))
    };

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const saveFlashcards = async () => {
      if (!name) {
        alert('Pleae enter a name')
        return
      }

      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        if (collections.find((f) => f.name === name)) {
          alert("Flashcard collection with the name already exists.")
          return;
        }
        else {
          collections.push({name})
          batch.set(userDocRef, {flashcards: collections}, {merge: true})
        }
      }

      else {
        batch.set(userDocRef, {flashcards: [{name}]})
      }

      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      })

      await batch.commit()
      handleClose()
      router.push('/flashcards')
    }

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
          onChange={(e) => setInputText(e.target.value)}
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
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      {/* <Typography variant="h6" mb={2}>Front:</Typography> */}
                      {/* <Typography>{flashcard.front}</Typography> */}
                      <Typography>{flipped[index] ? flashcard.back : flashcard.front}</Typography>
                    </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
            <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
              <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ mt: 2, backgroundColor: '#003B2C' }}>
                Save
              </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Save Flashcards</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter a name for your flashcards collection
                </DialogContentText>
                <TextField
                autoFocus
                margin='dense'
                label="Collection Name"
                type ="text"
                fullWidth 
                value={name}
                onChange={(e)=> setName(e.target.value)}
                variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveFlashcards}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default GetStarted;

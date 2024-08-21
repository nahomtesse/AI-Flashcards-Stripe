'use client'

import {useUser } from '@clerk/nextjs';

import { useEffect, useState } from "react"
import {collection, doc, getDoc, getDocs} from 'firebase/firestore'
import db from '@/firebase'
import { Typography, Box, Button, Grid, TextField, CardContent, Card, CardActionArea, Container, Dialog, DialogContentText, DialogAction, DialogTitle, DialogActions, DialogContent  } from '@mui/material';

import { useSearchParams } from "next/navigation"

export default function Flashcard() {
    

    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [collectionName, setCollectionName] = useState('')

    const searchParams = useSearchParams();
   
    const search = searchParams.get('id')
    

    useEffect(() => {
        async function getFlashcard() {
                 if (!search || !user) return;

                setCollectionName(search)
                const colRef = collection(doc(collection(db, 'users'), user.id), search)
                const docs = await getDocs(colRef)
                const flashcards = []

            docs.forEach((doc)=> {
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [search, user])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],        
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
        
    }

    return (
        <Container maxWidth="100vw" sx={{ backgroundColor: '#041c15', color: '#ffffff', paddingBottom: 4 }}>
        <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.length > 0 && (
                <Grid container spacing={4} justifyContent="center">
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ backgroundColor: '#0e3923', borderRadius: 2 }}>
                                <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#88d9a7' }}>
                                            {flipped[flashcard.id] ? 'Back:' : 'Front:'}
                                        </Typography>
                                        <Typography sx={{ color: '#c8f1e2' }}>
                                            {flipped[flashcard.id] ? flashcard.back : flashcard.front}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    </Container>
    )
}
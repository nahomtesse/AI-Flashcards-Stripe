'use client';

import {useUser} from '@clerk/nextjs'
import {useEffect, useState} from 'react'

import { collection, CollectionReference, doc, getDoc, setDoc } from 'firebase/firestore';
import db from '@/firebase'
import { useRouter } from 'next/navigation';
import { Card, CardActionArea, CardContent, Typography, Container, Grid } from '@mui/material';

export default function Flashcards() {
    const {isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return; 
                const docRef = doc(collection(db, 'users'), user.id)
                const docSnap = await getDoc(docRef)

                if(docSnap.exists()) {
                    const collections = docSnap.data().flashcards || []
                    setFlashcards(collections)
                }
                else {
                    await setDoc(docRef, {flashcards: []})
                }
                
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="xl" sx={{ backgroundColor: '#041c15', color: '#ffffff', paddingBottom: 4 }}>
        <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ backgroundColor: '#0e3923', borderRadius: 2, color: '#c8f1e2' }}>
                        <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: '#88d9a7' }}>
                                    {flashcard.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
    )

}
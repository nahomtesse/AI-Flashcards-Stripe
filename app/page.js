'use client';

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Container, Button , Box, Grid, Item} from "@mui/material";
import Head from 'next/head';
import zIndex from "@mui/material/styles/zIndex";
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();


  return (
    <Box maxWidth='100vw' sx={{backgroundColor: '#081C15', color: '#D8F3DC'}}>
      <Head>
        <title> Career Flashcard Saas</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static" sx={{backgroundColor: "#142C21", height: 80, justifyContent: 'center'}}>
        <Toolbar>
          <Typography variant="h4" style={{flexGrow: 1}}> 
              Career Flashcard Saas
          </Typography>

          <SignedOut>
            <Button color="inherit" variant="h5" onClick={() => router.push('/sign-in')}>
              Login
            </Button >
            <Button color="inherit" variant="h5" onClick={() => router.push('/sign-up')}>
              Signup
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box justifyContent={'center'} alignContent={'center'} textAlign={'center'} my={25}>
        <Typography variant="h2" >Welcome to flashcard Saas</Typography>
        <Typography>The easiest ways to make flash cards from scratch</Typography>
        <Button variant="contained" color="primary" sx={{mt:2, backgroundColor: "#003B2C"}}>
            Get started
        </Button>
      </Box>

      <Box my={20}>
          <Typography variant="h2" textAlign={'center'} mb={2}>
              Features
          </Typography>

          <Grid container spacing={4} padding={2} textAlign={'center'}>
          <Grid item xs={12}  sm={6} md={4} >
                <Typography variant='h6'>
                  Easy Text Input
                </Typography>
                <Typography variant='h6'>
                    Simply input your text and let our software do the rest. Creating flashcards has never been easier
                </Typography>
            </Grid>


            <Grid item xs={12}  sm={6} md={4} >
              <Typography variant='h6'>
                Search flashcards
              </Typography>
              <Typography variant='h6'>
                 Our AI intelligently  breaks down your text into concise flashcards, perfect for studying
              </Typography>
            </Grid>

            <Grid item xs={12}  sm={6} md={4} >
              <Typography variant='h6'>
               Accessible anywhere
              </Typography>
              <Typography variant='h6'>
                  Access your flashcards from any device. Study on the go with these
              </Typography>
            </Grid>

              
          </Grid>

          
      </Box>

      <Box my={6} textAlign={'center'}>
      <Typography variant="h2" textAlign={'center'} mb={2}>
              Pricing
      </Typography>


      <Grid container spacing={4} padding={2} justifyContent={'center'} alignContent={'center'}>

        <Grid item xs={12}   md={4} >
          <Box
          sx={{
            p: 3,
            backgroundColor: '#1B4332',
            borderRadius: 3,
            height: 400,
           
          }}
          justifyContent={'center'} alignContent={'center'}
          >
              <Typography variant='h4' mb={5}>
                  Basic
                </Typography>
                <Typography variant='h5' color={'#95D5B2'}>
                    $5 per month
                </Typography>
                <Typography variant='h6' mb={5}>
                    Access to badic card features and limited storage
                </Typography>

                <Button  sx={{backgroundColor :'#2D6A4F', color:'white'}} >
                  Choose basic
                </Button>
          
          </Box>
          </Grid>  


          

          <Grid item xs={12}  md={4} >
          <Box
          sx={{
            p: 3,
            backgroundColor: '#1B4332',
            borderRadius: 3,
            height: 400,
           
          }}
          justifyContent={'center'} alignContent={'center'}
          >
              <Typography variant='h4' mb={5}>
                  Pro
                </Typography>
                <Typography variant='h5' color={'#95D5B2'}>
                    $10 per month
                </Typography>
                <Typography variant='h6' mb={5}>
                    Unlimited flashcard and storage with priority reports
                </Typography>

                <Button  sx={{backgroundColor :'#2D6A4F', color:'white'}} >
                  Choose Pro
                </Button>
          
          </Box>
          </Grid>  

              
          </Grid>

      </Box>
    </Box>
  )
}

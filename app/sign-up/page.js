import { AppBar, Container, Toolbar, Link, Button, Typography, Box } from "@mui/material";
import { SignUp } from '@clerk/nextjs'


export default function SignUpPage()
{
    return (
        <Container maxWidth='sm'>
            <AppBar position="static" sx={{backgroundColor: "#081C15"}}>
                <Toolbar > 
                    <Typography variant="h6" sx={{
                        flexGrow: 1
                    }}>
                        Flashcard Saas
                    </Typography>
                </Toolbar>

                <Button color='inherit'>
                    <Link href="/sign-in" password>Login</Link>
                </Button>

                <Button color='inherit'>
                    <Link href="/sign-up" password>Sign Up</Link>
                </Button>
            </AppBar>

            <Box display='flex' flexDirection="column" alignItems='center' justifyContent='center'>
                    <Typography variant='h4'>
                        Sign Up
                    </Typography>
                    <SignUp />
            </Box>
        </Container>
    )
}
import { AppBar, Container, Toolbar, Link, Button, Typography, Box } from "@mui/material";
import { SignIn } from '@clerk/nextjs'


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
                    <Link href="/login" password>Login</Link>
                </Button>

                <Button color='inherit'>
                    <Link href="/signup" password>Signup</Link>
                </Button>
            </AppBar>

            <Box display='flex' flexDirection="column" alignItems='center' justifyContent='center'>
                    <Typography variant='h4'>
                        Signin
                    </Typography>
                    <SignIn />
            </Box>
        </Container>
    )
}
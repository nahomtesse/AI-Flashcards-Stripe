import { AppBar, Container, Toolbar, Link, Button, Typography, Box } from "@mui/material";
import { SignUp } from '@clerk/nextjs'


export default function SignUpPage() {
    return (
        <Box sx={{ backgroundColor: "#081C15", minHeight: "100vh", paddingTop: 4 }}>
            <Container maxWidth='sm'>
                <AppBar position="static" sx={{ backgroundColor: "#142C21" }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, color: "#D8F3DC" }}>
                            Flashcard Saas
                        </Typography>
                        <Button color='inherit'>
                            <Link href="/" sx={{ color: "#D8F3DC"}}>Home</Link>
                        </Button>
                        <Button color='inherit'>
                            <Link href="/sign-in" sx={{ color: "#D8F3DC"}}>Login</Link>
                        </Button>
                        <Button color='inherit'>
                            <Link href="/sign-up" sx={{ color: "#D8F3DC"}}>Signup</Link>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box display='flex' flexDirection="column" alignItems='center' justifyContent='center' sx={{ color: "#000000", mt: 4, p: 2, borderRadius: 1, backgroundColor: '#FFF', boxShadow: 3 }}>
                    <Typography variant='h4' sx={{ marginBottom: 2 }}>
                        Signup
                    </Typography>
                    <SignUp />
                </Box>
            </Container>
        </Box>
    )
}

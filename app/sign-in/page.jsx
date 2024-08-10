'use client';
import { useState, useCallback } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config'; // Ensure this path is correct
import { useRouter } from 'next/navigation';
import {
    Container,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Box,
    FormControl,
    Divider,
    Card,
    Alert
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components for better UI
const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    maxWidth: 400,
    width: '100%',
    textAlign: 'center'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontSize: '1rem',
}));

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    // Setting up router 
    const router = useRouter();

    const handleSignIn = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(email, password);
            sessionStorage.setItem('user', JSON.stringify(userCredential.user));
            sessionStorage.setItem('user', true)
            setEmail('');
            setPassword('');
            router.push('/');
        } catch (e) {
            setError('Failed to sign in. Please check your details and try again.');
            console.error('Sign-in error:', e.message);
        } finally {
            setLoading(false);
        }
    }, [email, password, signInWithEmailAndPassword, router]);

    return (
        <Container
            maxWidth="xs"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'background.default' }}
        >
            <StyledCard>
                <Typography variant="h5" gutterBottom>
                    Sign In
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box component="form" noValidate onSubmit={handleSignIn}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            id="email"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                    {error && (
                        <Alert severity="error" sx={{ my: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <StyledButton
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </StyledButton>
                </Box>
            </StyledCard>
        </Container>
    );
};

export default SignIn;

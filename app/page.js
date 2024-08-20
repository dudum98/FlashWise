import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import './globals.css'; // Import the global stylesheet

export default function HomePage() {
  return (
    <div>
      {/* Header and Navigation */}
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" className="glassy-header" style={{ flexGrow: 1 }}>
            FlashWise
          </Typography>
          <SignedOut>
            <Button className="glassy-button">
              <Link href="/sign-in" passHref>
                Login
              </Link>
            </Button>
            <Button className="glassy-button">
              <Link href="/sign-up" passHref>
                Sign Up
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" className="glassy-header" gutterBottom>
          Welcome to FlashWise
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Create Flashcards in Seconds
        </Typography>
        <Button className="glassy-button" variant="contained" sx={{ mt: 2, mr: 2 }} href="/generate">
          Get Started
        </Button>
        <Button className="glassy-button" variant="outlined" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px', margin: '0 auto' }}>
          Discover the powerful features of FlashWise that make flashcard creation easy and effective. From quick text import to customizable templates, and mobile-friendly access, we have everything you need to make studying a breeze.
        </Typography>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Pricing plans */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className="pricingCard">
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Free Plan
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                  $0/month
                </Typography>
                <Typography>
                  Basic features and limited flashcards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="pricingCard">
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Pro Plan
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                  $9.99/month
                </Typography>
                <Typography>
                  Unlimited flashcards and premium features.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt: 6, py: 4, backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} FlashWise. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a> | 
          <a href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none' }}> Terms of Service</a>
        </Typography>
      </Box>
    </div>
  );
}

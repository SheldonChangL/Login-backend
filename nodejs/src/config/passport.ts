// src/config/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LineStrategy } from 'passport-line';
import dotenv from 'dotenv';

dotenv.config();

interface User {
  id: string; // User ID in  system
  provider: string; // 'google', 'line', 'facebook'
  providerId: string; // ID from provider
  displayName: string;
  email?: string;
  // Other user info...
}

// TODO: Mock DB - Replace with actual database in production
const users: User[] = [];

passport.serializeUser((user: any, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  console.log('Deserializing user id:', id);
  const user = users.find(u => u.id === id);
  if (user) {
    console.log('User found:', user);
    done(null, user);
  } else {
    console.log('User not found for id:', id);
    done(new Error('User not found'), null);
  }
});

// --- Google Strategy ---
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'] // Ask Google for user info
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google Profile:', profile);
      try {
        // 1. Find user by Google ID
        let user = users.find(u => u.provider === 'google' && u.providerId === profile.id);

        if (user) {
          // 2. If found, return the user
          return done(null, user);
        } else {
          // 3. If not found, create a new user
          const newUser: User = {
            id: `google-${profile.id}`, // Create a unique ID in your system
            provider: 'google',
            providerId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value, // Get email (need scope: ['email'])
            // ... other info
          };
          users.push(newUser); // Save to mock database
          console.log('New Google user created:', newUser);
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }));
} else {
  console.warn('Google OAuth credentials not found in .env file. Google login disabled.');
}

// --- Line Strategy ---
if (process.env.LINE_CHANNEL_ID && process.env.LINE_CHANNEL_SECRET
  && process.env.LINE_CALLBACK_URL) {
  passport.use(new LineStrategy({
    channelID: process.env.LINE_CHANNEL_ID!,
    channelSecret: process.env.LINE_CHANNEL_SECRET!,
    callbackURL: process.env.LINE_CALLBACK_URL,
    scope: ['profile', 'email', 'openid'].join(' ')
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Line Profile:', profile);
      try {
        // 1. Find user by Line ID
        let user = users.find(u => u.provider === 'line' && u.providerId === profile.id);

        if (user) {
          // 2. If found, return the user
          return done(null, user);
        } else {
          // 3. If not found, create a new user
          const newUser: User = {
            id: `line-${profile.id}`, // Create a unique ID in your system
            provider: 'line',
            providerId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value, // Get email (need scope: ['email'])
            // ... other info
          };
          users.push(newUser); // Save to mock database
          console.log('New Line user created:', newUser);
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }));
} else {
  console.warn('Line OAuth credentials not found in .env file. Line login disabled.');
}

// --- Apple Strategy ---

export default passport;
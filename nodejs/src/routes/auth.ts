import express, { Response, Request, NextFunction } from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', (err: any, user: Express.User | false | null, info: any, status: any) => {
        if (err) {
            console.log('Authentication failed1:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed2 :', info);
            return res.redirect('/login'); // Go to login failed page
        }

        req.logIn(user, { session: true, keepSessionInfo: true }, (loginErr) => {
            if (loginErr) {
                console.log('User login failed:', loginErr);
                return next(loginErr);
            }
            console.log('User logged in:', user);
            return res.redirect('/profile');
        });
    })(req, res, next);
});

router.get('/line', passport.authenticate('line', { scope: ['profile', 'email', 'openid'] }));
router.get('/line/callback', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('line', (err: any, user: Express.User | false | null, info: any, status: any) => {
        if (err) {
            console.log('Authentication failed1:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed2 :', info);
            return res.redirect('/login'); // Go to login failed page
        }

        req.logIn(user, { session: true, keepSessionInfo: true }, (loginErr) => {
            if (loginErr) {
                console.log('User login failed:', loginErr);
                return next(loginErr);
            }
            console.log('User logged in:', user);
            return res.redirect('/profile');
        });
    })(req, res, next);
});

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    // Passport provides req.logout() method to clear user information in session
    // Need a callback function, because the new passport-session req.logout requires it
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        // After logout, usually clear session or cookie
        // cookie-session will automatically handle session cookie update/deletion at the end of the request
        console.log('User logged out');
        res.redirect('/'); // Redirect to home page or other public page
    });
});

// --- Check login status route (API) ---
// Provide to frontend to check if user is logged in
router.get('/status', (req: Request, res: Response) => {
    if (req.isAuthenticated()) { // Passport provides the check method
        res.json({ loggedIn: true, user: req.user }); // req.user is provided by deserializeUser
    } else {
        res.json({ loggedIn: false });
    }
});
export default router;
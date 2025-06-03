import express, { Application, Request, Response, Router } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport";
import authRoutes from "./routes/auth";
import { ensureAuth } from './middleware/authMiddleware'

dotenv.config();

const app = express();

const port = process.env.PORT || 3422;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'HelloSheLogin',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send(`
      <h1>Welcome to Login Page</h1>
      <p>Select a login method:</p>
      <ul>
        <li><a href="/auth/google">Use Google Login</a></li>
        <li><a href="/auth/line">Use LINE Login</a></li>
        <li><a href="/auth/facebook">Use Facebook Login</a></li>
      </ul>
      <p><a href="/profile">View Profile (Need Login)</a></p>
      <p><a href="/auth/status">View Login Status (API)</a></p>
      ${req.isAuthenticated() ? '<a href="/auth/logout">登出</a>' : ''}
    `);
});


app.get('/login', (req: Request, res: Response) => {
    res.status(401).send('<h1>登入失敗或需要登入</h1><p><a href="/">返回首頁</a></p>');
});

app.get('/profile', ensureAuth, (req: Request, res: Response) => {
    res.send(`
        <h1>個人資料</h1>
        <pre>${JSON.stringify(req.user, null, 2)}</pre>
        <p><a href="/">返回首頁</a></p>
        <p><a href="/auth/logout">登出</a></p>
    `);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

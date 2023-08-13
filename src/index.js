import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Analytics } from '@vercel/analytics/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Roboto:wght@300;400;500;700&display=swap"
                rel="stylesheet"
            />
        </head>
        <div class="header">
            <span class="title">HaxBall | Quiz</span>
            <a href="https://haxball-quiz.vercel.app/" class="active">Play</a>
            <a href='https://discord.gg/dtmAW486Tt' class="active"> Discord</a>
        </div>
        <title>HaxBall | Quiz</title>
        <App />
        <Analytics />
    </html>

);



import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let ready = false;

// Exporting a standard Vercel serverless function handler
export default async function handler(req: any, res: any) {
    try {
        if (!ready) {
            console.log("Initializing routes for Vercel Function...");
            await registerRoutes(app);
            ready = true;
            console.log("Routes initialized successfully.");
        }

        // Pass the request to Express
        app(req, res);
    } catch (err) {
        console.error("Critical Error in Vercel Function Initialization:", err);
        // Return a JSON error so we can see it in the response (if not already sent)
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "Server Initialization Failed",
                details: err instanceof Error ? err.message : String(err)
            });
        }
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Email template
function getEmailTemplate(name: string, role: string): string {
    const firstName = name.split(' ')[0];
    const roleText = role === 'artist' ? 'Artist / Service Provider' : 'Customer';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Mimora</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #E84A7F 0%, #d43d6f 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                Welcome to Mimora! 🎉
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px; color: #1E1E1E; font-size: 18px; font-weight: 600;">
                                Hi ${firstName},
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                                Thank you for joining the Mimora waitlist! We're thrilled to have you as part of our community.
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                                You've successfully registered as a <strong style="color: #E84A7F;">${roleText}</strong>, and we'll keep you updated on our launch progress.
                            </p>
                            
                            <!-- What's Next Box -->
                            <table role="presentation" style="width: 100%; background-color: #FFF0F5; border-radius: 12px; margin: 30px 0; border-left: 4px solid #E84A7F;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h2 style="margin: 0 0 16px; color: #1E1E1E; font-size: 18px; font-weight: 600;">
                                            What's Next?
                                        </h2>
                                        <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 15px; line-height: 1.8;">
                                            <li>We'll notify you as soon as we launch</li>
                                            <li>Get exclusive early access to our platform</li>
                                            <li>Be the first to experience beauty services on your terms</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                                Stay tuned for updates, and feel free to reach out if you have any questions!
                            </p>
                            
                            <p style="margin: 30px 0 0; color: #666; font-size: 16px; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #1E1E1E;">The Mimora Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #FAFAFA; padding: 30px; text-align: center; border-top: 1px solid #E5E5E5;">
                            <p style="margin: 0 0 12px; color: #999; font-size: 14px;">
                                Chennai, Tamil Nadu, India
                            </p>
                            <p style="margin: 0 0 12px; color: #999; font-size: 14px;">
                                <a href="mailto:support@mimora.co.in" style="color: #E84A7F; text-decoration: none;">support@mimora.co.in</a> • 
                                <a href="tel:+919677248878" style="color: #E84A7F; text-decoration: none;">+91 96772 48878</a>
                            </p>
                            <p style="margin: 0; color: #aaa; font-size: 12px;">
                                © 2025 Mimora. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Rate limiting (simple in-memory store - for production use Redis/Upstash)
const emailAttempts = new Map<string, number[]>();

function isRateLimited(email: string): boolean {
    const now = Date.now();
    const attempts = emailAttempts.get(email) || [];

    // Remove attempts older than 1 hour
    const recentAttempts = attempts.filter(time => now - time < 3600000);

    // Allow max 3 emails per hour per email address
    if (recentAttempts.length >= 3) {
        return true;
    }

    recentAttempts.push(now);
    emailAttempts.set(email, recentAttempts);
    return false;
}

// Input sanitization
function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .substring(0, 500); // Limit length
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // CORS headers
    const allowedOrigins = ['https://mimora.co.in', 'https://www.mimora.co.in'];
    const origin = req.headers.origin || '';

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error('Missing SMTP credentials');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { name, email, role } = req.body;

        // Validate input
        if (!name || !email || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email).toLowerCase();
        const sanitizedRole = sanitizeInput(role);

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitizedEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate role
        if (!['artist', 'customer'].includes(sanitizedRole)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // Validate name length
        if (sanitizedName.length < 2 || sanitizedName.length > 100) {
            return res.status(400).json({ error: 'Invalid name length' });
        }

        // Check rate limiting
        if (isRateLimited(sanitizedEmail)) {
            return res.status(429).json({ error: 'Too many requests. Please try again later.' });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: `"${process.env.FROM_NAME || 'Mimora Team'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
            to: sanitizedEmail,
            subject: "Welcome to Mimora - You're on the Waitlist! 🎉",
            html: getEmailTemplate(sanitizedName, sanitizedRole),
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);

        // Don't expose error details in production
        const errorMessage = process.env.NODE_ENV === 'development'
            ? (error as Error).message
            : 'Failed to send email';

        return res.status(500).json({
            error: 'Failed to send email',
            ...(process.env.NODE_ENV === 'development' && { details: errorMessage })
        });
    }
}

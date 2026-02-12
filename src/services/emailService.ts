/**
 * Email Service
 * Handles sending welcome emails via serverless function
 */

interface SendEmailParams {
    name: string;
    email: string;
    role: 'artist' | 'customer';
}

interface EmailResponse {
    success: boolean;
    message?: string;
    error?: string;
}

/**
 * Send welcome email to new waitlist subscriber
 * @param params User information
 * @returns Promise with success status
 */
export async function sendWelcomeEmail(params: SendEmailParams): Promise<EmailResponse> {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to send email');
        }

        return {
            success: true,
            message: data.message,
        };
    } catch (error) {
        console.error('Email service error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

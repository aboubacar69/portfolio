import { z } from 'zod';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api';

export const contactSchema = z.object({
    name: z.string().trim().nonempty({ message: 'Le nom est requis' }).max(100, { message: 'Maximum 100 caractères' }),
    email: z.string().trim().email({ message: 'Adresse email invalide' }).max(255, { message: 'Maximum 255 caractères' }),
    message: z.string().trim().nonempty({ message: 'Le message est requis' }).max(1000, { message: 'Maximum 1000 caractères' }),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export interface ApiFieldErrors {
    [field: string]: string[];
}

export class ApiError extends Error {
    status: number;
    fieldErrors?: ApiFieldErrors;

    constructor(message: string, status: number, fieldErrors?: ApiFieldErrors) {
        super(message);
        this.status = status;
        this.fieldErrors = fieldErrors;
    }
}

export async function sendContactMessage(payload: ContactPayload) {
    const res = await fetch(`${API_URL}/contact/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {

        const fieldErrors: ApiFieldErrors = {};
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) fieldErrors[key] = value as string[];
        });
        throw new ApiError(
            data.detail ?? "Une erreur est survenue lors de l'envoi du message.",
            res.status,
            Object.keys(fieldErrors).length ? fieldErrors : undefined
        );
    }

    return data as { detail: string; data: ContactPayload & { id: number; created_at: string } };
}

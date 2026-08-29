import { z } from 'zod';

// Reprend la même base que src/lib/api.ts (VITE_API_URL doit déjà inclure /api)
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api';

const ACCESS_KEY = 'admin_access_token';
const REFRESH_KEY = 'admin_refresh_token';

export function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

function setTokens(access: string, refresh?: string) {
    localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
}

export function isLoggedIn() {
    return !!getAccessToken();
}

export const loginSchema = z.object({
    username: z.string().trim().nonempty({ message: "Nom d'utilisateur requis" }),
    password: z.string().nonempty({ message: 'Mot de passe requis' }),
});
export type LoginPayload = z.infer<typeof loginSchema>;

export class AdminApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export async function login(payload: LoginPayload) {
    const res = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new AdminApiError(data.detail ?? 'Identifiants incorrects.', res.status);
    }
    setTokens(data.access, data.refresh);
    return data;
}

export function logout() {
    clearTokens();
}

async function refreshAccessToken(): Promise<boolean> {
    const refresh = getRefreshToken();
    if (!refresh) return false;
    const res = await fetch(`${API_URL}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    setTokens(data.access);
    return true;
}

/**
 * Appel authentifié : ajoute le token, et retente une fois automatiquement
 * si le token a expiré (401) en le rafraîchissant d'abord.
 */
async function authedFetch(path: string, options: RequestInit = {}, retry = true): Promise<Response> {
    const token = getAccessToken();
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...(options.headers ?? {}),
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 401 && retry) {
        const refreshed = await refreshAccessToken();
        if (refreshed) return authedFetch(path, options, false);
    }

    return res;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    ip_address: string | null;
    created_at: string;
}

export async function fetchMessages(): Promise<ContactMessage[]> {
    const res = await authedFetch('/contact/messages/');
    if (!res.ok) throw new AdminApiError('Impossible de charger les messages.', res.status);
    const data = await res.json();
    // DRF pagine parfois les résultats sous { results: [...] }
    return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchUnreadCount(): Promise<number> {
    const res = await authedFetch('/contact/messages/unread_count/');
    if (!res.ok) throw new AdminApiError('Impossible de charger le compteur.', res.status);
    const data = await res.json();
    return data.unread_count;
}

export async function markAsRead(id: number): Promise<ContactMessage> {
    const res = await authedFetch(`/contact/messages/${id}/mark_read/`, { method: 'PATCH' });
    if (!res.ok) throw new AdminApiError('Impossible de marquer le message comme lu.', res.status);
    return res.json();
}

export async function fetchCurrentUser() {
    const res = await authedFetch('/auth/me/');
    if (!res.ok) throw new AdminApiError('Session invalide.', res.status);
    return res.json();
}

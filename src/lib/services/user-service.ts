import type { User } from "@/lib/definitions";
import { getSession } from "@/lib/session";

async function getApiHeaders() {
    const session = await getSession();
    if (!session?.accessToken) {
        throw new Error("No estás autenticado.");
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
    };
}

async function getApiUrl(path: string): Promise<string> {
    const session = await getSession();
    const slug = session?.slug;
    if (!slug) {
        throw new Error("No se pudo encontrar el slug de la organización en la sesión.");
    }
    const baseUrl = "https://integrations.lambdaanalytics.co";
    return `${baseUrl}/${slug}/api/accounts/${path}`;
}

export async function getUsers(): Promise<User[]> {
    const headers = await getApiHeaders();
    const url = await getApiUrl('users/');
    const response = await fetch(url, { headers });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch users');
    }
    return response.json();
}

export async function getUserDetails(userId: number): Promise<User> {
    const headers = await getApiHeaders();
    const url = await getApiUrl(`users/${userId}/`);
    const response = await fetch(url, { headers });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch user details');
    }

    return response.json();
}

export async function createUser(data: Partial<User>): Promise<User> {
    const headers = await getApiHeaders();
    const url = await getApiUrl('users/');
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).join(', ');
        throw new Error(errorMessage || 'Failed to create user');
    }

    return response.json();
}

export async function updateUser(userId: number, data: Partial<User>): Promise<User> {
    const headers = await getApiHeaders();
    const url = await getApiUrl(`users/${userId}/`);
    const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).join(', ');
        throw new Error(errorMessage || 'Failed to update user');
    }

    return response.json();
}

export async function deleteUser(userId: number): Promise<void> {
    const headers = await getApiHeaders();
    const url = await getApiUrl(`users/${userId}/`);
    const response = await fetch(url, {
        method: 'DELETE',
        headers,
    });

    if (!response.ok && response.status !== 204) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete user');
    }
}

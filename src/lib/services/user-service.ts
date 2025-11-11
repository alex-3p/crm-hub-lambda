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

async function getSlug() {
    // In a real app, the slug might be part of the session or a global context
    // For now, we hardcode it based on the login form's default
    const session = await getSession();
    // This is a placeholder. You should get the slug from the session or another source.
    // Let's try to get it from the cookie if it exists.
    // This is a bit of a hack, we should store slug in the session.
    return 'pailaquinta';
}


export async function getUserDetails(userId: number): Promise<User> {
    const headers = await getApiHeaders();
    const slug = await getSlug();
    const response = await fetch(`https://crm-gateway.lambdaanalytics.co/${slug}/api/accounts/users/${userId}/`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch user details');
    }

    return response.json();
}

export async function updateUser(userId: number, data: Partial<User>): Promise<User> {
    const headers = await getApiHeaders();
    const slug = await getSlug();
    const response = await fetch(`https://crm-gateway.lambdaanalytics.co/${slug}/api/accounts/users/${userId}/`, {
        method: 'PATCH', // or PUT if your API uses it for updates
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update user');
    }

    return response.json();
}

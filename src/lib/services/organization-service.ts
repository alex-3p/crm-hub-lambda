import type { Organization } from "@/lib/definitions";
import { getSession } from "@/lib/session";

// NOTE: Organization management is usually super-admin only.
// This assumes the API calls do not require a slug prefix.
const baseUrl = "https://integrations.lambdaanalytics.co/api/orgs";

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

export async function getOrganizations(): Promise<Organization[]> {
    const headers = await getApiHeaders();
    const url = `${baseUrl}/organizations/`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch organizations');
    }
    return response.json();
}

export async function createOrganization(data: Partial<Organization>): Promise<Organization> {
    const headers = await getApiHeaders();
    const url = `${baseUrl}/organizations/`;
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).join(', ');
        throw new Error(errorMessage || 'Failed to create organization');
    }

    return response.json();
}

export async function updateOrganization(orgId: number, data: Partial<Organization>): Promise<Organization> {
    const headers = await getApiHeaders();
    const url = `${baseUrl}/organizations/${orgId}/`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).join(', ');
        throw new Error(errorMessage || 'Failed to update organization');
    }

    return response.json();
}

import type { DomusCredential } from "@/lib/definitions";
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
    return `${baseUrl}/${slug}/api/${path}`;
}

export async function getDomusCredentials(): Promise<DomusCredential> {
    const headers = await getApiHeaders();
    const url = await getApiUrl('domus/credentials/');
    const response = await fetch(url, { headers, cache: 'no-store' });

    if (!response.ok) {
        if(response.status === 404) {
            // This is not a critical error, it just means no credentials exist yet.
            // Return a default/empty structure.
            return {
                id: 0,
                crm_token: '',
                inventory_token: '',
                api_base: 'https://apiv3get.domus.la',
                crm_base: 'https://crm_api.domus.la',
                inmobiliaria: 1,
                grupo: '26007',
                requiere_grupo: true
            };
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch Domus credentials');
    }
    return response.json();
}

export async function updateDomusCredentials(data: Partial<DomusCredential>): Promise<DomusCredential> {
    const headers = await getApiHeaders();
    const url = await getApiUrl('domus/credentials/');
    const response = await fetch(url, {
        method: 'POST', // The backend uses POST for create/update
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).join(', ');
        throw new Error(errorMessage || 'Failed to update Domus credentials');
    }

    return response.json();
}

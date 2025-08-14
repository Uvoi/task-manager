const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const apiInstance = {
    get: async <T>(url: string): Promise<T> => {
            const res = await fetch(`${API_URL}${url}`, { headers: { 'Content-Type': 'application/json' } });
            if (!res.ok) throw new Error(`API error: ${res.status}`);
            return res.json();
    },
    post: async <T>(url: string, body: any): Promise<T> => {
        const res = await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
    },
    patch: async <T>(url: string, body: any): Promise<T> => {
        const res = await fetch(`${API_URL}${url}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
    },
};

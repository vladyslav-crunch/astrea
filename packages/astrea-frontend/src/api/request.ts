export async function request<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
}

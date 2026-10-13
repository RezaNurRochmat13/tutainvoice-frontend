export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch(path: string, init?: RequestInit): Promise<unknown> {
  const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!baseUrl) {
    throw new ApiError(0, 'VITE_API_URL is not set');
  }
  let res: Response;
  try {
    res = await fetch(`${baseUrl}${path}`, init);
  } catch {
    throw new ApiError(0, `Network error: GET ${path}`);
  }
  if (!res.ok) {
    throw new ApiError(res.status, `${res.status} ${path}`);
  }
  return res.json() as Promise<unknown>;
}

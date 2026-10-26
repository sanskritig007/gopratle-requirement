import { IRequirementFormData, IRequirementItem, IStatsSummary } from '@/types/requirement';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function createRequirement(data: IRequirementFormData): Promise<{ success: boolean; data: IRequirementItem; message?: string }> {
  const res = await fetch(`${API_BASE}/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    const errorMsg = json.errors ? json.errors.map((e: any) => e.message).join(', ') : json.message || 'Submission failed';
    throw new Error(errorMsg);
  }
  return json;
}

export async function fetchRequirements(params?: {
  category?: string;
  eventType?: string;
  search?: string;
  city?: string;
}): Promise<{ success: boolean; count: number; data: IRequirementItem[] }> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== 'all') query.append('category', params.category);
  if (params?.eventType && params.eventType !== 'all') query.append('eventType', params.eventType);
  if (params?.search) query.append('search', params.search);
  if (params?.city) query.append('city', params.city);

  const res = await fetch(`${API_BASE}/requirements?${query.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch requirements');
  }
  return res.json();
}

export async function fetchStats(): Promise<{ success: boolean; data: IStatsSummary }> {
  const res = await fetch(`${API_BASE}/requirements/stats/summary`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }
  return res.json();
}

export async function deleteRequirement(id: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/requirements/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete requirement');
  }
  return res.json();
}

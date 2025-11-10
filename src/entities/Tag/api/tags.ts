import { apiInstance } from '@/shared/api/apiInstance';
import { Tag } from '../model/types';

export const getTagsApi = (): Promise<Tag[]> => apiInstance.get('/tags');

export const createTagApi = (tag: Omit<Tag, 'id'>): Promise<Tag> =>
    apiInstance.post<Tag>('/tags', tag);
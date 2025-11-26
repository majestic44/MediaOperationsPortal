import dayjs from 'dayjs';

export const formatDateTime = (iso?: string | null) =>
  iso ? dayjs(iso).format('YYYY-MM-DD HH:mm') : '';

export const nowIso = () => new Date().toISOString();

// Shared constants and utilities for the app

export const userId = 203;

export const fetcher = (url) => fetch(url).then(res => res.json());

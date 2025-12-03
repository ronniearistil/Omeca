// src/shared/utils/useApiUrl.js

import { useMemo } from 'react';

export const useApiUrl = () => {
  const apiUrl = useMemo(() => {
    // 1. Production check using the environment variable set during build/deploy
    const prodUrl = import.meta.env.VITE_APP_API_URL;
    
    // 2. Default to your local FastAPI server for development
    const devUrl = 'http://127.0.0.1:8000'; 

    // Return the production URL if it exists, otherwise use the dev URL
    return prodUrl || devUrl;
  }, []);

  return apiUrl;
};
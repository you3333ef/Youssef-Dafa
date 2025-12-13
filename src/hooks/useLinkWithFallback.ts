import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLink } from './useSupabase';
import type { Link } from './useSupabase';

interface UseLinkWithFallbackReturn {
  data: Link | null;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  isTimeout: boolean;
  retryCount: number;
  handleRetry: () => void;
}

export const useLinkWithFallback = (linkId?: string): UseLinkWithFallbackReturn => {
  const [searchParams] = useSearchParams();
  const { data: linkData, isLoading, error, refetch } = useLink(linkId);
  
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const fallbackData = useRef<Link | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(dataParam)));
        fallbackData.current = decoded;
        console.log('Loaded fallback data from URL');
      } catch (e) {
        console.error('Failed to parse URL data:', e);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        console.warn('Link loading timeout exceeded');
        setLoadingTimeout(true);
      }, 8000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setLoadingTimeout(false);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setLoadingTimeout(false);
    refetch();
  };

  const effectiveData = linkData || fallbackData.current;

  return {
    data: effectiveData,
    isLoading: isLoading && !loadingTimeout && !effectiveData,
    error: loadingTimeout && !effectiveData ? new Error('Loading timeout') : error,
    refetch,
    isTimeout: loadingTimeout,
    retryCount,
    handleRetry,
  };
};

export const getDataParam = (data: any): string => {
  try {
    return btoa(encodeURIComponent(JSON.stringify(data)));
  } catch (e) {
    console.error('Failed to encode data:', e);
    return '';
  }
};

export const appendDataParam = (url: string, data: any): string => {
  try {
    const dataParam = getDataParam(data);
    if (!dataParam) return url;
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}data=${dataParam}`;
  } catch (e) {
    console.error('Failed to append data param:', e);
    return url;
  }
};

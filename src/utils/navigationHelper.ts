/**
 * Navigation Helper Utility
 * Preserves URL query parameters when navigating between payment pages
 */

/**
 * Build a navigation path with preserved query parameters
 * @param path - The target path (e.g., '/pay/123/details')
 * @param preserveParams - Array of param keys to preserve (default: ['company', 'currency', 'title', 'service'])
 * @returns Full path with query parameters
 */
export function buildNavigationPath(
  path: string, 
  preserveParams: string[] = ['company', 'currency', 'title', 'service']
): string {
  const urlParams = new URLSearchParams(window.location.search);
  const params: string[] = [];
  
  preserveParams.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      params.push(`${param}=${encodeURIComponent(value)}`);
    }
  });
  
  if (params.length > 0) {
    return `${path}?${params.join('&')}`;
  }
  
  return path;
}

/**
 * Get the company parameter from URL
 * @returns Company key or default 'aramex'
 */
export function getCompanyFromUrl(): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('company') || urlParams.get('service') || 'aramex';
}

/**
 * Get the currency parameter from URL
 * @returns Currency code or default 'SAR'
 */
export function getCurrencyFromUrl(): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('currency') || 'SAR';
}

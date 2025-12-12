import { Context } from "https://edge.netlify.com";

// Short link redirects - map short codes to full payment URLs
interface ShortLink {
  id: string;
  company: string;
  currency: string;
  amount?: string;
  title?: string;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Check if this is a short link path like /p/ABC123
  const shortLinkMatch = url.pathname.match(/^\/p\/([a-zA-Z0-9]+)$/);
  
  if (shortLinkMatch) {
    const shortCode = shortLinkMatch[1];
    
    // Try to decode the short code to get payment details
    try {
      // For now, redirect to a generic payment page
      // Later, you can store these mappings in a database
      const redirectUrl = `${url.origin}/pay/${shortCode}/recipient${url.search}`;
      
      return Response.redirect(redirectUrl, 302);
    } catch (error) {
      console.error('[Short Link] Error:', error);
    }
  }
  
  return await context.next();
};

export const config = {
  path: ["/p/*"],
};

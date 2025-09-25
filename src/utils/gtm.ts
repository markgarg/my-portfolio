/**
 * Google Tag Manager utility functions for tracking events
 * Works with our enhanced accessibility components
 */

// Extend window object to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Push event to Google Tag Manager data layer
 * @param event - Event name 
 * @param data - Additional event data
 */
export const trackEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track timeline interactions
 * @param timelineItem - The timeline item that was interacted with
 * @param action - The type of interaction (view, focus, etc.)
 */
export const trackTimelineInteraction = (timelineItem: string, action: 'view' | 'focus' | 'click' = 'view') => {
  trackEvent('timeline_interaction', {
    timeline_item: timelineItem,
    timeline_action: action,
    component_type: 'timeline',
  });
};

/**
 * Track external link clicks
 * @param linkName - Name of the external link (GitHub, LinkedIn, etc.)
 * @param url - The URL being visited
 */
export const trackExternalLinkClick = (linkName: string, url: string) => {
  trackEvent('external_link_click', {
    link_name: linkName,
    link_url: url,
    component_type: 'external_link',
  });
};

/**
 * Track page views with enhanced data
 * @param path - Page path
 * @param title - Page title
 * @param additionalData - Any additional page-specific data
 */
export const trackPageView = (path: string, title: string, additionalData: Record<string, any> = {}) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
    page_type: getPageType(path),
    ...additionalData,
  });
};

/**
 * Track accessibility interactions (skip links, keyboard navigation, etc.)
 * @param interaction - Type of accessibility interaction
 * @param component - Component being interacted with
 */
export const trackAccessibilityInteraction = (interaction: string, component: string) => {
  trackEvent('accessibility_interaction', {
    interaction_type: interaction,
    component_name: component,
    accessibility_feature: true,
  });
};

/**
 * Track blog post interactions
 * @param postSlug - Blog post slug
 * @param action - Type of interaction
 * @param additionalData - Additional post data
 */
export const trackBlogPostInteraction = (
  postSlug: string, 
  action: 'view' | 'share' | 'scroll_depth', 
  additionalData: Record<string, any> = {}
) => {
  trackEvent('blog_post_interaction', {
    post_slug: postSlug,
    post_action: action,
    component_type: 'blog_post',
    ...additionalData,
  });
};

/**
 * Determine page type from path
 * @param path - Current page path
 * @returns Page type string
 */
const getPageType = (path: string): string => {
  if (path === '/') return 'homepage';
  if (path.startsWith('/blog')) return 'blog';
  if (path.startsWith('/about')) return 'about';
  if (path.includes('/20')) return 'blog_post'; // Blog posts have dates
  return 'other';
};

/**
 * Initialize GTM with enhanced tracking for accessibility components
 */
export const initializeGTM = () => {
  if (typeof window === 'undefined') return;

  // Track skip link usage
  const skipLinks = document.querySelectorAll('a[href^="#"]');
  skipLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackAccessibilityInteraction('skip_link_used', 'skip_navigation');
    });
  });

  // Track timeline focus for accessibility
  const timelineElements = document.querySelectorAll('[role="listitem"]');
  timelineElements.forEach((element, index) => {
    element.addEventListener('focus', () => {
      const title = element.querySelector('h3')?.textContent || `Timeline item ${index}`;
      trackTimelineInteraction(title, 'focus');
    });
  });

  // Track external link clicks
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    link.addEventListener('click', () => {
      const linkName = link.getAttribute('aria-label') || link.textContent || 'External Link';
      const url = link.getAttribute('href') || '';
      trackExternalLinkClick(linkName, url);
    });
  });
};

/**
 * GTM configuration for Google Analytics 4
 * Use this configuration in your GTM container
 */
export const GA4_GTM_CONFIG = {
  // Tag configuration for GA4 in GTM:
  tag_name: "Google Analytics: GA4 Configuration",
  tag_type: "Google Analytics: GA4 Configuration",
  measurement_id: "G-1GFVN7ZGG6", // Your existing GA4 measurement ID
  
  // Enhanced measurement settings
  enhanced_measurement: {
    page_views: true,
    scrolls: true,
    outbound_clicks: true,
    site_search: false, // Enable if you add search
    video_engagement: false,
    file_downloads: true,
  },
  
  // Custom dimensions to track (configure in GA4):
  custom_dimensions: {
    timeline_interactions: "timeline_item",
    accessibility_usage: "accessibility_feature", 
    component_interactions: "component_type",
    page_type: "page_type",
  }
};

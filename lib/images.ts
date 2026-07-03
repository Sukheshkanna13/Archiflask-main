// Central registry mapping design image-slot ids → /public image paths.
// Real ArchiFlask product screenshots are wired below; slots left undefined
// (e.g. founder headshots) render the branded placeholder until supplied.

export const FEATURE_IMAGES: Record<string, string | undefined> = {
  "af-feat-drawings": "/images/feature-drawings-ai-v2.png",
  "af-feat-effort": "/images/taskboard.png",
};

export const CLIENT_APP_IMAGE: string | undefined = "/images/app-screenshot.jpeg";

export const ABOUT_STORY_IMAGE: string | undefined = "/images/about-story-ai.png";

export const FOUNDER_IMAGES: Record<string, string | undefined> = {
  "af-founder-1": undefined,
  "af-founder-2": undefined,
};

export const BLOG_IMAGES: Record<string, string | undefined> = {
  "af-blog-feat": "/images/blog-feat-v2.png",
  "af-blog-1": "/images/blog-1-v2.png",
  "af-blog-2": "/images/blog-2-v2.png",
  "af-blog-3": "/images/blog-3-v2.png",
  "af-blog-4": "/images/blog-4-v2.png",
  "af-blog-5": "/images/blog-5-v2.png",
  "af-blog-6": "/images/blog-6-v2.png",
  "af-blog-7": "/images/blog_vendors.png",
  "af-blog-8": "/images/blog_finance.png",
  "af-blog-9": "/images/blog_collaboration.png",
};

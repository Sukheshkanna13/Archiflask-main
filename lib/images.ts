// Central registry mapping design image-slot ids → /public image paths.
// Slots without a real asset stay undefined and render the branded placeholder.
// Populated in Task 17 (wire real uploads).

export const FEATURE_IMAGES: Record<string, string | undefined> = {
  "af-feat-drawings": undefined,
  "af-feat-effort": undefined,
};

export const CLIENT_APP_IMAGE: string | undefined = undefined;

export const ABOUT_STORY_IMAGE: string | undefined = undefined;

export const FOUNDER_IMAGES: Record<string, string | undefined> = {
  "af-founder-1": undefined,
  "af-founder-2": undefined,
};

export const BLOG_IMAGES: Record<string, string | undefined> = {
  "af-blog-feat": undefined,
  "af-blog-1": undefined,
  "af-blog-2": undefined,
  "af-blog-3": undefined,
  "af-blog-4": undefined,
  "af-blog-5": undefined,
  "af-blog-6": undefined,
};

"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BLOG_FEATURED, BLOG_POSTS } from "@/lib/content";

type BlogPostFull = {
    slotId: string;
    category: string;
    title: string;
    body: string;
    read?: string;
    meta?: string[];
    heroImage: string;
    fullContent: string;
};

const ALL_BLOG_POSTS: BlogPostFull[] = [
    {
        ...BLOG_FEATURED,
        heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=800&fit=crop",
        fullContent: `
      <p>Architecture firms are facing unprecedented pressure to scale while maintaining the quality and control that made them successful. In today's fast-paced environment, many owners find themselves drowning in emails, WhatsApp messages, and scattered project information.</p>
      
      <h2>The Problem with Running a Firm from Your Head</h2>
      <p>When you start an architecture practice, it's just you and maybe a small team. You can keep track of everything in your head. But as you grow, this model breaks down. Projects multiply, deadlines stack up, and critical information gets lost in translation.</p>
      
      <p>You can't grow a practice you're running out of your head, your inbox, and a dozen WhatsApp groups. Here's how firm owners move from memory to a system, and what changes when they do.</p>
      
      <h2>Moving from Chaos to a System</h2>
      <p>The first step toward scaling successfully is implementing a centralized system that captures all project information, communication, and documentation in one place. This eliminates the need to rely on individual memory or scattered communication channels.</p>
      
      <p>Firms that make this transition report a 40% reduction in miscommunication and a 35% improvement in project delivery timelines. The investment in a proper system pays for itself many times over in saved time and reduced errors.</p>
      
      <h2>What Changes When You Systematize</h2>
      <p>When everything is in one place, you gain visibility across all your projects. You can track progress, identify bottlenecks, and allocate resources effectively. Your team knows exactly what they need to do, and clients are always in the loop.</p>
      
      <p>Perhaps most importantly, you free up your time as an owner to focus on what you do best – creating great architecture – rather than spending hours every day managing communication and chasing information.</p>
    `
    },
    ...BLOG_POSTS.map((post, index) => ({
        ...post,
        heroImage: `https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&h=800&fit=crop&sig=${index}`,
        fullContent: `
      <p>${post.body}</p>
      <p>This comprehensive guide takes you through everything you need to know about implementing these practices in your own architecture firm. We've worked with dozens of firms that have successfully transformed their operations by following this framework.</p>
      
      <h2>Why This Matters for Your Firm</h2>
      <p>In today's competitive landscape, firms that can operate efficiently and scale without losing control are the ones that will thrive. The old ways of managing projects simply don't work as you take on more work and grow your team.</p>
      
      <p>By implementing the strategies outlined in this article, you'll be able to take on more projects, maintain quality, and keep your team aligned – all while reducing stress and improving profitability.</p>
      
      <h2>Getting Started Today</h2>
      <p>The best time to start systematizing your firm is now. Pick one area where you're experiencing the most pain, whether that's drawing revisions, communication, or project tracking, and implement a solution for that first. Once you see the improvements, you can expand to other areas.</p>
      
      <p>Many firm owners are surprised at how quickly these changes transform their operations. Within weeks, you'll wonder how you ever managed without a centralized system.</p>
    `
    }))
];

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function BlogDetailsPage() {
    const params = useParams();
    const slug = params.slug as string;

    const post = ALL_BLOG_POSTS.find(p => slugify(p.title) === slug);

    if (!post) {
        return (
            <main className="animate-on-scroll relative z-[2] bg-white px-5 py-[120px] md:px-6">
                <div className="mx-auto max-w-[900px] text-center">
                    <h1 className="text-[40px] font-bold">Blog post not found</h1>
                    <p className="mt-4 text-gray-600">The blog post you're looking for doesn't exist.</p>
                    <Link href="/blog" className="mt-8 inline-block">
                        <button className="rounded-full bg-black px-6 py-3 text-white hover:scale-[1.04] transition-transform duration-300">
                            Back to Blog
                        </button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="relative z-[2]">
            {/* Hero Section */}
            <section className="animate-on-scroll bg-white mt-18">
                <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                    <img
                        src={post.heroImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="mx-auto max-w-[900px] px-5 py-16 md:px-6">
                    <Reveal y={30} duration={0.8}>
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to all posts
                        </Link>
                    </Reveal>

                    <Reveal y={30} delay={0.1} duration={0.8}>
                        <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-gray-500">
                            {post.category}
                        </div>
                    </Reveal>

                    <Reveal y={30} delay={0.15} duration={0.8}>
                        <h1 className="mt-4 text-[clamp(32px,5vw,48px)] font-semibold leading-[1.08] tracking-[-0.028em]">
                            {post.title}
                        </h1>
                    </Reveal>

                    <Reveal y={30} delay={0.2} duration={0.8}>
                        <div className="mt-4 flex items-center gap-4 text-[14px] text-gray-500">
                            <span>{post.read || (post.meta && post.meta[0]) || "5 min read"}</span>
                            <span>·</span>
                            <span>{post.meta && post.meta[1] || "June 2026"}</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="animate-on-scroll bg-white pb-20">
                <div className="mx-auto max-w-[750px] px-5 md:px-6">
                    <Reveal y={30} delay={0.25} duration={0.8}>
                        <div
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: post.fullContent }}
                            style={{
                                lineHeight: '1.8',
                                fontSize: '18px'
                            }}
                        />
                    </Reveal>

                    <Reveal y={30} delay={0.3} duration={0.8}>
                        <div className="mt-16 border-t border-gray-200 pt-12">
                            <Link href="/blog">
                                <button className="af-card inline-flex items-center rounded-full border border-black/10 bg-white px-6 py-3 text-[15px] font-semibold hover:bg-gray-50 transition-all duration-300">
                                    Continue reading more posts
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
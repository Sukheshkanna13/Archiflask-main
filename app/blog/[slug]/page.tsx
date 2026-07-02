import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BLOG_FEATURED, BLOG_POSTS } from "@/lib/content";
import { BLOG_IMAGES } from "@/lib/images";

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

// Add detailed sectioned content for each blog post
const BLOG_FULL_CONTENTS: Record<string, string> = {
    "af-blog-feat": `
        <p>${BLOG_FEATURED.body}</p>
        <h2>The Hidden Costs of Scaling Without Systems</h2>
        <p>When firms try to grow without implementing proper systems, they often encounter a range of hidden costs that eat into profitability. From miscommunicated project requirements to lost documentation, these issues can quickly derail even the most promising growth plans.</p>
        <h2>Step 1: Document Your Core Processes</h2>
        <p>The first step to building a scalable firm is to document every core process. This includes everything from client onboarding to project handover. When everyone follows the same documented process, you eliminate guesswork and ensure consistency across all projects.</p>
        <h2>Step 2: Choose the Right Tools</h2>
        <p>Investing in the right technology stack is crucial. Look for tools that integrate well with each other and can grow with your firm. A centralized project management platform that handles documentation, communication, and tracking is essential for modern architecture firms.</p>
        <h2>Step 3: Train Your Team</h2>
        <p>Even the best systems won't work if your team isn't properly trained. Invest time in training everyone on your new processes and tools. This initial investment will pay off many times over in increased efficiency and reduced errors.</p>
        <h2>Measuring Success</h2>
        <p>After implementing your new systems, track key metrics to measure success. Look at project delivery times, client satisfaction scores, and team productivity. You should see measurable improvements within the first few months of implementation.</p>
    `,
    "af-blog-1": `
        <p>${BLOG_POSTS[0].body}</p>
        <h2>The Cost of Lost Drawings</h2>
        <p>When drawings get lost or mixed up, the costs can be staggering. Rework, delays, and client dissatisfaction all add up. For many firms, this is one of the biggest drains on profitability that's completely avoidable with the right systems in place.</p>
        <h2>Implementing an Automatic Revision System</h2>
        <p>An automatic revision tracking system creates an immutable trail of every change made to a drawing. This means you always know which version is the current one, who made changes, and when. No more hunting through emails and file shares for the "latest" version.</p>
        <h2>Key Features to Look For</h2>
        <p>Your revision management system should automatically assign R-numbers, maintain a changelog, and prevent accidental overwrites. Cloud-based systems that integrate with your design tools work best for modern teams.</p>
        <h2>Getting Buy-In from Your Team</h2>
        <p>Change can be difficult, but most architects quickly see the value in a system that eliminates the stress of managing revisions. Start with one project as a pilot, demonstrate the benefits, and roll it out to the rest of the firm.</p>
    `,
    "af-blog-2": `
        <p>${BLOG_POSTS[1].body}</p>
        <h2>The Most Common Margin Leaks</h2>
        <p>Rework that nobody tracked, effort that nobody quoted, and scope creep that slips through the cracks - these are the most common ways architecture firms lose money on projects. Most firms are leaving 15-20% of potential profit on the table due to these issues.</p>
        <h2>Tracking Time to the Hour</h2>
        <p>When you start tracking every team member's time to the hour, you gain incredible visibility into where your money is being spent. You can see which projects are profitable and which are draining resources, allowing you to make better decisions.</p>
        <h2>Implementing Better Quoting Practices</h2>
        <p>Accurate quoting starts with understanding your historical data. Use past project data to inform your quotes on new projects. Build in contingencies for scope creep and always get changes in writing before starting work.</p>
        <h2>Regular Profitability Reviews</h2>
        <p>Conduct monthly reviews of each project's profitability. Catch issues early before they become major problems. This proactive approach can save your firm thousands of rupees in lost revenue.</p>
    `,
    "af-blog-3": `
        <p>${BLOG_POSTS[2].body}</p>
        <h2>Why WhatsApp Groups Stop Working</h2>
        <p>WhatsApp is great for personal communication, but it was never designed for business. As your firm grows, scattered chats lead to missed information, lost context, and team members who can't find critical project details when they need them.</p>
        <h2>Building Your Operating System Playbook</h2>
        <p>A practical path off scattered chats starts with documenting every process. Create a playbook that outlines exactly how communication should happen, what tools to use, and what information needs to be captured where.</p>
        <h2>Choosing Your Central Platform</h2>
        <p>Your operating system needs a single source of truth. Look for a platform that brings together project management, documentation, and communication in one place. This eliminates the need for multiple tools that don't talk to each other.</p>
        <h2>One Source of Truth the Whole Firm Trusts</h2>
        <p>When everyone trusts that the information they're looking for is in the system, adoption rates skyrocket. Invest time in building a system that's intuitive and actually solves real problems for your team.</p>
    `,
    "af-blog-4": `
        <p>${BLOG_POSTS[3].body}</p>
        <h2>The Problems with the Honour System</h2>
        <p>Relying on team members to self-report their site attendance leads to inaccurate data at best and fraud at worst. You can't make good decisions about resource allocation and billing when you don't have reliable attendance data.</p>
        <h2>How Geo-Tagging Works</h2>
        <p>Modern geo-tagged attendance systems use smartphone GPS to log when team members are on site. This creates an immutable record of presence that can be used for billing, payroll, and project tracking. It's impossible to "clock in" when you're not actually there.</p>
        <h2>Benefits Beyond Accountability</h2>
        <p>Reliable field data does more than just keep everyone honest. It helps you identify patterns, optimize resource allocation, and even improve safety by knowing exactly who is on site at any given time.</p>
        <h2>Addressing Privacy Concerns</h2>
        <p>Some team members may have privacy concerns about location tracking. Be transparent about what data you're collecting and why. Limit tracking to work hours only and emphasize that this is a business tool, not a way to monitor employees outside of work.</p>
    `,
    "af-blog-5": `
        <p>${BLOG_POSTS[4].body}</p>
        <h2>Transparency as a Selling Point</h2>
        <p>Most firms treat client transparency as a chore, but forward-thinking firms are turning it into a competitive advantage. A client portal that gives clients real-time access to their project's status becomes a key differentiator in the marketplace.</p>
        <h2>What to Include in Your Client Portal</h2>
        <p>Your client portal should provide access to current drawings, project timelines, billing information, and communication logs. Clients love being able to check on their project whenever they want, without having to wait for an update email.</p>
        <h2>Reducing the Communication Burden</h2>
        <p>A good client portal reduces the number of status update emails and calls your team needs to handle. Clients can self-serve most of their questions, freeing up your team to focus on what they do best - great architecture.</p>
        <h2>Building Long-Term Client Relationships</h2>
        <p>When clients feel informed and involved throughout the project, they're much more likely to work with you again and refer your firm to others. The investment in a client portal pays off through repeat business and referrals.</p>
    `,
    "af-blog-6": `
        <p>${BLOG_POSTS[5].body}</p>
        <h2>Why SOPs Matter for Architecture Firms</h2>
        <p>The Standard Operating Procedure (SOP) mindset is what separates firms that scale successfully from those that hit a ceiling. SOPs document how you work, creating consistency across all projects and team members.</p>
        <h2>Documenting Your Firm's Unique Way of Working</h2>
        <p>Every firm has its own approach to projects. Your SOPs should capture that unique approach and make it repeatable. This means you can take on more projects without sacrificing quality or losing control.</p>
        <h2>Creating SOPs That Actually Get Used</h2>
        <p>The worst SOPs are those that sit unused in a shared drive. Create living documents that are integrated into your daily workflow. Train every new team member on your SOPs and update them regularly based on feedback.</p>
        <h2>A Practice That Runs Without You</h2>
        <p>The ultimate goal of SOPs is to build a firm that can run successfully without the owner being involved in every detail. This gives you the freedom to focus on growth and strategy, while your team executes consistently.</p>
    `
};

// Combine featured and regular posts, use the same images from the blog grid page
const ALL_BLOG_POSTS: BlogPostFull[] = [
    {
        ...BLOG_FEATURED,
        heroImage: BLOG_IMAGES["af-blog-feat"] || "", // Use same image from blog grid
        fullContent: BLOG_FULL_CONTENTS["af-blog-feat"]
    },
    ...BLOG_POSTS.map((post) => ({
        ...post,
        heroImage: BLOG_IMAGES[post.slotId] || "", // Use same images from blog grid
        fullContent: BLOG_FULL_CONTENTS[post.slotId] || post.body
    }))
];

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return ALL_BLOG_POSTS.map((p) => ({
        slug: slugify(p.title),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = ALL_BLOG_POSTS.find(p => slugify(p.title) === slug);
    if (!post) return {};
    return {
        title: `${post.title} | ArchiFlask Blog`,
        description: post.body,
    };
}

export default async function BlogDetailsPage({ params }: Props) {
    const { slug } = await params;
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
            <section className="animate-on-scroll bg-white mt-[54px]">
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
                            <span>{(post.meta && post.meta[1]) || "June 2026"}</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="animate-on-scroll bg-white pb-20">
                <div className="mx-auto max-w-[750px] px-5 md:px-6">
                    <Reveal y={30} delay={0.25} duration={0.8}>
                        <div
                            className="blog-content max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.fullContent }}
                            style={{
                                lineHeight: '1.8',
                                fontSize: '18px'
                            }}
                        />
                    </Reveal>
                    {/* We'll add the styles as a style tag since App Router doesn't support styled-jsx */}
                    <style>{`
                        .blog-content h2 {
                            margin-top: 40px !important;
                            margin-bottom: 16px !important;
                            font-size: 24px !important;
                            font-weight: 600 !important;
                            color: #111827 !important;
                            line-height: 1.4 !important;
                        }
                        .blog-content p {
                            margin-bottom: 20px !important;
                            color: #4b5563 !important;
                        }
                        .blog-content p:first-child {
                            margin-top: 0 !important;
                        }
                        .blog-content h2:first-of-type {
                            margin-top: 0 !important;
                        }
                    `}</style>

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
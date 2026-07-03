import re

file_path = "app/blog/[slug]/page.tsx"

with open(file_path, "r") as f:
    content = f.read()

new_contents = """const BLOG_FULL_CONTENTS: Record<string, string> = {
    "af-blog-feat": `
        <p>Walk into almost any mid-sized construction or contracting firm in India and the operating system is the same: a WhatsApp group for site updates, an Excel sheet for material tracking, a separate register for labour attendance, and a phone call whenever a client wants a change approved. It works — until it doesn't, and by then the cost is already sunk into a delayed project or a disputed bill.</p>
        <h2>The pattern repeats across every function</h2>
        <p>Material requests get lost in chat scroll-back. Labour hours get calculated by hand, with the errors that come with manual math. Client-requested changes happen verbally on-site and get remembered differently by everyone involved. Budgets get compared to actuals once, at the end, when there's nothing left to do about it.</p>
        <p>None of these are separate problems. They're the same problem — no single system holding the operational truth of a project — showing up in five different places.</p>
        <h2>What changes when it's one platform instead of five channels</h2>
        <p>ArchiFlask brings material requests and inventory, labour attendance and wages, on-site change approvals, purchase orders, and budget tracking into a single system that both the office and the site can see in real time. A site engineer raising a material request, a client approving a change order, and an owner checking whether a project is over budget are all working from the same record — not five different ones that have to be manually reconciled.</p>
        <h2>This isn't about replacing judgment. It's about giving it something to work with.</h2>
        <p>A good builder already knows how to run a site. What a system like this changes is how much of that knowledge has to live in one person's head, and how much of it survives being written down, timestamped, and visible to everyone who needs it — including the client.</p>
    `,
    "af-blog-1": `
        <p>Ask any builder how a project's budget is doing mid-execution and you'll usually get a guess, not a number. Materials get bought against a rough estimate. Labour gets paid against attendance sheets that live somewhere else. Nobody compares planned spend to actual spend until the project is over — by which point the answer doesn't help anyone.</p>
        <p>The real problem isn't overspending. It's not knowing you're overspending until it's too late.</p>
        <p>A budget that only gets reviewed at project close isn't a control system — it's a post-mortem. By the time material costs, labour hours, and miscellaneous site expenses get reconciled against the original plan, the money is already gone. Corrective action becomes damage control.</p>
        <h2>What planned vs. actual tracking actually changes</h2>
        <p>ArchiFlask's Expense Planning feature lets a builder define a planned budget across every expense category — materials, labour, subcontractor costs — before execution starts. As real expenses get logged through the Accounts module, the platform compares actual spend against that plan continuously, not at the end.</p>
        <p>That shift — from a once-and-done estimate to a running comparison — is what turns a budget from a document into a control system.</p>
        <h2>Catching the overrun before it becomes the story</h2>
        <p>When actual spend crosses the planned threshold in any category, ArchiFlask sends a notification at that moment, not at project close. A builder running five sites at once doesn't have to manually check each one — the system flags the site that's drifting.</p>
        <p>That's the difference between "we went over budget on the Adyar villa" as a lesson learned in hindsight, and "material costs on the Adyar villa are 12% ahead of plan" as something you can act on this week.</p>
        <h2>The compounding cost of not knowing</h2>
        <p>Every week a category runs over without visibility is a week where the same pattern can repeat on the next phase, or the next project. Budget control isn't just about one project's margin — it's about whether a firm learns anything from project to project, or re-discovers the same overruns every time.</p>
    `,
    "af-blog-2": `
        <p>Most site progress lives in fragments: a WhatsApp photo from the site engineer, a labour count scribbled in a register, a material delivery nobody logged until the invoice showed up. Individually, none of these tell you anything. Together, they're the actual story of the project — if anyone ever pulled them into one place.</p>
        <h2>Daily Progress Reports shouldn't require daily detective work</h2>
        <p>ArchiFlask's Daily Progress Report (DPR) feature pulls from three modules that are usually tracked separately — Labour Attendance, Material Inventory, and Expense Management — and consolidates them into a single daily view automatically. The site engineer records the day's work; the platform assembles the rest.</p>
        <p>That means a builder isn't asking three different people three different questions to reconstruct one day on site. It's one report: work completed, labour deployed, material consumed, and cost incurred — for that date, on that project.</p>
        <h2>Why "we'll remember" doesn't survive a multi-project firm</h2>
        <p>On a single small site, a builder might genuinely carry yesterday's details in their head. Across four or five active projects, that memory model breaks immediately. A historical DPR log means any day on any project — three weeks ago, three months ago — is one lookup, not a reconstruction exercise from memory and old messages.</p>
        <h2>What this actually protects</h2>
        <p>When a client asks why a milestone slipped, or a dispute comes up over labour deployed on a specific week, a dated, itemised DPR record is the difference between "we believe this is what happened" and "here's exactly what happened, logged the same day." That record protects the builder as much as it informs the client.</p>
    `,
    "af-blog-3": `
        <p>A client walks the site, doesn't like the tile placement, asks for a change on the spot. The site engineer nods, makes a note somewhere — or doesn't — and the change happens. Three weeks later, when the bill for the extra work comes up, nobody can agree on who approved what, or what it was supposed to cost.</p>
        <h2>This is the most common — and most expensive — documentation gap in construction</h2>
        <p>Verbal change requests are the norm on Indian construction sites, and they're also the single biggest source of disputes over cost and timeline once the project moves past handover. Without a paper trail, "the client asked for this" and "we never agreed to that" are both unfalsifiable.</p>
        <h2>Turning a hallway conversation into a ticket, from the site, in real time</h2>
        <p>ArchiFlask's On-Site Change Request feature lets a site engineer create a change request ticket directly from the construction site the moment a client asks for something — no returning to the office, no relying on memory. The request goes to the client for approval through their own ArchiFlask login, with a single click replacing what used to be an email chain or a phone call nobody wrote down.</p>
        <h2>Cost and timeline impact, visible before the client signs off</h2>
        <p>Every change request carries the cost and schedule impact alongside the request itself — so a client approving a change is approving what it actually means for the project, not just the change in isolation. That single addition changes the entire dynamic: clients make informed decisions instead of assuming changes are free and instant.</p>
        <h2>What this replaces</h2>
        <p>Not paperwork for its own sake — it replaces the ambiguity that turns a small on-site request into a disputed line item at project close. A complete approval history means a builder can show, for any change on any project, who asked, what it cost, what it did to the timeline, and when it was approved.</p>
    `,
    "af-blog-4": `
        <p>Ask a site engineer what causes the most avoidable delays and materials come up more often than almost anything else — not because materials are hard to procure, but because nobody had visibility into what was on hand until it wasn't.</p>
        <h2>Requests that start where the need actually is</h2>
        <p>ArchiFlask lets a site engineer raise a material request — cement, steel, plywood, interior finishes, whatever the site needs — directly from the mobile app, specifying quantity and delivery date. The request reaches procurement the moment it's raised, not whenever someone gets back to the office to write it up.</p>
        <h2>Inventory that reflects the site, not a spreadsheet from last week</h2>
        <p>As materials arrive, site engineers update the inventory instantly from the same app. The dashboard shows real-time available stock, consumption, and remaining quantities — so a shortage shows up as a number trending down, not a surprise on the day the crew needs it.</p>
        <h2>Why this matters more as a firm scales</h2>
        <p>One site, a builder can walk the yard and know what's there. Four or five sites running simultaneously, that visibility disappears unless it's tracked centrally. Real-time inventory across every active project means procurement decisions get made against actual need, not guesswork or last-minute panic-buying at a premium.</p>
    `,
    "af-blog-5": `
        <p>Labour is usually the single largest recurring cost on a construction project — and often the least precisely tracked. Attendance registers, verbal hour counts, and manual wage calculations introduce errors that compound daily across a workforce.</p>
        <h2>Attendance recorded where the work happens</h2>
        <p>ArchiFlask lets site engineers record labour attendance directly from the site, with start and end times captured for accurate hour tracking. No end-of-week reconstruction from memory or paper registers.</p>
        <h2>Wages that calculate themselves</h2>
        <p>Based on the hourly rate configured for each labour category, ArchiFlask calculates daily and weekly labour cost automatically. That single change removes the most error-prone manual step in construction cost management — multiplying hours by rate, correctly, every single day, across every category of labour on site.</p>
        <h2>What a builder actually gains</h2>
        <p>Real-time visibility into labour strength and cost, daily, weekly, and monthly — not reconstructed at month-end from disparate registers. When labour cost is visible in real time, a builder can catch a project running heavy on labour hours while there's still time to adjust deployment, not after the invoice makes it obvious.</p>
    `,
    "af-blog-6": `
        <p>Procurement in construction usually runs through a mix of phone calls, WhatsApp, and loose paperwork — which means the same purchase order can exist in three slightly different versions across three different conversations, with no single source of truth.</p>
        <h2>From material request to Purchase Order, without re-typing anything</h2>
        <p>ArchiFlask can generate Purchase Orders automatically based on material requests already raised from site — removing the manual step of re-entering the same information into a separate PO document. Work Orders follow the same principle: created from predefined formats, standardising how vendors and subcontractors get engaged across every project.</p>
        <h2>Documents vendors can actually rely on</h2>
        <p>Both POs and Work Orders can be downloaded as PDFs and sent directly to vendors from the platform, with vendor information maintained centrally. That means every PO a vendor receives is generated from the same system, in the same format, every time — not whatever template happened to be open that day.</p>
        <h2>A procurement history that doesn't live in someone's inbox</h2>
        <p>ArchiFlask maintains a complete digital history of POs, invoices, and Work Orders per project. When a builder needs to check what was ordered, from whom, and when — six weeks or six months later — it's a lookup, not a search through old email threads and forwarded messages.</p>
    `
};"""

updated_content = re.sub(r'const BLOG_FULL_CONTENTS: Record<string, string> = \{.*?\n\};', new_contents, content, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(updated_content)
print("Updated successfully")

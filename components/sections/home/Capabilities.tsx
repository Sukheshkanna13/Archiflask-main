"use client";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/lib/content";

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate tabs every 6 seconds unless paused by user hover/interaction
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAPABILITIES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="animate-on-scroll bg-surface px-5 py-[72px] md:px-6 md:py-[120px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1150px]">
        {/* Title and Subhead */}
        <div className="mx-auto max-w-[850px] text-center mb-16">
          <Reveal y={30}>
            <h2 className="text-[clamp(32px,5.2vw,50px)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              Built for the builders and site teams on your projects
            </h2>
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <p className="mt-6 text-[18px] md:text-[20px] leading-[1.6] text-gray">
              ArchiFlask doesn't stop at the architect's desk. Builders, vendors, and site engineers work in the same system — so nothing gets lost in the handoff.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Interactive Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            {CAPABILITIES.map((cap, i) => {
              const isActive = activeIndex === i;
              return (
                <Reveal key={cap.num} y={20} delay={i * 0.05} className="w-full">
                  <button
                    onClick={() => {
                      setActiveIndex(i);
                      setIsPaused(true);
                    }}
                    className={`w-full text-left rounded-[20px] p-6 transition-all duration-500 ease-out border text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-ink/20 ${
                      isActive
                        ? "bg-white shadow-[0_16px_36px_rgba(0,0,0,0.06)] border-black/[0.06] scale-[1.02]"
                        : "bg-transparent border-transparent hover:bg-white/40 hover:border-black/[0.02]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Indicator */}
                      <span
                        className={`text-[13px] font-bold tracking-wider leading-none mt-1 transition-colors duration-300 ${
                          isActive ? "text-ink" : "text-gray-3"
                        }`}
                      >
                        {cap.num}
                      </span>

                      {/* Title & Desc */}
                      <div className="flex-1">
                        <h4
                          className={`text-[17px] md:text-[19px] font-bold tracking-tight transition-colors duration-300 ${
                            isActive ? "text-ink" : "text-ink-2/70"
                          }`}
                        >
                          {cap.title}
                        </h4>

                        {/* Collapsible body */}
                        <div
                          className={`grid transition-all duration-500 ease-in-out ${
                            isActive
                              ? "grid-rows-[1fr] opacity-100 mt-2.5"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-[14px] md:text-[15px] leading-[1.55] text-gray">
                              {cap.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Premium Mock UI Viewport */}
          <div className="lg:col-span-7 flex items-center justify-center min-h-[440px] md:min-h-[500px]">
            <Reveal
              y={30}
              delay={0.15}
              className="w-full h-full min-h-[440px] md:min-h-[500px] flex rounded-[24px] bg-[#1c1c1e] border border-white/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-hidden relative"
            >
              {/* Browser Window Header Deco */}
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/[0.06] bg-white/[0.02] flex items-center px-4 justify-between z-10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                </div>
                <div className="text-[11px] font-mono tracking-wide text-white/35 bg-white/[0.03] rounded-md px-3 py-0.5 border border-white/[0.04] select-none">
                  {activeIndex === 0 && "daily_progress_report.json"}
                  {activeIndex === 1 && "gps_attendance_logger"}
                  {activeIndex === 2 && "material_request_tracker"}
                  {activeIndex === 3 && "budget_control_dashboard"}
                  {activeIndex === 4 && "onsite_change_approval"}
                </div>
                <div className="w-14" />
              </div>

              {/* Dynamic Content Panel */}
              <div className="flex-1 pt-14 pb-8 px-6 md:px-8 flex flex-col justify-center text-white/90 relative overflow-hidden">
                {/* Visual Decorative Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

                {/* Tab 01 Mockup: Daily Progress Reports */}
                {activeIndex === 0 && (
                  <div className="flex flex-col gap-5 animate-[afRise_600ms_var(--ease-out)]">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-wider text-white/40">Automated Log</div>
                        <h5 className="text-[18px] font-bold tracking-tight">Daily Progress Report</h5>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-[6px] shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        ✓ Compiled
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {/* Labor card */}
                      <div className="flex items-center justify-between p-3.5 bg-white/[0.03] border border-white/[0.05] rounded-[14px] hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[10px] bg-indigo-500/15 flex items-center justify-center text-indigo-400 text-[14px]">👥</div>
                          <div>
                            <div className="text-[14px] font-semibold">Labour Attendance</div>
                            <div className="text-[12px] text-white/50">Electrical, Plumbing & Masonry</div>
                          </div>
                        </div>
                        <span className="text-[14px] font-bold text-indigo-400">14 Present</span>
                      </div>

                      {/* Materials Card */}
                      <div className="flex items-center justify-between p-3.5 bg-white/[0.03] border border-white/[0.05] rounded-[14px] hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[10px] bg-amber-500/15 flex items-center justify-center text-amber-400 text-[14px]">📦</div>
                          <div>
                            <div className="text-[14px] font-semibold">Material Consumption</div>
                            <div className="text-[12px] text-white/50">Cement: 20 Bags | Sand: 2 Units</div>
                          </div>
                        </div>
                        <span className="text-[12px] bg-white/[0.05] px-2 py-0.5 rounded-full text-white/70">Updated</span>
                      </div>

                      {/* Expenses Card */}
                      <div className="flex items-center justify-between p-3.5 bg-white/[0.03] border border-white/[0.05] rounded-[14px] hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-[10px] bg-rose-500/15 flex items-center justify-center text-rose-400 text-[14px]">₹</div>
                          <div>
                            <div className="text-[14px] font-semibold">Site Expenses</div>
                            <div className="text-[12px] text-white/50">Petty Cash • Conveyance & Snacks</div>
                          </div>
                        </div>
                        <span className="text-[14px] font-bold text-rose-400">₹4,500</span>
                      </div>
                    </div>

                    <div className="mt-2 text-center text-[12px] text-white/30 italic">
                      "Pulls from field loggers. Zero manual compiling at EOD."
                    </div>
                  </div>
                )}

                {/* Tab 02 Mockup: GPS-Verified Attendance */}
                {activeIndex === 1 && (
                  <div className="flex flex-col gap-5 animate-[afRise_600ms_var(--ease-out)]">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-wider text-white/40">Field Verification</div>
                        <h5 className="text-[18px] font-bold tracking-tight">Active Check-In GPS</h5>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-[6px]">
                        ● Live
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 items-center">
                      {/* Simulating Map and Geofence */}
                      <div className="relative w-36 h-36 rounded-full bg-white/[0.02] border-2 border-white/[0.06] flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* Radar Waves */}
                        <span className="absolute w-24 h-24 rounded-full border border-blue-500/20 animate-[afPing_3s_infinite_linear]" />
                        <span className="absolute w-12 h-12 rounded-full border border-blue-500/40 animate-[afPing_2s_infinite_linear]" />
                        {/* Center Pin */}
                        <div className="z-10 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_12px_rgba(59,130,246,0.6)] flex items-center justify-center" />
                        <span className="absolute bottom-2 text-[9px] uppercase tracking-wider text-white/35 font-mono">Geofenced</span>
                      </div>

                      {/* Check-in Logs */}
                      <div className="flex-1 w-full flex flex-col gap-2">
                        <div className="p-3 bg-white/[0.04] border border-white/[0.05] rounded-[12px]">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-bold">Suresh Kumar</span>
                            <span className="text-[11px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-mono">Verified</span>
                          </div>
                          <div className="text-[11px] text-white/40 mt-1">Site Engineer · DLF Phase 3</div>
                          <div className="text-[11px] text-white/60 font-mono mt-0.5">09:02 AM • 28.4590° N, 77.0724° E</div>
                        </div>

                        <div className="p-3 bg-white/[0.01] border border-white/[0.03] rounded-[12px] opacity-40">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-bold">Amit Shah</span>
                            <span className="text-[11px] text-white/40">WFH Pending</span>
                          </div>
                          <div className="text-[11px] text-white/40 mt-1">Vendor Manager</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 03 Mockup: Material Requests */}
                {activeIndex === 2 && (
                  <div className="flex flex-col gap-5 animate-[afRise_600ms_var(--ease-out)]">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-wider text-white/40">Procurement Cycle</div>
                        <h5 className="text-[18px] font-bold tracking-tight">Material Request MR-084</h5>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-[6px]">
                        In Transit
                      </span>
                    </div>

                    <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-[16px] flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[15px] font-bold">10 Tons Reinforcement Steel</div>
                          <div className="text-[12px] text-white/45">Rebar Fe550 • Required: July 7</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] text-white/35">Projected arrival</div>
                          <div className="text-[13px] font-bold text-amber-400">July 6 (Tomorrow)</div>
                        </div>
                      </div>

                      {/* Tracker pipeline */}
                      <div className="relative flex justify-between items-center mt-2 px-1">
                        {/* Tracker bar background */}
                        <div className="absolute left-3 right-3 top-[10px] h-[3px] bg-white/[0.08]" />
                        {/* Completed bar fill */}
                        <div className="absolute left-3 w-[66%] top-[10px] h-[3px] bg-amber-500" />

                        {/* Node 1 */}
                        <div className="flex flex-col items-center z-10 gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-black font-bold">✓</span>
                          <span className="text-[10px] text-white/50">Requested</span>
                        </div>

                        {/* Node 2 */}
                        <div className="flex flex-col items-center z-10 gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-black font-bold">✓</span>
                          <span className="text-[10px] text-white/50">Approved</span>
                        </div>

                        {/* Node 3 */}
                        <div className="flex flex-col items-center z-10 gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500 border-4 border-[#1c1c1e] shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse" />
                          <span className="text-[10px] text-amber-400 font-semibold">In Transit</span>
                        </div>

                        {/* Node 4 */}
                        <div className="flex flex-col items-center z-10 gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-white/[0.1] border-4 border-[#1c1c1e]" />
                          <span className="text-[10px] text-white/30">Arrived</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-[12px] text-white/30 italic">
                      "Inventory updates instantly upon site arrival confirmation."
                    </div>
                  </div>
                )}

                {/* Tab 04 Mockup: Budgets & Overruns */}
                {activeIndex === 3 && (
                  <div className="flex flex-col gap-4 animate-[afRise_600ms_var(--ease-out)]">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-wider text-white/40">Cost Control</div>
                        <h5 className="text-[18px] font-bold tracking-tight">Real-Time Budget Drift</h5>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-[6px]">
                        ⚠️ Warning
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {/* Budget row: Materials */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[13px]">
                          <span className="font-semibold text-white/80">Materials Budget</span>
                          <span className="text-white/50">₹8.5L spent / ₹10L limit</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full bg-white/70 rounded-full" style={{ width: "85%" }} />
                        </div>
                      </div>

                      {/* Budget row: Labour */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[13px] items-center">
                          <span className="font-semibold text-white/80 flex items-center gap-1.5">
                            Labour Budget 
                            <span className="px-1.5 py-0.2 text-[9px] bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded font-semibold">
                              Drift Flagged
                            </span>
                          </span>
                          <span className="text-rose-400 font-bold">₹4.2L spent / ₹4.0L limit</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: "100%" }} />
                        </div>
                      </div>

                      {/* Budget row: Other Costs */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[13px]">
                          <span className="font-semibold text-white/80">Other Costs (Misc)</span>
                          <span className="text-white/50">₹1.1L spent / ₹2L limit</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full bg-white/40 rounded-full" style={{ width: "55%" }} />
                        </div>
                      </div>
                    </div>

                    {/* Alert Banner */}
                    <div className="mt-2 p-3 rounded-[12px] bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[12px] flex gap-2 items-start">
                      <span className="text-[14px]">⚠️</span>
                      <p className="leading-tight">
                        <strong>Overrun Drift:</strong> Real-time material allocations and labour check-ins have breached planned target bounds.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 05 Mockup: On-Site Changes */}
                {activeIndex === 4 && (
                  <div className="flex flex-col gap-5 animate-[afRise_600ms_var(--ease-out)]">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-wider text-white/40">Client approval drawer</div>
                        <h5 className="text-[18px] font-bold tracking-tight">On-Site Change Request</h5>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-[6px]">
                        Pending Tap
                      </span>
                    </div>

                    <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-[16px] flex flex-col gap-4">
                      <div>
                        <span className="text-[11px] text-white/45 font-semibold uppercase tracking-wider">Change Details</span>
                        <div className="text-[15px] font-bold mt-0.5">Relocate structural partition in lobby</div>
                        <p className="text-[12px] text-white/60 leading-relaxed mt-1">Requested by field engineer to clear HVAC intake routes.</p>
                      </div>

                      {/* Cost and Schedule impact info */}
                      <div className="grid grid-cols-2 gap-4 border-t border-b border-white/[0.06] py-3">
                        <div>
                          <div className="text-[11px] text-white/40 uppercase">Cost Impact</div>
                          <div className="text-[16px] font-extrabold text-white">+₹35,000</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/40 uppercase">Schedule Impact</div>
                          <div className="text-[16px] font-extrabold text-amber-400">+3 Days</div>
                        </div>
                      </div>

                      {/* Interactive Button Simulation */}
                      <div className="relative group">
                        <button className="w-full py-3 rounded-[12px] bg-white text-[#1c1c1e] text-[13px] font-bold uppercase tracking-wider hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
                          <span>Approve Change Request</span>
                        </button>
                        {/* Cursor tap animation */}
                        <div className="absolute right-10 bottom-[-5px] w-6 h-6 bg-white/20 rounded-full border border-white/40 pointer-events-none scale-0 animate-[ping_2s_infinite_ease-out]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing Line Section */}
        <Reveal y={24} delay={0.2} className="mt-20 border-t border-black/[0.06] pt-12 text-center">
          <div className="flex flex-col items-center justify-center">
            {/* Minimal Connecting Line/Indicator */}
            <div className="w-1.5 h-10 bg-[image:var(--grad-dark)] rounded-full mb-6 opacity-30" />
            <h3 className="text-[22px] md:text-[28px] font-bold tracking-tight text-ink max-w-[800px] leading-tight">
              Same project. Same system. <br className="md:hidden" />
              <span className="af-gradient-text bg-gradient-to-r from-ink via-ink-2 to-gray-2 bg-clip-text text-transparent">Now everyone building it is on it.</span>
            </h3>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
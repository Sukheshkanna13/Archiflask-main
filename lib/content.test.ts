import { describe, it, expect } from "vitest";
import { buildDemoCalendar } from "./content";

describe("buildDemoCalendar", () => {
  it("never marks a past or today date as bookable", () => {
    const ref = new Date(2026, 5, 15); // Mon 15 Jun 2026
    const cal = buildDemoCalendar(ref);
    // Day 15 (today) and earlier must not be selectable.
    for (const d of cal.days) {
      if (d.num <= 15) expect(d.selValue).toBeUndefined();
    }
  });

  it("only marks weekdays as bookable", () => {
    const ref = new Date(2026, 5, 1);
    const cal = buildDemoCalendar(ref);
    const bookable = cal.days.filter((d) => d.selValue);
    expect(bookable.length).toBeGreaterThan(0);
    // June 2026: weekends fall on the 6/7, 13/14, 20/21, 27/28.
    const weekendNums = new Set([6, 7, 13, 14, 20, 21, 27, 28]);
    for (const d of bookable) expect(weekendNums.has(d.num)).toBe(false);
  });

  it("rolls to the next month when too few slots remain", () => {
    const ref = new Date(2026, 5, 30); // last day of June
    const cal = buildDemoCalendar(ref);
    expect(cal.monthLabel).toContain("July");
  });

  it("computes Monday-first leading blanks for the displayed month", () => {
    // July 2026 starts on a Wednesday → Mon-first index 2.
    const ref = new Date(2026, 5, 30);
    const cal = buildDemoCalendar(ref);
    expect(cal.leadingBlanks).toBe(2);
  });

  it("labels bookable days with their weekday", () => {
    const ref = new Date(2026, 5, 15);
    const cal = buildDemoCalendar(ref);
    const tue16 = cal.days.find((d) => d.num === 16);
    expect(tue16?.selValue).toBe("Tue 16");
  });
});

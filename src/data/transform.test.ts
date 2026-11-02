import recap1 from "@/assets/transform-healthcare-recap-1.png.asset.json";
import recap2 from "@/assets/transform-healthcare-recap-2.png.asset.json";
import recap3 from "@/assets/transform-healthcare-recap-3.png.asset.json";
import recap4 from "@/assets/transform-healthcare-recap-4.png.asset.json";
import recap5 from "@/assets/transform-healthcare-recap-5.png.asset.json";
import recap6 from "@/assets/transform-healthcare-recap-6.png.asset.json";
import recap7 from "@/assets/transform-healthcare-recap-7.png.asset.json";
import recap8 from "@/assets/transform-healthcare-recap-8.png.asset.json";
import recap9 from "@/assets/transform-healthcare-recap-9.png.asset.json";
import { describe, expect, it } from "vitest";
import { transformImpact, getPublishedResources, getPublishedWorkshops, isCalendarDate, isValidExternalUrl, TRANSFORM_WHATSAPP_INVITE_URL, transformWorkshops, type TransformResource, type TransformWorkshop } from "./transform";

describe("TRANSform publication safeguards", () => {
  it("keeps the confirmed healthcare workshop date", () => {
    expect(transformWorkshops.find(event => event.id === "healthcare-spaces-2026-10-30")?.date).toBe("2026-10-30");
  });
  it("keeps the confirmed workshop time in GMT", () => {
    const event = transformWorkshops.find(event => event.id === "healthcare-spaces-2026-10-30");
    expect([event?.startTime, event?.endTime, event?.timeZone]).toEqual(["3:00 pm", "4:30 pm", "GMT"]);
  });
  it("keeps the owner's registration deadline", () => {
    expect(transformWorkshops.find(event => event.id === "healthcare-spaces-2026-10-30")?.registrationDeadline).toBe("2026-10-28");
  });
  it("preserves registration and publication after the deadline", () => {
    const event = getPublishedWorkshops(transformWorkshops, "2026-10-31").find(event => event.id === "healthcare-spaces-2026-10-30");
    expect(event?.registrationUrl).toBe("https://docs.google.com/forms/d/e/1FAIpQLSevOrulfkz6VGzJpBJCHrsn5op1w8Ozb5LH-tNK9e179uCTrA/viewform");
  });
  it("uses the owner's TRANSform invitation", () => {
    expect(TRANSFORM_WHATSAPP_INVITE_URL).toBe("https://chat.whatsapp.com/JOLQZ4dGxmUE2sCNvYUvNb");
  });
  it("does not publish draft workshops based on a title", () => {
    expect(getPublishedWorkshops([{ id: "draft", title: "Draft workshop", status: "draft" }])).toEqual([]);
  });
  it("supports approved announcements without optional fields", () => {
    expect(getPublishedWorkshops([{ id: "approved", title: "Approved workshop", status: "approved" }]).map(event => event.id)).toEqual(["approved"]);
  });
  it("orders upcoming workshops chronologically before past workshops", () => {
    const records: TransformWorkshop[] = [
      { id: "past", title: "Past", status: "approved", date: "2026-10-01" },
      { id: "later", title: "Later", status: "approved", date: "2026-12-01" },
      { id: "next", title: "Next", status: "approved", date: "2026-11-01" },
    ];
    expect(getPublishedWorkshops(records, "2026-10-21").map(event => event.id)).toEqual(["next", "later", "past"]);
  });
  it("does not enable invalid registration destinations", () => {
    expect(isValidExternalUrl("javascript:alert(1)")).toBe(false);
    expect(isValidExternalUrl("https://example.org/register")).toBe(true);
  });
  it("publishes resources only when approved and verified", () => {
    const record: TransformResource = { id: "resource", title: "Resource", description: "Description", category: "Learning", source: "Source", url: "https://example.org/resource", status: "approved", verified: true };
    expect(getPublishedResources([record, { ...record, id: "unverified", verified: false }, { ...record, id: "draft", status: "draft" }, { ...record, id: "invalid", url: "#" }]).map(item => item.id)).toEqual(["resource"]);
  });
  it("rejects impossible dates instead of inventing their replacements", () => {
    expect(isCalendarDate("2026-02-30")).toBe(false);
    expect(isCalendarDate("2026-10-21")).toBe(true);
  });
});
 describe("Owner-confirmed first-workshop impact", () => {
  it("keeps 1 workshops", () => { expect(transformImpact.find(item => item.id === "workshops")?.value).toBe(1); });
  it("keeps 27 participants", () => { expect(transformImpact.find(item => item.id === "participants")?.value).toBe(27); });
  it("keeps 71 registrations", () => { expect(transformImpact.find(item => item.id === "registrations")?.value).toBe(71); });
  it("keeps 21 feedback", () => { expect(transformImpact.find(item => item.id === "feedback")?.value).toBe(21); });
  it("retains the nine supplied slides in numerical order", () => { const slides = transformWorkshops.find(event => event.id === "healthcare-spaces-2026-10-30")?.recap?.slides; expect(slides?.map(slide => slide.url)).toEqual([recap1.url, recap2.url, recap3.url, recap4.url, recap5.url, recap6.url, recap7.url, recap8.url, recap9.url]); });
});

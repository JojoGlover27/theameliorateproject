import { describe, expect, it } from "vitest";
import { getPublishedResources, getPublishedWorkshops, isCalendarDate, isValidExternalUrl, TRANSFORM_WHATSAPP_INVITE_URL, transformWorkshops, type TransformResource, type TransformWorkshop } from "./transform";

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
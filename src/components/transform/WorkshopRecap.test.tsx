import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WorkshopRecap from "./WorkshopRecap";
import { transformWorkshops, type TransformWorkshop } from "@/data/transform";

describe("WorkshopRecap recap records", () => {
  it("shows the honest empty state instead of crashing when a recap carries no slide list", () => {
    const event = {
      id: "recap-without-slides",
      title: "Online TRANSformation Workshop",
      status: "approved",
      recap: { summary: "A short recap summary." },
    } as unknown as TransformWorkshop;
    render(<WorkshopRecap event={event} />);
    expect(screen.getByText("The workshop recap slides will be shared here soon.")).toBeInTheDocument();
  });

  it("renders the nine supplied slides in order for the first workshop", () => {
    const event = transformWorkshops.find(item => item.id === "healthcare-spaces-2026-10-30");
    if (!event) throw new Error("first workshop record is missing");
    render(<WorkshopRecap event={event} />);
    expect(screen.getByText("Slide 1 of 9")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(9);
  });
});

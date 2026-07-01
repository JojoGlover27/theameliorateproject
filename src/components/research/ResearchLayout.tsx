import { PropsWithChildren } from "react";

/**
 * Research page brand wrapper. Applies scoped brand tokens
 * (deep purple / gold / royal blue) to any research pages
 * without repainting the rest of the site.
 */
const ResearchLayout = ({ children }: PropsWithChildren) => (
  <div
    className="research-scope min-h-screen"
    style={
      {
        // scoped CSS custom properties
        ["--r-purple" as any]: "#3C14A0",
        ["--r-purple-soft" as any]: "#F0EBFF",
        ["--r-gold" as any]: "#F0A028",
        ["--r-blue" as any]: "#1428A0",
      } as React.CSSProperties
    }
  >
    {children}
  </div>
);

export default ResearchLayout;

const keywords = [
  "Synapse",
  "Telemedicine",
  "PrEP / PEP",
  "ART",
  "Mental Health",
  "Privacy First",
  "Anonymous Care",
  "Self Testing",
  "Affirming Support",
  "End to End Encrypted",
  "Discreet Delivery",
  "Stigma Free",
];

const RotatingKeywordsBar = () => {
  const items = [...keywords, ...keywords];
  return (
    <div className="fixed top-[60px] md:top-[68px] left-0 right-0 z-40 bg-primary text-primary-foreground border-b border-primary/30 overflow-hidden">
      <div className="relative py-2">
        <div
          className="flex gap-10 whitespace-nowrap animate-marquee"
          style={{ animationDirection: "reverse", width: "max-content" }}
        >
          {items.map((k, i) => (
            <span key={i} className="text-xs md:text-sm font-semibold tracking-wide flex items-center gap-10">
              {k}
              <span aria-hidden className="opacity-50">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotatingKeywordsBar;

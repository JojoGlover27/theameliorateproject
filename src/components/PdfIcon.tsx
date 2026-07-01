// Modern red PDF glyph. Used across downloads UI.
const PdfIcon = ({ className = "w-10 h-12" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 60"
    className={className}
    aria-hidden="true"
    role="img"
  >
    <defs>
      <linearGradient id="pdfGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    <path
      d="M6 2 h26 l10 10 v42 a4 4 0 0 1 -4 4 h-32 a4 4 0 0 1 -4 -4 v-48 a4 4 0 0 1 4 -4 z"
      fill="url(#pdfGrad)"
    />
    <path d="M32 2 v10 h10 z" fill="#7F1D1D" opacity="0.85" />
    <rect x="8" y="34" width="32" height="14" rx="2" fill="#fff" opacity="0.95" />
    <text
      x="24"
      y="45"
      textAnchor="middle"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="9"
      fontWeight="800"
      fill="#B91C1C"
      letterSpacing="0.5"
    >
      PDF
    </text>
  </svg>
);

export default PdfIcon;

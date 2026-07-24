export default function BackToTopIcon() {
  return (
    <svg
      aria-hidden="true"
      className="back-to-top-icon"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth="1"
      style={{
        display: "inline-block",
        marginLeft: "8px",
        overflow: "visible",
        verticalAlign: "-4px",
      }}
      viewBox="0 0 16 16"
      width="16"
    >
      <path d="M0 8 8 0 16 8M8 0v16" />
    </svg>
  );
}

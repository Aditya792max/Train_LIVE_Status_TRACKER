const paths = {
  train: (
    <>
      <rect x="5" y="3" width="14" height="15" rx="4" />
      <path d="M8 21l2-3m6 3-2-3M8 7h8M8 12h.01M16 12h.01M7 18h10" />
    </>
  ),
  overview: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="10" width="8" height="11" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /></>,
  bookmark: <><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" /></>,
  coach: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M7 9h3m4 0h3M8 19l-2 2m10-2 2 2M3 14h18" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  external: <><path d="M14 4h6v6m-1-5-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></>,
  edit: <><path d="m15 5 4 4M4 20l4.5-.9L19 8.6a2.1 2.1 0 0 0-3-3L5.5 16.1 4 20Z" /></>,
  trash: <><path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  signal: <><path d="M3 18h2m3-4h2m3-4h2m3-4h2" /><path d="M3 21V18m5 3v-7m5 7V10m5 11V6" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  sparkle: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || paths.train}
    </svg>
  );
}

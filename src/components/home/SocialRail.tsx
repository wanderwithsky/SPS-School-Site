/* Floating brand contact rail — recognizable brand glyphs (Simple Icons paths) */

type IconProps = { className?: string };

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#25D366" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.886-9.884 9.886m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#0f7a3d" aria-hidden="true" focusable="false">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02z" />
    </svg>
  );
}

function GmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.5 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-2.4V9.2L12 13.9 7.4 20.0H3a1.5 1.5 0 0 1-1.5-1.5v-13z" />
      <path fill="#34A853" d="M1.5 18.5v-9.3l4.9 3.6V20H3a1.5 1.5 0 0 1-1.5-1.5" />
      <path fill="#FBBC04" d="M1.5 5.5A1.9 1.9 0 0 1 4.5 4.1L12 9.6l7.5-5.5a1.9 1.9 0 0 1 3 1.4L12 13.6z" />
      <path fill="#EA4335" d="M17.6 20V9.2l4.9-3.7v13a1.5 1.5 0 0 1-1.5 1.5z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill="url(#ig-grad)"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16m0 6.19a3.65 3.65 0 1 0 0 7.3 3.65 3.65 0 0 0 0-7.3m5.84-.62a.85.85 0 1 0-1.7 0 .85.85 0 0 0 1.7 0M12 10.13a1.87 1.87 0 1 1 0 3.74 1.87 1.87 0 0 1 0-3.74"
      />
    </svg>
  );
}

const ITEMS = [
  { label: "Chat with us on WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/XXXXXXXXXX" },
  { label: "Call the school", Icon: PhoneIcon, href: "tel:+91XXXXXXXXXX" },
  { label: "Email us on Gmail", Icon: GmailIcon, href: "mailto:info@yourschool.com" },
  { label: "Follow us on Instagram", Icon: InstagramIcon, href: "https://instagram.com/yourschool" },
];

const BTN =
  "group flex size-11 items-center justify-center rounded-2xl bg-white/95 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.55)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.08] hover:brightness-105 hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function SocialRail() {
  return (
    <>
      {/* Desktop: vertical left rail */}
      <div className="absolute top-1/2 left-3 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex">
        <span className="mb-1 h-10 w-px bg-white/25" aria-hidden="true" />
        {ITEMS.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            title={label}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer noopener"
            className={BTN}
          >
            <Icon className="size-6" />
          </a>
        ))}
        <span className="mt-1 h-10 w-px bg-white/25" aria-hidden="true" />
      </div>

    </>
  );
}

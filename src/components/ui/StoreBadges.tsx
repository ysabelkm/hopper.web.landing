/** App Store and Google Play badges, side by side. */
export const StoreBadges = ({
  href = "/pricing",
  height = 42,
}: {
  href?: string;
  height?: number;
}) => (
  <>
    <a
      href={href}
      aria-label="Download on the App Store"
      className="block transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-85"
    >
      <img
        src="/images/appstorebutton.png"
        alt="Download on the App Store"
        style={{ height }}
        className="block w-auto"
      />
    </a>
    <a
      href={href}
      aria-label="Get it on Google Play"
      className="block transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-85"
    >
      <img
        src="/images/playstorebutton.png"
        alt="Get it on Google Play"
        style={{ height }}
        className="block w-auto"
      />
    </a>
  </>
);

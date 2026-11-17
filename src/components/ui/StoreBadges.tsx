import { APP_STORE_URL, PLAY_STORE_URL } from "../../lib/links";

const badge =
  "block transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-85";

/**
 * App Store and Google Play badges, side by side. Size them with `height`
 * (px), or with `imgClassName` height classes for responsive sizes.
 */
export const StoreBadges = ({ height = 42, imgClassName }: { height?: number; imgClassName?: string }) => (
  <>
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={badge}>
      <img
        src="/images/appstorebutton.png"
        alt="Download on the App Store"
        style={imgClassName ? undefined : { height }}
        className={`block w-auto ${imgClassName ?? ""}`}
      />
    </a>
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={badge}>
      <img
        src="/images/playstorebutton.png"
        alt="Get it on Google Play"
        style={imgClassName ? undefined : { height }}
        className={`block w-auto ${imgClassName ?? ""}`}
      />
    </a>
  </>
);

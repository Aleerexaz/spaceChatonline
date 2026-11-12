# SpaceChat website

Vite + React + TypeScript + Tailwind. `npm install`, then `npm run dev`. `npm run build` writes `dist/`.

## Before you publish

1. **Put the signed APK in `public/`** and make `APP.apkUrl` / `APP.apkFile` in `src/config.ts` match its name. `APP.sha256` must be the SHA-256 of that exact file: the download button **downloads the file itself, checks its SHA-256 in the browser, and refuses to save anything that does not match**. If you rebuild the APK, update the hash or every download will (correctly) be rejected. Until the APK is uploaded the button shows "not published yet".
2. **Check `src/pages/Legal.tsx` against the real app.** The permission list (`PERMS`) and the Notices table were written from the app's features, not read from `AndroidManifest.xml` or the dependency list. Make them match the build, then have a lawyer review Privacy, Terms and Acceptable use.
3. **Add a contact address** in `CONTACT.email` (`src/config.ts`). It is hidden while empty.

## Where things live

| What | Where |
| --- | --- |
| Routes (`/`, `/download`, `/privacy`, `/terms`, `/acceptable-use`, `/permissions`, `/notices`) | `src/App.tsx` |
| Home page order | `src/pages/Home.tsx` |
| Home sections | `src/sections/` |
| Download page | `src/pages/Download.tsx` |
| Policy pages | `src/pages/Legal.tsx`, `LegalLayout.tsx` |
| Facts, colours, nav labels | `src/config.ts` |
| App screens rebuilt in HTML/CSS (Discover, Chats, Chat, Profile, First open) | `src/components/phone/screens.tsx` |
| The scroll-driven phone | `src/components/phone/RoomPhone.tsx` |
| Page styles / phone styles | `src/index.css`, `src/site.css` / `src/phone.css` |

## Motion and identity

- Violet (`--violet`) is a flat signature colour, used sparingly: every headline's full stop (`.pd`, the "star"), status dots, rails, units, the logo tile, and one flat panel (the first-open screen) near the end. No gradients.
- Buttons: `src/components/Button.tsx` (magnetic pull, cursor-origin fill, letter-by-letter roll) and `DownloadButton.tsx` (pill → progress ring → verified pill).
- The Settings scene in the room is a live rebuild of the real Settings screen; it scrolls and cycles the accent as you scroll the page.
- The Download page phone walks the three install steps from one shared clock (`JourneyPhone.tsx`).

## Design rules

- The page is black, white and gray. **Colour exists only inside phone screens.** No page starfield, no gradients, no glass, no cursor effects.
- Each phone owns its accent colour (`PhoneFrame accent={...}`); it never touches the page.
- Scroll is the single source of truth for pinned scenes, so scrolling back rewinds them.
- Type: Space Grotesk (display), Inter (text), Space Mono (technical labels), all self-hosted.
- Everything respects `prefers-reduced-motion`.

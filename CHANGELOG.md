# Changelog

The version on a phone is shown at the bottom of the grown-ups menu (triple-tap the number). The latest version on the
web is in [`version.json`](https://surajjbv.github.io/mobile-coin-jar/version.json); the menu compares the two and offers to
update.

## 2026.10.04-4
- Works on more phones: a small import-map polyfill for older iPhones/Android (loaded only when needed), colour
  fallbacks where `color-mix()` isn't supported, `vh` fallbacks for `lvh/dvh`, and a redraw if iOS drops the 3D
  canvas while the app is in the background.
- Android's Back button closes an open menu instead of leaving the app; no long-press pop-ups or pull-to-refresh.
- Tighter grown-ups menu that fits one screen: Sounds, Tilt & shake and Passcode are matching buttons (green when on),
  and a bigger gold "⭐ Rate us" chip.

## 2026.10.04-3
- Tidier grown-ups menu: no subtitle, "Jar is full at (up to 10,000)" on one line, all label emojis in one row,
  and "⭐ Rate" as a chip in the top-right corner.
- Seamless buttons: the shine is part of the button, not a strip inside it.

## 2026.10.04-2
- Midnight spotlight backdrop: deep navy with a soft glow behind the jar, so the clear glass shows by its lit
  edges and the gold looks richer (light mode: a bright daylight version). Dark-mode panels are navy to match.

## 2026.10.04-1
- Premium look: glossy "jelly" 3D buttons that sink when pressed, a frosted-glass pay bar, a glowing glass pill for the
  count (still red / amber / green) with a coin that flips now and then, round lock-screen style passcode keys, real
  on/off switches for Sounds and Tilt, and a few twinkling sparkles.

## 2026.10.03-6
- The "newer version available" notice is red and bold so it's easy to spot.

## 2026.10.03-5
- The grown-ups menu shows how many visits the app has had (GoatCounter's public total).

## 2026.10.03-4
- ⭐ Rate & feedback in the grown-ups menu: stars, a comment and an optional email, sent to the maker by email.
- Anonymous visit count with GoatCounter (no cookies, no personal data).

## 2026.10.03-3
- Faster first visit: the minified 3D core (about 160 KB less) and every 3D file downloading in parallel.
- If the jar takes a moment, a spinning coin explains it: on the first visit, that it downloads about 2 MB once and then
  opens instantly, even offline.

## 2026.10.03-2
- Renamed to **Mobile Coin Jar**; new address https://surajjbv.github.io/mobile-coin-jar/ (the old coin-jar address forwards here).
- The "gold coins" line under the number is gone; it only says "the jar is empty" or "the jar is full!".
- Deposit, told beat by beat: he knocks on the cap, it spins off and hops aside with a squash, a beat, then his case
  opens over the jar and only then do the coins pour. The cap hops back and screws shut before he waves.
- Coins never fall while the cap is still coming off (also when he isn't there).

## 2026.10.03-1
- New home: https://surajjbv.github.io/coin-jar/ (GitHub Pages). The Netlify address stays on 2026.10.01-5.
- Version check: the grown-ups menu shows "✓ up to date" or "newer version available, tap to update".
- `version.json` on the site, this changelog, and the current version in the README.

## 2026.10.01-5
- Pay bar laid out like payment apps: amount on top, **＋ Add 🔒** on the left, **Pay** on the right.
- Deposit film animated with feature-animation principles: anticipation, follow-through, overlapping action
  (head looks lead the body), squash & stretch (the jar's happy bounce), arcs; depth of field.
- Fixed: the glow pass had been switched off by a slip in 2026.10.01-4; the officer's head drifting during the wave.
- Film shortened to about 9 seconds.

## 2026.10.01-4
- Cinematic deposit: camera pulls back, follows him in, slow-motion close-up as the cap unscrews and coins cascade
  from his briefcase with sparkles; footsteps, latch and ratchet sounds; soft shadows, rim light, vignette.

## 2026.10.01-3
- Up to 10,000 coins drawn, getting smaller as the jar holds more (the default 100-coin jar is unchanged).

## 2026.10.01-2
- The officer appears on phones too (he was hidden when Reduce Motion was on); version shown in the grown-ups menu.

## Earlier (unnumbered)
- **2026-10-01:** pay bar for everyone; adding needs the passcode on a shuffled keypad (Face ID was tried and
  removed); the officer walks in and deposits the coins.
- **2026-09-28:** installable on Android, works offline, Android vibration; iPhone sound and motion-prompt fixes.
- **2026-09-27:** first release; then real gold coins, physics, the 3D glass jar, real coin recordings and the
  empty-jar app icon.

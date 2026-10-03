# Coin Jar 🪙

**A free, physical-feeling coin jar that shows a young child how much money is left in a phone.**

**Live:** https://surajjbv.github.io/coin-jar/

**Version:** 2026.10.03-1 · [what's new](CHANGELOG.md) · the grown-ups menu shows which version a phone is running
and offers to update when a newer one is live

## Why I built this

Kids today watch us pay for everything by tapping a phone. When we used cash, money was visible and
physical: you could see the wallet getting thinner. Now the money is invisible, and to a child it can
look like the phone simply has a lot of money in it.

I wanted a way to show my 5-year-old how much is actually left. I tried showing pictures, but they
didn't stick. So I built a simple, free app that turns the balance into something he can see: a jar of
gold coins.

It works for us like this:

- **On workdays** I add coins as I head to the office and work, so the jar slowly fills up.
- **On weekends**, when we spend money, I take coins out.

Each time we spend, he can watch the jar get emptier. Money going out means fewer coins, and the colour
of the number warns when it's running low.

## How it works

- **A 3D glass jar of gold coins** with the count on top. One coin is drawn for each coin in the jar.
- **Colour tells the story:** the number is red when the jar is ≤20% full, amber at 21–79%, and green at ≥80%.
- **Spending is visible:** when coins are taken out, the lid comes off and the coins float up out of the jar.
  Adding coins pours them in through the neck.
- **Real physics:** tilt the phone and the coins slide (lay it flat and they fall to the back of the jar),
  shake it or tap the jar to toss them, and drag sideways to spin around the jar. The clinks come from actual collisions.
- **Milestones:** confetti at 25%, 50% and 75%. When the jar fills, the lid pops and the coins jump.
- **Jar label:** an optional emoji and caption, such as "📱 Money in the phone".
- **Pay bar** (laid out like payment apps: one amount box, money-in **＋ Add 🔒** on the left, the main money-out
  action on the right): type an amount and tap **Pay 💸**. After a quick "Pay 25 coins?" check, the coins fly out of the jar
  and "−25" floats up from the count, so a child can see the money leave. Anyone can pay.
- **Adding is for grown-ups:** **＋ Add** (and triple-tapping the number for all settings) asks for a 4-digit passcode
  on a **shuffled keypad**: the digits move every time, so a child can't copy where your finger goes. After 3 wrong
  tries it locks for a minute, even if the app is closed. With no server it's a gate for little hands, not bank-grade security.
- **The deposit is a little film:** when coins are added, the camera pulls back so the jar looks small, and a
  businessman walks in with his leather briefcase (footsteps and all). The camera glides in close as he raises the case
  over the jar: the latches click, the cap unscrews with a ratchet and is set aside, and the coins cascade from the
  case in slow motion with gold sparkles. Then he waves to your child, walks off, and everything settles back.
  "I worked at the office today, so money came in." Milestone confetti waits until the coins have landed.
- **Private by design:** there is no account and no server. Everything, including where each coin lies, is stored
  on the device in `localStorage`.
- **Installs like an app** on iPhone and Android (Add to Home Screen) and **works offline** after the first visit.
- **Edge to edge on modern phones.** On iPhone, tap the jar to allow motion access. Apple asks again each time the
  app is opened, and there's a grown-ups switch to turn tilt & shake off if you'd rather not see the prompt.
  Android needs no tap and also gives a little vibration on hard hits, shakes and milestones.

## Add it to your phone

- **iPhone (Safari):** open the site, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the site, tap **⋮**, then **Install app** (or **Add to Home screen**).
- **Samsung Internet:** tap **☰**, then **Add page to**, then **Home screen**.

## First-time setup

1. **Triple-tap the number** at the top and create a 4-digit passcode that only grown-ups know.
2. Set **"Jar is full at"** to whatever a full jar means for you (for example 100), and the **coins** to where you are now.
3. Optionally add a **label**, such as "📱 Money in the phone".
4. From then on: **＋ Add** when money comes in, type the amount and **Pay** when you spend, and let your child watch the jar.

It's free, with no ads and no sign-up, and nothing leaves the phone.

## Tech

- A single `index.html` with no build step. Libraries load from jsDelivr as ES modules.
- [three.js](https://threejs.org/) renders the jar: physically based glass (transmission), metallic coins
  with an embossed star, a beaded ring and a ridged edge (procedural canvas textures), and a studio environment map.
- [Rapier](https://rapier.rs/) (WebAssembly) simulates every coin as a 3D cylinder. Gravity comes from the phone's
  accelerometer, sign-calibrated against device orientation, because browsers disagree on it.
- Coin size and thickness depend on the "full at" number, tuned by pouring each jar size in the simulation so a
  full jar reaches the shoulder.
- **Up to 10,000 coins are drawn**, getting smaller (and thinner) as "full at" grows, so a full jar always reaches the
  shoulder. Up to 300 coins, every coin is a physics body. Above that, the bottom of the pile is a packed, still mass
  drawn with GPU instancing (only coins against the glass or near the top are drawn), and the top ~150–300 coins are
  physics bodies resting on an invisible floor at its top, just like a real pile, where only the top layer moves.
  Big deposits and payments pour or fly ~150/60 coins and raise or lower the packed level for the rest. Above 10,000,
  the jar fills proportionally.
- The render loop stops once no coin has visibly moved for a second, so an idle jar uses no battery.
- The count, passcode and editing live in a plain script, so they keep working even if the 3D jar can't load.
- The officer (`officer.glb`, ~0.9 MB) loads after the jar is up. If he can't load, coins simply pour in.
- The film is directed in code: the camera eases between shots (wide, approach, close-up, wave), physics and animation
  run at 0.45x during the cascade, soft shadow maps and a cool rim light fade in, an UnrealBloom pass makes the gold
  and sparkles glow (only while the film plays), and the officer's low-poly mesh is welded and smoothed, with
  physically based fabric, skin and leather materials. His arm reaching over the jar is two-bone IK.
- Animation principles from feature animation are layered procedurally over his canned clips: anticipation (a
  wind-up before he lifts the case, a crouch before he sets off), follow-through (the case swings like a pendulum on
  springs), overlapping action (his head leads, looking at the jar, then at your child with a nod, then a glance back),
  squash & stretch (his weight settling, the jar's happy bounce as the last coin lands, the jar leaning in eagerly),
  arcs and slow-in/slow-out everywhere. Depth of field (BokehPass) keeps the subject crisp and the background soft.
- Coin sounds are real recordings (a random clink per collision, a bounce for hard hits, a jingle for a shake),
  pitched and panned a little differently each time with Web Audio. Coins hitting the glass sound lower and softer.
- Installable PWA: `manifest.webmanifest` with regular and maskable icons. A service worker (`sw.js`) precaches the
  page, icons, sounds and the pinned library builds, so the app opens offline. The page itself is network-first,
  so a new deploy shows up on the next open.
- Hosted on GitHub Pages: every push to `main` goes live automatically. (It started on Netlify, but the free plan's
  monthly deploy credits ran out; the old address stays on an earlier version.)

## Credits

- Coin sounds: [Coins Clink](https://creatorassets.com/audio/coins-clink/) by CreatorAssets, CC0 (public domain).
  They were trimmed and converted to AAC for `sounds/`.
- The officer: [Business Man](https://poly.pizza/m/JFrLIKqvCH) from Quaternius' Ultimate Modular Men Pack, CC0 (public domain).
  `officer.glb` keeps only its Idle, Walk and Wave animations. His arm reaching over the jar is two-bone IK in code.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

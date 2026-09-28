# Coin Jar 🪙

**A free, physical-feeling coin jar that shows a young child how much money is left in a phone.**

**Live:** https://coin-jar-surajjbv.netlify.app

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
- **Grown-ups only editing:** triple-tap the number, enter a 4-digit passcode (you set it the first time),
  then change the coins, the "jar is full at" number (default 100) and the label.
- **Private by design:** there is no account and no server. Everything, including where each coin lies, is stored
  on the device in `localStorage`.
- **Installs like an app** on iPhone and Android (Add to Home Screen) and **works offline** after the first visit.
- **Edge to edge on modern phones.** On iPhone, tap the jar once to allow motion access; Android needs no tap
  and also gives a little vibration on hard hits, shakes and milestones.

## Add it to your phone

- **iPhone (Safari):** open the site, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the site, tap **⋮**, then **Install app** (or **Add to Home screen**).
- **Samsung Internet:** tap **☰**, then **Add page to**, then **Home screen**.

## Tech

- A single `index.html` with no build step. Libraries load from jsDelivr as ES modules.
- [three.js](https://threejs.org/) renders the jar: physically based glass (transmission), metallic coins
  with an embossed star, a beaded ring and a ridged edge (procedural canvas textures), and a studio environment map.
- [Rapier](https://rapier.rs/) (WebAssembly) simulates every coin as a 3D cylinder. Gravity comes from the phone's
  accelerometer, sign-calibrated against device orientation, because browsers disagree on it.
- Coin size and thickness depend on the "full at" number, tuned by pouring each jar size in the simulation so a
  full jar reaches the shoulder.
- Up to 300 coins are drawn (above that the jar fills proportionally). The render loop stops as soon as the
  coins are still, so an idle jar uses no battery.
- The count, passcode and editing live in a plain script, so they keep working even if the 3D jar can't load.
- Coin sounds are real recordings (a random clink per collision, a bounce for hard hits, a jingle for a shake),
  pitched and panned a little differently each time with Web Audio. Coins hitting the glass sound lower and softer.
- Installable PWA: `manifest.webmanifest` with regular and maskable icons. A service worker (`sw.js`) precaches the
  page, icons, sounds and the pinned library builds, so the app opens offline. The page itself is network-first,
  so a new deploy shows up on the next open.
- Hosting is on Netlify: every push to `main` deploys automatically.

## Credits

Coin sounds: [Coins Clink](https://creatorassets.com/audio/coins-clink/) by CreatorAssets, released as CC0 (public domain).
They were trimmed and converted to AAC for `sounds/`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

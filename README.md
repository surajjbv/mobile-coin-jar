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

- **A jar of gold coins** with the count on top. One coin is drawn for each coin in the jar.
- **Colour tells the story:** the number is red when the jar is ≤20% full, amber at 21–79%, and green at ≥80%.
- **Real physics** ([Matter.js](https://brm.io/matter-js/)): tilt the phone and the coins slide, shake it
  (or tap the jar) to toss them. The clinks come from actual collisions.
- **Grown-ups only editing:** triple-tap the number, enter a 4-digit passcode (you set it the first time),
  then change the coins and the "jar is full at" number (default 100).
- **Private by design:** there is no account and no server. Everything is stored on the device in `localStorage`.
- On iPhone, tap the jar once to allow motion access.

## Tech

- A single `index.html` file (HTML, CSS, and vanilla JavaScript) with no build step.
- SVG graphics, Web Audio for the synthesised coin sounds, and Matter.js for the physics.
- Physics is capped at 300 drawn coins to keep older phones smooth (above that the jar fills
  proportionally). The simulation sleeps when the coins are still to save battery.
- Hosted on Netlify. Every push to `main` deploys automatically.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

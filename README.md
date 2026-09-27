# Coin Jar

Kid-friendly coin jar web app. Single file: `index.html`.

- Triple-tap the number → passcode → set coins / "jar is full at".
- Number colour: red ≤20% of full, amber 21–79%, green ≥80%.
- One coin drawn per coin, up to 300 (above that the jar fills proportionally).
- Real physics ([Matter.js](https://brm.io/matter-js/)): tilt the phone and the coins slide, shake it (or tap the jar) to toss them. Clinks come from actual collisions.
- On iPhone, tap the jar once to allow motion access.

Deploy: every push to `main` auto-deploys to Netlify.

Live: https://coin-jar-surajjbv.netlify.app

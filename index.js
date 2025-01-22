import ioHook from 'iohook';

let keypressed;
let ran = Math.random();
let points = 0;
let canPress = true;

ioHook.on('keydown', (event) => {
  keypressed = event.keycode;
  if (canPress) {
    if (((keypressed == 61003 && ran < 0.5) || (keypressed == 61005 && ran > 0.5))) {
      points++;
      screen(2); // hit
      canPress = false;
    } else {
      points--;
      screen(3); // miss
      canPress = false;
    }
  }
});
ioHook.start();
console.clear();

function loopWithTimeout() {
  ran = Math.random();
  if (ran < 0.5) {
    screen(0); // left
  } else {
    screen(1); // right
  }
  canPress = true;
  keypressed = null;
  setTimeout(loopWithTimeout, 1000 + ran * 1000);
}

function screen(condition) {
  let sPoints = "points: \x1b[1m"+points + "\x1b[0m "; //escape code adds 8 characters
  switch (condition) {
    case 0: // left
      process.stdout.write("\r \x1b[1mLeft!\x1b[0m" + " ".repeat(process.stdout.columns + 1 - sPoints.length) + sPoints);
      break;
    case 1: // right
      process.stdout.write("\r \x1b[1mRight!\x1b[0m" + " ".repeat(process.stdout.columns - sPoints.length) + sPoints);
      break;
    case 2: // hit
      process.stdout.write("\r \x1b[1;32mHit\x1b[0m" + " ".repeat(process.stdout.columns + 3 - sPoints.length) + sPoints);
      break;
    case 3: // miss
      process.stdout.write("\r \x1b[1;31mMiss\x1b[0m" + " ".repeat(process.stdout.columns + 2 - sPoints.length) + sPoints);
      break;
  }
}

// Start the loop
loopWithTimeout();
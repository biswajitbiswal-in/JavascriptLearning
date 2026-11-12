# Async JavaScript: setTimeout, clearTimeout, setInterval and clearInterval

## What is async?

Normally JavaScript runs code **line by line**, waiting for each line to finish. **Async** (asynchronous) means some work is **scheduled for later**, and JavaScript keeps running the rest of the code without waiting.

Think of it like setting an alarm: you don't sit and stare at the clock. You carry on with your day, and the alarm rings when it's time.

## `setTimeout` is async

`setTimeout` says: "Run this function **later**, after some time."

```js
console.log("1. start");

setTimeout(function () {
    console.log("2. runs after 2 seconds");
}, 2000);

console.log("3. end");
```

Output:

```
1. start
3. end
2. runs after 2 seconds
```

Line 3 did **not** wait for the timer. The timed function ran last, even though it was written in the middle. That is async behaviour.

## `clearTimeout` cancels the alarm

`setTimeout` returns an ID, like a ticket number for the alarm. Give that ID to `clearTimeout` to cancel it **before it rings**.

```js
const timer = setTimeout(changeText, 2000);  // set the alarm
clearTimeout(timer);                         // cancel it
```

## Our example

```js
const changeMe = setTimeout(changeText, 2000);

document.querySelector("#stop").addEventListener("click", function () {
    clearTimeout(changeMe);
    console.log("stopped");
});
```

| Moment | What happens |
|---|---|
| Page loads | Timer starts (2 seconds). The page keeps running normally. |
| Within 2 seconds, click **stop** | Timer is cancelled. The heading does not change. |
| No click for 2 seconds | `changeText` runs. Heading becomes "Hello Great Developer". |
| Click **stop** after 2 seconds | Nothing visible happens. The timer already fired. |

## `setInterval` repeats the alarm

`setTimeout` rings **once**. `setInterval` rings **again and again**, every X milliseconds, until you stop it. It is also async: the rest of the code keeps running between rings.

```js
let count = 0;

const timer = setInterval(function () {
    count++;
    console.log("tick", count);
}, 1000);
```

Output (one line per second):

```
tick 1
tick 2
tick 3
...
```

## `clearInterval` stops the repeating alarm

Like `setTimeout`, `setInterval` returns an ID. Pass it to `clearInterval` to stop the repeats.

```js
const timer = setInterval(function () {
    count++;
    console.log("tick", count);

    if (count === 5) {
        clearInterval(timer);   // stop after 5 ticks
        console.log("done");
    }
}, 1000);
```

### With a stop button (like our example)

```js
const ticker = setInterval(function () {
    console.log("running...");
}, 1000);

document.querySelector("#stop").addEventListener("click", function () {
    clearInterval(ticker);
    console.log("stopped");
});
```

If you forget `clearInterval`, the interval keeps running forever.

## setTimeout vs setInterval

| | `setTimeout` | `setInterval` |
|---|---|---|
| Runs | Once, after the delay | Repeatedly, every delay |
| Stop with | `clearTimeout(id)` | `clearInterval(id)` |
| Example use | Show a message after 2 seconds | Clock, countdown, auto-refresh |

## Quick summary

- **Async** = do it later, don't block the rest of the code.
- `setTimeout(fn, ms)` = run `fn` once after `ms` milliseconds.
- `clearTimeout(id)` = cancel it before it runs.
- `setInterval(fn, ms)` = run `fn` every `ms` milliseconds, repeatedly.
- `clearInterval(id)` = stop the repeating.

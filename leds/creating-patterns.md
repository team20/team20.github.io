---
parent: LEDs
---

# Creating Patterns with LEDs

Creating patterns with LEDs is simple. We use two primary variables to determine the color each LED will show.

# `colorIndex`

`colorIndex` is a global variable. We use `colorIndex` to track how many "cycles" the LED strip has shown. If you look at our LED code, you will see `delay` is always called before `colorIndex` is incremented to pause the LED code for a few milliseconds before moving on. This effectively makes `colorIndex` a way to vary the color of LEDs over time. Think of `colorIndex` as representing frames in a video; frame 1 is shown, and you see one pattern. Then frame 2 is shown, and you see an entirely different pattern. Then frame 3 is shown, and you see yet a different pattern and so on.

The diagram below shows an example of how to use `colorIndex`. The value of `colorIndex` is displayed in the top right corner. When `colorIndex` is even, all the LEDs will be green. When `colorIndex` is odd, all the LEDs will be white, creating a blinking effect. Remember, `colorIndex` is only incremented after some time has passed, so in real life, you would see one pattern for a little bit of time, then the next pattern for a little bit of time, and then the first pattern again for a little bit of time.
![](/assets/color_index_example.svg)

# `i`

`i` is a variable used in for loops to track how many times the loop has run. We use it to track which LED on the strip we are currently on. This makes `i` a way to vary the color of LEDs depending on the position of the LED on the strip.

The diagram below shows an example of how to use `i`. This time, the value of `i` is shown below each LED (because `i` represents the number of the current LED). When `i` is even, all the LEDs will be green. When `i` is odd, all the LEDs will be white. Unlike `colorIndex`, you see this pattern as-is; `i` is not affected by time.
![](/assets/i_example.svg)

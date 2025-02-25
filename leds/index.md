---
title: LEDs
has_children: true
---

# Getting Started with LEDs
- TOC
{:toc}

Refer to the [Adafruit NeoPixel docs](https://adafruit.github.io/Adafruit_NeoPixel/html/class_adafruit___neo_pixel.html) if you get stuck.  
LEDs are controlled by an Arduino. Controlling them is actually very simple: create a color object, with RGB values, and use it to set the color of an LED. LEDs are in strips, which means you can create "patterns" by setting different LEDs to different colors.

To start, create an `Adafruit_NeoPixel` object, which is usually created in the format of `Adafruit_NeoPixel strip()`. When creating it, you need to first give it the number of LEDs on the strip, the pin number it's connected to, and some pixel flags.  
The first pixel flag is the frequency, which should always be `NEO_KHZ800`. The next flag is the bitstream used to communicate with the LEDs. Refer to the Adafruit NeoPixel docs to see the available bitstreams. It's critical that the correct bitstream is set, or there will be a mismatch between the color you set an LED to, and the color it displays. For example, if you set an LED to red, and it lights up green, chances are the incorrect bitstream is set, and you need to figure out/obtain the correct bitstream and set it in code. To combine pixel flags, just add them together like numbers.

Your `strip` object should look something like this:

```c++
int ledCount = 10;
int ledPinNumber = 5;
Adafruit_NeoPixel strip(ledCount, ledPinNumber, NEO_KHZ800 + NEO_RGB)
```

After you created your LED strip, call `setPixelColor` on it to set the color of an LED on the strip. It takes the LED number(zero-indexed of course) and a color, which can be created by calling `Color` on the strip, and using that for the color argument. We light up the entire strip by using a for loop to set the color of every LED on the strip, which looks like this:

```c++
for (int i = 0; i < LED_COUNT; i++) {
	strip.setPixelColor(i, strip.Color(0, 255, 0));
}
```

`strip.Color` can be replaced by any function that returns a color. Creating a pattern consists of doing math to determine what colors should go to each LED. For example, you can use modulus to alternate colors on an LED strip. This guide won't go into specific patterns, you'll have to figure out how to make a pattern yourself.
If all of this works correctly, you can start controlling LEDs from a PS4 controller and robot code.

# Lighting things up

We use I2C to communicate with the Arduino from robot code. If haven't read up on I2C, go [here](/i2c). We send one byte to the Arduino to tell it what pattern to use. Our data format consists of integers, and we select different LED patterns depending on the number.
For each case in the switch statement, use a for loop like explained above to set the color of the LEDs. You can use different functions to get different patterns. With a switch statement and some functions, you could have a case for all green LEDs, alternating green LEDs, gradients, etc.

## Example

```c++
switch (data) {
	case 1:
		for (int i = 0; i < LED_COUNT; i++) {
			strip.setPixelColor(i, strip.Color(0, 255, 0));
		}
		// Don't change the LEDs too fast
		delay(150);
		break;
	case 2:
		for (int i = 0; i < LED_COUNT; i++) {
			strip.setPixelColor(i, strip.Color(255, 0, 255));
		}
		// Don't change the LEDs too fast
		delay(150);
		break;
}
```

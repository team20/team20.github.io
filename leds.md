LEDs
===
LEDs are controlled with the Arduino. The way to control them is actually very simple: create a color object, and set the color of the LED. The LEDs are in strips, and so you can create "patterns" by setting different LEDs to different colors. Things get more complicated when you want to control LEDs from a controller and robot code.

I2C
===
I2C is how we communicate to the Arduino from the RoboRIO. Use `Wire.begin(address)` to start communicating on I2C with `address` as the Arduino's I2C address. Use `Wire.onReceive(receivingMethod)` to run `receivingMethod` every time the Arduino receives data from I2C. Use `Wire.read()` to get the byte received.

Lighting things up
===
Our data format consists of integers, and we select different LED patterns depending on the number. Creating a pattern consists of doing math to determine what colors should go to each LED. For example, you can use modulus to alternate colors on an LED strip.
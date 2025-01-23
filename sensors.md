# Sensors

Sensors are important to programmers because it makes controlling mechanisms vastly easier. Better sensors enable automation and mean less work for everyone involved (including non-programmers.)

In general, we use two types of sensors: encoders and proximity sensors. Encoders are good for measuring the position and velocity of something attached to a motor. Proximity sensors are good for detecting objects like game pieces or mechanisms.

## Encoders

There are two main types of encoders that we care about: relative and absolute.

Relative encoders measure position from when the encoder starts up; this means they always reset when rebooted; they are good for measuring total distance spun. They typically have a quadrature output; precision is measured by counts per revolution.

Absolute encoders measure an angle from a zero point; they can accurately measure the angle even if the encoder is powered off and moved. These are good for measuring the angle of a mechanism. They typically output with duty cycle; precision is measured by the minimum and maximum pulse width.

> Additional note: some encoders can be plugged directly into the motor controller. These can be better in some circumstances because it allows you to run feedback/feedforward on the motor controller at 1 Khz (instead of 50 Hz in the robot program). However, this doesn’t matter unless your mechanism accelerates really fast.

### Form factors

Encoders come in a few different form factors: through bore, mag, and built-in encoders.

Through bore encoders have a hole for a shaft to go through.

Mag encoders need a magnet on the shaft and the rest of the encoder goes top of the magnet.

All modern brushless DC motors have a built-in relative encoder.

For programming, form factor doesn't really matter as long as it's the correct type.

## Proximity Sensors

Proximity sensors use limit switch functionality on motor controllers to stop motors when the sensor is tripped. There are many different types of proximity sensors. Optical, hall effect, etc all can be used to sense when different things are close.

Proximity sensors are good in applications like detecting game pieces, stopping mechanisms from going too far, or just detecting distance without reliance on more complicated technology like vision.
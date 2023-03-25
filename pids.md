PIDs
===
A PID controller is something called a "feedback controller." What it does is it takes the current state and the target state, and it calculates some amount to move to get to the target state. In a mechanism, it could take the current position and a target position, and calculate how fast to spin the motor to get to the target position. The motor then moves, the PID controller recalculates, and the cycle repeats until the mechanism is at the target position. It's called a "feedback controller" because it takes information, calculates a value, and "feeds" it back to the motor controller.  

The three letters each stand for a different term in the calculation. The only one that realistically matters is P, which stands for proportional. This term increases proportionally to the amount of error(who would've guessed.) Usually, P will be enough to control a mechanism.

Tuning PIDs
===
I think I'm supposed to put together an intricate guide here. Really, the way we tune PIDs is we start with a low P value, like 0.0001, and slowly increase it until we're happy. You always want to start low so your mechanism doesn't break or pose a safety hazard. Also, the first thing you should do is cap the maximum speed so it can't move fast enough to break itself or pose a safety hazard. In the `Constants` class, that looks like this:
```java
// Min here is for the speed in reverse
// The exact value will have to be determined by experiment,
// because you don't want it so slow it barely moves
public static final kMinOutput = -0.1;
public static final kMaxOutput = 0.1;
```
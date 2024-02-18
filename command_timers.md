# Using Timers in a Command

Timers can be used to control command execution. They can be used to run mechanisms for a certain amount of time or they can be used to force commands to end after a certain amount of time. `withTimeout` can be called on any command to accomplish this.

## Example

```java
public Command runMechanismCommand(double seconds) {
	return run(() -> runMechanism()).withTimeout(seconds);
}

public Command timedCommand(double seconds) {
	return new ExampleCommand().withTimeout(seconds);
}
```

`withTimeout` will force a command to end after the number of seconds specified in `seconds`. `withTimeout` is used in `runMechanismCommand`, where `run` creates a command that will run a mechanism forever, and `withTimeout` is used to end the command after the specified amount of time.

Note that `withTimeout` does not make commands last for a certain amount of time, it acts only as a timeout, hence the name. If the command finishes normally, the command will end before the timeout. `withTimeout` is a good failsafe for commands that may take an undesirable amount of time and lock out other controls. For example, if `ExampleCommand` does something like turn the robot, it would be undesirable for it to lock out driver controls because it didn't turn the last few degrees. `withTimeout` prevents `ExampleCommand` from taking too long, but also allows it to finish normally if the robot does reach its target naturally.

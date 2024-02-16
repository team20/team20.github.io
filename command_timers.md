# Using Timers in a Command

Timers can be used to control command execution. They can be used to run mechanisms for a certain amount of time or they can be used to force commands to end after a certain amount of time. `withTimeout` can be called on any command to accomplish this.

## Example

```java
public Command timedCommand(double seconds) {
	return new ExampleCommand().withTimeout(seconds);
}
```

`withTimeout` will force the command to end after the amount of seconds specified in `seconds`. Note that `withTimeout` does not make commands last for a certain amount of time, it acts only as a timeout. If the command finishes normally, the command will end before the timeout.

If you need to make a command last a certain amount of time, use `Commands.deadline` with a `WaitCommand`` as the deadline:

```java
public Command timeCommand(double seconds) {
	return Commands.deadline(Commands.waitSeconds(seconds), new ExampleCommand());
}
```

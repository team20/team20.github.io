Using Timers in a Command
===
Sometimes you want to use a timer to control a mechanism on the robot. Maybe you want your mechanism to do something for one second and finish after two. This example shows you how to use a timer in a command.  

Example
---
A start time is captured, and we continuously check if enough time has passed before doing something and finishing the command.
```java
public class ExampleCommand extends CommandBase {
	private Instant m_startTime;

	@Override
	public void initialize() {
		// This stores the start time of the command
		m_startTime = Instant.now();
	}

	@Override
	public void execute() {
		// This checks how much time has passed since the command started,
		// and if it's over 1000 milliseconds, we run the mechanism
		if (Duration.between(m_startTime, Instant.now()).toMillis() >= 1000) {
			// Run the mechanism
		}
	}

	@Override
	public boolean isFinished() {
		// We can also use Duration.between to finish the command after a certain amount
		// of time. Here, we wait for 2000 milliseconds.
		return Duration.between(m_startTime, Instant.now()).toMillis() >= 2000;
	}
}
```

`Instant.now()` gets the current time, and `Duration.between().toMillis()` returns how much time has passed between the start time(`m_startTime`) and the end time(`Instant.now()`) in milliseconds. By checking if the time passed is more than a certain value, we can do certain things after a certain amount of time.
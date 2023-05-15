Advanced Command Construction
===
Sometimes the behavior of a command needs to change depending on the environment.  
Sometimes you need to run multiple commands in a sequence, and the commands change depending on the conditions.  
However, directly binding a command to a button/`Trigger`/`JoystickButton` gives you little flexibility to change the behavior. Using `DeferredCommand`, you can create commands on the fly which have different behavior when you run them in a match.
Depending on your exact scenario, you may also need `CommandComposer` to create command sequences.

Also, sometimes you have a long command sequence(usually for autos,) and you'd prefer not to clog up `RobotContainer`. CommandComposer also solves that problem.

CommandComposer
===
`CommandComposer` is a way to create long command groups without clogging up `RobotContainer`. This is particularly useful for auto command sequences, where using it makes the code significantly easier to read. To use it, create a static method in `CommandComposer` with a return type of `Command`, and write some logic. The logic might check some conditions and change a `CommandGroup` accordingly. It might just accept a few parameters, and pass them along to certain commands.

Example
---
```java
/**
 * 
 * @param someCondition A condition that's either true or false
 * @param position      An enum representing positions
 * @return
 */
public static Command createCommandSequence(boolean someCondition, Position position) {
	// If some condition is true, go to the position
	if (someCondition) {
		return new ExampleCommand(position);
	} else {
		// If not, go to the middle first, then go to the position
		return new SequentialCommandGroup(new ExampleCommand(Position.MIDDLE), new ExampleCommand(position));
	}
}
```

DeferredCommand
===
`DeferredCommand` allows command construction to be delayed until runtime(instead of robot initialization.)  
When you need to create commands where their behavior changes depending on outside conditions, use `DeferredCommand`. To use it, use a lambda expression that returns a `Command`. A `CommandComposer` method can also be used in place of a `Command`, as the static methods should return a `Command`.
```java
new DeferredCommand(() -> CommandComposer.createCommandSequence(true, Position.FAR));
```
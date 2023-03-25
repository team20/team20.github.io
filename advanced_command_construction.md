Advanced Command Construction
===
Sometimes the behavior of a command needs to change depending on the environment.  
Sometimes you need to run multiple commands in a sequence, and the commands change depending on the conditions.  
However, directly binding a command to a button/`Trigger`/`JoystickButton` gives you little flexibility to change the behavior. Using `DeferredCommand` and `CommandComposer`, you can create commands on the fly which have different behavior when you run them in a match.
Depending the conditions you're using, you may not need `CommandComposer`. However, you will always use `DeferredCommand` when you use `CommandComposer`.

CommandComposer
===
`CommandComposer` is a way to create long command groups without clogging up `RobotContainer`. To use it, create a static method in it, and put your logic in there. Your logic might check some conditions and change the `CommandGroup` accordingly. It might just accept a few parameters, and pass them along to certain commands.

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
`DeferredCommand` allows command construction to be delayed until runtime(instead of initialization.) When you need to create commands where their behavior changes depending on the condition, use `DeferredCommand`. To use it, use a lambda expression that returns a `Command`. `CommandComposer` can also be used in place of a `Command`.
```java
new DeferredCommand(() -> CommandComposer.createCommandSequence(true, Position.FAR));
```
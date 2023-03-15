Advanced Command Construction
===
Sometimes the behavior of a command needs to change depending on the environment.  
Sometimes you need to run multiple commands in a sequence, and the commands change depending on the conditions.  
However, directly binding a command to a button/`Trigger`/`JoystickButton` gives you little flexibility to change the behavior. Using DeferredCommand and `CommandComposer`, you can create commands on the fly which have different behavior when you run them in a match.
Depending the conditions you're using, you may not need `CommandComposer`. However, you will always use `DeferredCommand` when you use `CommandComposer`.

CommandComposer
===
In `CommandComposer`, create a static method, and put your logic in there. Your logic will probably check some conditions and change the `CommandGroup` accordingly.

Example
---

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

DeferredCommand
===
`DeferredCommand` should be provided in the code repo, so it won't be included here.  
However, an example of creating a `DeferredCommand` with the `CommandComposer` example will be provided.

	new DeferredCommand(() -> CommandComposer.createCommandSequence(true, Position.FAR));
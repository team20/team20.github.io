Suppliers and Lambda Expressions
===
Let's say you have a `Command` and you want to provide it with input from a joystick. Usually, this is for some kind of drive command, since a joystick can be used to control the speed of the robot. If you've never used lambda expressions, you might be tempted to pass in the joystick input by directly calling `getRawAxis` to get the joystick data like this:

	// If we aren't doing anything else, drive
	m_driveSubsystem.setDefaultCommand(new DefaultDriveCommand(
		m_controller.getRawAxis(0)));

However, all this does is call `getRawAxis` when the command is constructed at startup. The method gets called, and returns a number, but that number won't ever change. So your joystick won't work because the command has no way of obtaining the joystick state after its constructed.  

To solve this, we use lambda expressions or anonymous functions. They act like normal methods, but without the boilerplate of declaring a method or a name(hence *anonymous* function.) We use them kind of like a wrapper around normal methods to allow a normal method to be called at a later point. Here's an example like the previous one, but with a lambda expression:

	// If we aren't doing anything else, drive
	m_driveSubsystem.setDefaultCommand(new DefaultDriveCommand(
		() -> m_controller.getRawAxis(0)));

Now `getRawAxis` won't get called until some code in `DefaultDriveCommand` calls it. When it does call it, it will get the state of the joystick, which can be used to move the robot. But what does that code look like? The command constructor will accept a variable with the type `Supplier<Double>`, and the code will call the `get` method on the variable to get the joystick state.  

Example:

	public class DefaultDriveCommand extends CommandBase {
		private final Supplier<Double> m_forwardSpeed;

		public DefaultDriveCommand(Supplier<Double> forwardSpeed) {
			m_forwardSpeed = forwardSpeed;
		}
		@Override
		public void execute() {
			DriveSubsystem.get().setMotorSpeed(m_forwardSpeed);
		}
	}
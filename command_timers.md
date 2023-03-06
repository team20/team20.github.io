Using timers in a command
===
Sometimes, you want to use timing to control a mechanism on the robot. This shows how to use a timer in a Command.  
A start time is captured, and we continuously check if enough time has passed before doing something and finishing the command.

	public class ExampleCommand extends CommandBase {
		private Instant m_startTime;

		// Called when the command is initially scheduled.
		@Override
		public void initialize() {
			// This stores the start time of the command
			m_startTime = Instant.now();
		}

		// Called every time the scheduler runs while the command is scheduled.
		@Override
		public void execute() {
			// This checks how much time has passed since the command started,
			// and if it's over 1000 milliseconds, we run the mechanism
			if (Duration.between(m_startTime, Instant.now()).toMillis() >= 1000) {
				// Run the mechanism
			}
		}

		// Returns true when the command should end.
		@Override
		public boolean isFinished() {
			// We can also use Duration.between to finish the command after a certain amount
			// of time. Here, we wait for 2000 milliseconds.
			return Duration.between(m_startTime, Instant.now()).toMillis() >= 2000;
		}
	}

Instant.now() gets the current time, and Duration.between().toMillis() returns how much time has passed between the start time(m_startTime) and the end time(Instant.now()) in milliseconds.
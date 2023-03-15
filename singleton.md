Singleton
===
A singleton prevents multiple objects being created from one class. We use it to prevent motors from being created in code multiple times.  

Example
---
Replace `ExampleSubsystem` with the name of your `Subsystem`, and make sure to change it in the `Exception` as well. The `get` method is so the subsystem can be accessed from any command.

	public class ExampleSubsystem extends SubsystemBase {
		private static ExampleSubsystem s_subsystem;
	
		public ExampleSubsystem() {
			// Singleton
			if (s_subsystem != null) {
				try {
					throw new Exception("Example subsystem already initialized!");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			s_subsystem = this;
		}
	
		public static ExampleSubsystem get() {
			return s_subsystem;
		}
	}
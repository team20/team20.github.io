Subsystems and Commands
===
You may wonder why robot code is organized into subsystems and commands.  
Maybe you want to know how it works and how to use it. This is the place to figure out both.

Why?
===
Picture this: We have no subsystems, no commands, just a Java class to house everything. We have to initialize and configure tons and tons of motors, encoders, and/or PID controllers.

	private final CANSparkMax m_motor1 = new CANSparkMax(Constants.kID, MotorType.kBrushless);
	private final CANSparkMax m_motor2 = new CANSparkMax(Constants.kID1, MotorType.kBrushless);
	private final CANSparkMax m_motor3 = new CANSparkMax(Constants.kID2, MotorType.kBrushless);
	...

This will very quickly add up to 20+ lines of code.  
And we haven't even started on the complicated stuff. Now that everything has been set up, we can start to do things with motors. But first, we need to constantly obtain data from our hardware, so our code now runs in a loop, constantly checking for conditions. Now we want to bind our controller buttons to certain actions, like spinning our motors at 10% speed, but only when the button is pressed. It should stop when we let go. It'll look something like this.

	if (button.isPressed()) {
		m_motor1.set(0.5);
		m_motor2.set(0.5);
	} else {
		m_motor1.set(0);
		m_motor2.set(0);
	}

That's a lot of lines for what should be simple. And imagine doing this multiple times for each button or condition. Soon, you'd have no idea how anything works, and a small change could break everything. So to solve this, WPILib has a framework which revolves around commands and subsystems, allowing the code we had before, to be organized and modular, only containing the motors, encoders, etc needed for a specific physical mechanism to work. But how does it all work?

How?
===

Subsystems
---
Every "major" part of a robot should have its own subsystem, and be named accordingly. The drivetrain gets the `DriveSubsystem`, an arm gets the `ArmSubsystem`, but even seemingly tiny parts like the Arduino get an `ArduinoSubsystem`. Do it in a way that makes sense. Stuff related to one physical mechanism should be isolated to one specific subsystem.  

Each subsystem should initialize and configure all the parts necessary for the mechanism to work(motors, encoders, PID controllers, etc.) The subsystem should then provide a way to manipulate or access these parts. A subsystem will almost always expose a method to set the speed of a motor, for example. They contain a periodic method, which isn't meant to be called, but is executed every 20ms, so you can do things like log encoder values. A subsystem can also provide a method to read encoder data. These methods(except for the periodic method) are then called by commands.  

Commands
---
Commands are the building blocks for robot control. Commands are created and provided with arguments, and then they use the methods provided by a subsystem to do stuff. A DriveCommand might drive the robot with joysticks as the argument/input. It would take the joystick input and call methods in the DriveSubsystem using the joystick input to set the speed of some motors to move the robot. A MoveArmCommand could move an arm to a certain position, with the position changing depending on the arguments the command is created with. A command can also do conditional logic. It could call a subsystem method to get an encoder reading, and if the value is above a certain point, it should do something different. Commands take the methods provided by a subsystem, and put in additional logic to create unique behavior and controls. But how do you execute a command?  

Triggers
---
Triggers are the final layer between a human controlling a robot, and the robot doing something. Triggers listen for a condition to be true, like a button being pressed, and will then execute a command. Triggers come in different forms. There's the `Trigger`, `JoystickButton`, and `POVButton`. These are the main Triggers you'll use, although you probably won't use `Trigger` very often.  

The way `JoystickButton` and `POVButton` works is simple: pass an input device to the constructor, give it a button number to listen for, and it provides various methods to execute commands when a condition is met. Read the [WPILib docs](https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj2/command/button/Trigger.html) on `Trigger` to see how they work.  

Triggers allow you to execute commands and control the robot when a condition, like a button being pressed, is true. It allows you to specify what the robot should do when a button is pressed, without having to write a bunch of logic to do so.
# Subsystems and Commands
- TOC
{:toc}

You may wonder why robot code is organized into subsystems and commands.  
Maybe you want to know how it works and how to use it. This is the place to figure out both.

# Why?

Picture this: We have no subsystems, no commands, just a Java class to house everything. We have to initialize and configure tons and tons of motors, encoders, and/or PID controllers.

```java
private final CANSparkMax m_motor1 = new CANSparkMax(Constants.kID, MotorType.kBrushless);
private final CANSparkMax m_motor2 = new CANSparkMax(Constants.kID1, MotorType.kBrushless);
private final CANSparkMax m_motor3 = new CANSparkMax(Constants.kID2, MotorType.kBrushless);
...
```

This will very quickly add up to 20+ lines of code.  
And we haven't even started on the complicated stuff. Now that everything has been set up, we can start to do things with motors. But first, we need to constantly obtain data from our hardware, so our code now runs in a loop, constantly checking for conditions. Now we want to bind our controller buttons to certain actions, like spinning our motors at 10% power, but only when the button is pressed. It should stop when we let go. It would look something like this:

```java
if (m_controller.getRawButton(1)) {
	m_motor1.set(0.1);
	m_motor2.set(0.1);
} else {
	m_motor1.set(0);
	m_motor2.set(0);
}
```

That's a lot of lines for what should be simple. And imagine doing this multiple times for each button or condition. Soon, you'd have no idea how anything works, and a small change could break everything. So to solve this, WPILib has the command-based framework, which revolves around commands and subsystems, allowing the code we had before to be organized and modular, with each part only containing the motors, encoders, etc needed for a specific physical mechanism to work. But how does it all work?

# How?

## Subsystems

Subsystems encapsulate the hardware for a mechanism to run. The primary objective of a subsystem is to prevent conflicting calls to hardware. It would be bad if multiple calls were made to set the speed of a motor at the same time. The command-based framework prevents hardware in a subsystem from being used simultaneously in multiple places. How do you decide what hardware goes into what subsystems? In general, the hardware required to run one physical mechanism should be isolated to one specific subsystem. This is because you need to coordinate all the parts in that mechanism, and you will often use mechanism independently from everything else, like how a drivetrain is independent of an intake. There's no need to put individual hardware parts in their own subsystems because you don't gain anything from it. If a group of hardware tends to act together, and independently from other hardware, the hardware gets its own subsystem. This is why you see different subsystems for drivetrains, intakes, shooters, etc. Following this, certain sensors such as vision cameras aren't always used in unison with anything. They can be independent of other hardware. (It's important to note that other sensors, like encoders are often bound to subsystems because their data often is used to spin motors for another mechanism.) However, those sensors don't actually need to be subsystems, and can just be plain objects. This is because there aren't conflicting calls that can be made to a sensor. All you can do is read the sensor, and reading it from multiple places won't cause issues. This is a rare situation, and most of the time, the hardware is encapsulated in a subsystem.

Each subsystem should initialize and configure all the parts necessary for the mechanism to work(motors, encoders, PID controllers, etc.) The subsystem should then provide a way to manipulate or access these parts. A subsystem will almost always expose a method to set the speed of a motor, for example. A subsystem could also provide a method to read encoder data. These methods then get called by commands to do things. It's also possible to skip the methods, and create commands in subsystems. Creating commands in this way is often faster, more readable, and much shorter than creating them separately. Subsystems also contain a periodic method, which isn't meant to be called manually or by commands but is executed every 20ms, so you can do things like log encoder values.

## Commands

Commands are the building blocks for robot control. Commands are created with arguments/input and they use the hardware provided by a subsystem to do stuff. A `DriveCommand` might drive the robot with joysticks as the argument/input. It would take the joystick input and call methods in the `DriveSubsystem` using the joystick input to set the speed of some motors to move the robot. A `MoveArmCommand` could move an arm to a certain position, with the position changing depending on the arguments the command is created with.

A command can also do conditional logic. It could call a subsystem method to get an encoder reading, and if the value is above a certain point, it does something different. Commands take the methods provided by a subsystem and use additional logic to create unique behavior and controls. But how do you execute a command?

## Triggers

Triggers are the final layer between a human operator, and the robot doing something. Triggers listen for a condition to be true, like a button being pressed, and provides various methods to execute commands, each differing in how the command is run. You can have it execute commands when a button is pressed, when it isn't pressed, only while a button is held, etc. Read the [WPILib docs](https://docs.wpilib.org/en/stable/docs/software/commandbased/binding-commands-to-triggers.html) using `Trigger` to see what's possible.

The primary way we use `Trigger` is through `CommandGenericHID`. `CommandGenericHID` offers a `button` method that accepts a button number, indicating the button you want to listen for. `button` returns a `Trigger`, which allows you to bind commands to them and run them when a button is pressed.

Triggers allow you to execute commands and control the robot when a condition, like a button being pressed, is true. It allows you to specify what the robot should do when a button is pressed, without having to write a bunch of logic to do so.

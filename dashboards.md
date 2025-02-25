# Dashboards
- TOC
{:toc}

Debugging robot code doesn't work in the same way debugging regular programs does. While setting breakpoints does work, when a breakpoint is reached, the robot tends to misbehave in weird ways. Instead, to see the values of variables in the code, we publish data to NetworkTables. For an intro to NetworkTables, see the [WPILib docs on NetworkTables](https://docs.wpilib.org/en/latest/docs/software/networktables/networktables-intro.html).

To publish a value to NetworkTables, use `SmartDashboard.putTYPE(name, value)`, where `TYPE` is the type of data you're sending. Use VS Code to help you select the correct method. Make sure to use a good name so you and other programmers aren't confused. You can put this anywhere in the code where you might want to see the value your code is producing. It can be placed in a method body to update the value when a method is called, in a subsystem `periodic` method, or wherever you see fit. You can then use a dashboard to see the values your code is producing. AdvantageScope (included with the WPILib installer) is the preferred program to view values, docs can be viewed in its [GitHub repo](https://github.com/Mechanical-Advantage/AdvantageScope/tree/main/docs).

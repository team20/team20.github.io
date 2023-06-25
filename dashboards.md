# Dashboards

Debugging robot code doesn't work in the same way debugging regular programs does. While setting breakpoints does work, when a breakpoint is reached, the robot tends to misbehave in weird ways. Instead, to see the values of variables in the code, we use dashboards.

To put a value onto a dashboard, use `SmartDashboard.putTYPE(name, value)`, where `TYPE` is the type of data you're sending. Use VS Code to help you select the correct method. Make sure to use a good name so you and other programmers aren't confused by the data. You can put this anywhere in the code where you might want to see the value your code is producing. It can be placed in a method body to update the value when a method is called, in a subsystem `periodic` method, or wherever you see fit. You can then use a dashboard to see the values your code is producing.

There are two primary dashboards provided by WPILib: SmartDashboard and Shuffleboard.  
SmartDashboard is extremely basic, and it dumps all the values you publish into a list.  
Shuffleboard has a grid layout, looks better overall, and has a feature to record and playback the data it receives over time. However, it suffers from performance problems from time to time(even in "normal" usage) and can be undesirable for that reason.  
Shuffleboard is good for most purposes, but if you run into problems, SmartDashboard will pretty much always work.

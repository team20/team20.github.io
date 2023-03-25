Singleton
===
A singleton prevents multiple objects being created from one class. We use it to prevent subsystems from being initialized more than once, as motors and similar things being initialized more than once can cause problems.

Example
---
In a subsystem, declare a private static member variable(in the subsystem, but not in any methods) called `s_subsystem`(don't assign anything to it yet,) with the type being the subsystem.  
In your subsystem's constructor, paste this snippet of code in, remembering to add the name of the subsystem in the `Exception`.
```java
// Singleton
if (s_subsystem != null) {
	try {
		throw new Exception("Example subsystem already initialized!");
	} catch (Exception e) {
		e.printStackTrace();
	}
}
s_subsystem = this;
```

This code works by checking if `s_subsystem` is currently storing anything. Since `s_subsystem` wasn't assigned anything, its default value is `null`. In the constructor, we assign the `s_subsystem` to the subsystem being created. Now that `s_subsystem` isn't `null` anymore, the if statement is true, and it will log an exception saying the subsystem was already initialized.
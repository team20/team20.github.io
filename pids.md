# PIDs

If PIDs are a completely new concept for you, read the [WPILib docs on PID](https://docs.wpilib.org/en/stable/docs/software/advanced-controls/introduction/introduction-to-pid.html). Otherwise, continue.

The only term in the PID calculation that will realistically matter to us is `P`. Usually, `P` will be enough to control a mechanism. There are some occasions where `D` will be used, and `I` should be avoided at all costs. If you really need `I`, set `kIz` in `Constants` to some low number to protect against integral windup. Then, `I` will only apply when the error is less than `kIz`. What you should use depends on the mechanism you are using PIDs for. Also, consulting a mentor doesn't hurt.

# Tuning PIDs

I think I'm supposed to put an intricate guide here. As mentioned before, `P` is the only term that really matters. But first, cap the maximum speed so it can't move fast enough to break itself or pose a safety hazard. In the `Constants` class, that looks like this:

```java
// The exact value will have to be determined by experiment,
// because you don't want it so slow it barely moves
// Min here is for the speed in reverse
public static final kMinOutput = -0.1;
public static final kMaxOutput = 0.1;
```

Additionally, make sure that the configuration for your PID controller includes a call to `setOutputRange`, with `kMinOutput` and `kMaxOutput` used as the arguments. That will cap the PID controller's maximum and minimum output to the number specified. Make sure it's not so low that the mechanism doesn't move or increasing a term doesn't do anything.

When tuning PIDs, start with a low `P` value, like 0.0001, and slowly increase it until you're happy. You always want to start with a low value so your mechanism doesn't break or pose a safety hazard(on top of capping the output).

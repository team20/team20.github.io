# I2C

I2C is how we communicate to the Arduino from the RoboRIO.

On the Arduino side, create a variable outside of any functions to store the integer being sent over I2C. Use `Wire.begin(address)` to start communicating on I2C with `address` as the Arduino's I2C address. Use `Wire.onReceive(receivingMethod)` to run `receivingMethod` every time the Arduino receives data from I2C. Put both of those in the `setup` function, as you want both of these to run once when the program starts. Use `Wire.read()` in `receivingMethod` to get the byte received and store it in the variable you created earlier. This part of your code should look like this:

```c++
int ledState = 0;
void setup() {
	Wire.begin(address);
	Wire.onReceive(receivingMethod);
}
void receivingMethod() {
	ledState = Wire.read();
}
```

On the roboRIO side, use `new I2C()` to start the I2C connection, providing `Port.kMXP` as the port to connect to and a constant containing the exact address you passed into `Wire.begin()`. To send data, call `writeBulk` with a byte array containing the data you want to send.

```java
public class ArduinoSubsystem extends SubsystemBase {
	private final I2C m_i2c = new I2C(I2C.Port.kMXP, ArduinoConstants.kAddress);

	public void sendData(byte code) {
		m_i2c.writeBulk(new byte[] { code });
	}
}
```

Avoid calling sendData in a periodic method. While this will probably be fine, it's best to avoid spamming the Arduino with data and filling buffers with data (both on the Arduino and on the roboRIO).

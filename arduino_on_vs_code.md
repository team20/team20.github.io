# Programming Arduinos with VS Code

If you want to program Arduinos, here are the steps to get started.

1. Install the [Arduino VS Code extension](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.vscode-arduino). Always use the bundled CLI.
2. Open up an Arduino sketch, and select a board(as of 2023, it's an Arduino Nano, but double check.) You may need to use the Board Manger (can be found in the Command Palette) to install the board.  
   You can now edit the code with all the features like autocomplete, formatting, etc.
3. Install any necessary libraries with the Library Manager (can also be found in the Command Palette).
4. If you haven't already, use a cable to connect to the Arduino.
5. Select the serial port.
6. Open the Command Palette and search for `Upload`. It doesn't matter if you pick the `Arduino` one or the `Arduino CLI` one, as long as it has `Arduino` in the name.

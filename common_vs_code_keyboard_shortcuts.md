# VS Code Keyboard Shortcuts

To use VS Code as efficiently as possible, here are some keyboard shortcuts to speed up common tasks.

- Ctrl + Shift + P
  - This is the most important one. This opens up the Command Palette, which houses everything you can do in VS Code. Plenty of references will be made to the Command Palette, so make sure you know its name and how to open it.
- Shift + F5
  - `Deploy Robot Code` in the Command Palette. This deploys robot code to the RoboRIO. Also very important.
- Shift + Alt + O
  - `Organize Imports` in the Command Palette. Removes unused imports, as well as adding imports you might be missing. If VS Code is saying something about unresolved types, try this.
- Ctrl + Space
  - `Trigger Suggest` in the Command Palette. Opens up the autocomplete box. If want to quickly see the available methods in a class or on an object, using this shortcut is very helpful.
- Ctrl + .
  - `Quick Fix` in the Command Palette. If there's a code error, and you want to see some quick fixes, click on the part that has the error, and use this shortcut. VS Code will give you the available options to fix that part of the code. Don't blindly select an option though, if none of the options look right, you need to do something else.
- F2
  - `Rename Symbol` in the Command Palette. Allows you to rename methods, variables, classes, etc across the entire codebase without having to do it manually.
- Ctrl + F2
  - Similar to F2, but it works on blocks of text instead. It works similarly to find and replace. Highlight a block of text, and this shortcut will allow you to rename all instances of it. Be careful with this, as it will select **ALL** instances of the text, including chunks of code. You probably won't need to use this very often.
- Ctrl + /
  - `Toggle Line Comment` in the Command Palette. This will comment or uncomment the selected lines.
- Alt + UpArrow/DownArrow
  - `Move Line Up/Down` in the Command Palette. These two actions will, as the name implies, move a line up and down. Highlight a block of text or click on a line, and use Alt with the up and down arrow keys to move the block of text up and down.

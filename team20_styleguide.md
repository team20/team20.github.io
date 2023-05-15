Style Guide
===
Keeping code well formatted makes it easier to figure out what's happening. Without it, your codebase looks like a jumbled mess that's completely unreadable, and no one will be able to figure out what your code does. In general, follow the general Java style, but there are specific differences to be aware of when coding at Team 20. The two differences are split into differences that come from WPILib and differences that come from Team 20.

Java Style in a nutshell
---
Every word in a class should be capitalized, e.g. `ClassName`. This is known as upper camel case or Pascal case.  
The first word in a variable should be lowercase, with subsequent words being capitalized, e.g. `variableName`. This is known as lower camel case.
Enum elements should be all uppercase, with words separated by underscores, e.g. `ENUM_VALUE`

Team 20 Style
---
Prefix static variables with `s_` and don't capitalize the first word after it, e.g. `s_subsystem`  
Format with tabs!
Methods in `CommandComposer` that are used for creating auto command sequences should have the name `getXAuto`, with `X` being the actions that the commands will do. An example is `getScoreThreeThenBalanceAuto`.

WPILib Style  
---
Prefix constants with `k`, and capitalize the word after it, e.g. `kConstant`  
Prefix member variables with `m_` and don't capitalize the first word after it, e.g. `m_memberVariable`

Configuring VS Code for proper tab formatting
---
To force VS Code to always use tabs, first, go to your settings by opening the Command Palette, and search for "Preferences: Open Settings (UI)".  
When you get to your settings, search for "Tab Size" and make sure it's set to 4.  
Search for "Detect Indentation" and uncheck it. Search for "Insert Spaces" and uncheck it.  
VS Code will now always format with tabs, no matter the file(this also means you shouldn't save files you shouldn't touch, like vendordeps files)
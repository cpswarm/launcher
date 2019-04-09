# Tab Configuration

This document explains how to configure the content for each tab.


## Basic 

The tab configuration file is located in `src/conf`, it exports a function which returns a list of tab objects.

### Tab Object

Each tab object contains the following properties:
- `id`: the ID to identify the tab, must be unique among all tabs;
- `name`: the name of the tab, which will be displayed on the tab button;
- `icon`: the location of the icon file for this tab
- `widgets`: a list of widget objects;
- `isDone`: a function which takes the tab object as input, and return true or false determining whether the `done` symbol will appear on the tab button.
- `isEnabled`: a function which takes the tab object as input, and return true or false determining whether this tab is unlocked for user to operate on.
- `allowLaunch`: a function which takes the tab object as input, and return true or false determining whether the the `launch` button should be enabled in the tab.
- `getCommandLine`: a function which takes the tab object as input, and return a string, which will be the command to be executed when launching application.

`isDone`, `isEnabled`, `allowLaunch`, `getCommandLine` will be called every time the status of a widget in the tab has changed, so that the tab will always remain up-to-date status.

### Widget Object

Widget objects are contained in the `widgets` field in the tab object. It has the following properties:
- `type`: the type of widget, must match one of those imported in `src/component/WidgetWrapper.vue`;
- `label`: the text that appears on top of the widget as label;
- `varId`: the variable name to associate the value of this widget to;
- `properties`: properties of the widget object, different according to types of widget. See each component to find out what properties it has;
- `isVisible`: optional, a function which takes the tab object as input, and return a boolean value indicating whether the widget is visible.
- `isEnabled`: optional, a function which takes the tab object as input, and return a boolean value indicating whether the widget is enabled.

`isVisible` and `isEnabled` is optional, they will be called every time the status of a widget in the tab has changed, so that the tab will always remain up-to-date status.

### Widget Properties

As mentioned earlier, each widget has different properties, which you specify in `properties` fields in the above widget configuration object. This section will list the properties for each type of widget.

#### Dropdown Box
A dropdown box widget which lets the user choose one option from a group of options.  

`type`: dropdown-box
`properties`: 
- `defaultValue`: the default selected value of the dropdown box
- `items`: a list of options that appears in the dropdown box
- `info`: the description text that appears below the label

#### Explore Button
A button widget which will open a local directory or a URL in browser.  

`type`: explore-button
`properties`: 
- `path`: the relativev file path or url to open
- `openUrl`: whether the button open a local file directory or a website url, `true` means the `path` will be opened in a browser

#### Select File Button
A button widget, which upon pressed, will open a dialog to prompt the user to select a file.  

`type`: select-file-button
`properties`: 
- `path`: the relative directory from which the user should choose a file

#### Single Checkbox
A single checkbox widget, which allows a user to select either true or false for an option.  

`type`: single-checkbox
`properties`:
- `defaultValue`: whether the default should be true or false
- `label`: the text to appear before the checkbox

#### Text Input
A text input widget, which lets the user specify a string or number as the option.  

`type`: text-input
`properties`: 
- `defaultValue`: the default text
- `info`: the description text that appears below the label
- `number`: if true, the text input only allow number
- `min`: minimum allowed number, only valid when `number` is true
- `max`: maximum allowed number, only valid when `number` is true

#### File List
A widget which monitors a directory, and optionally also allows user to create new file/dir or execute command according to the selected file/dir.  

`type`: file-list
`properties`: 
- `watchPath`: the relative path of directory to watch
- `allowAdd`: boolean, whether to allow add new file/dir from launcher
- `watchDir`: boolean, whether we watch changes of directories
- `watchFile`: boolean, whethere we watch changes of files
- `multiSelect`: boolean, whether to allow selecting multiple files/dirs
- `execCommand`: function, if this is not null, a button will appear, which when pressed, will execute the function specified here


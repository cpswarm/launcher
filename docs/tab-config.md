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
- `type`: the type of widget, must match one of those imported in `src/component/GenericTab.vue`;
- `label`: the text that appears on top of the widget as label;
- `varId`: the variable name to associate the value of this widget to;
- `properties`: properties of the widget object, different according to types of widget. See each component to find out what properties it has;
- `isVisible`: optional, a function which takes the tab object as input, and return a boolean value indicating whether the widget is visible.
- `isEnabled`: optional, a function which takes the tab object as input, and return a boolean value indicating whether the widget is enabled.

`isVisible` and `isEnabled` is optional, they will be called every time the status of a widget in the tab has changed, so that the tab will always remain up-to-date status.

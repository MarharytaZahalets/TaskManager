This is a Task Manager project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Welcome to Task Manager App repository 🚀

![gif](./docs/app.gif)

### Full app screen recording:
- [IOS](https://drive.google.com/file/d/1ShKnd2Q-6mQUDL5uxgXOuyDOSAy1dJks/view?usp=drive_link)
- [Android](https://drive.google.com/file/d/1FvN6CSbLwIYOS6IslWxPaC2b6JdW45nZ/view?usp=sharing)

# Getting Started

## Project Setup Environment

### IDE
- **WebStorm**: 2024.2.3

### Global Requirements
- **Node.js**: 23.1.0 (required version >= 18.18, installed using Homebrew)
- **Ruby**: 3.3.0 (required version >= 3.0.0, installed using Homebrew)
- **CocoaPods**: 1.16.2
- **React Native**: 0.76 (if using the New RN Debugger)

### Project Requirements
- **React Native**: 0.75.4
- **TypeScript**: 5.0.4 (required version >= 5.0.0)

> **Note**: Ensure you've completed the [React Native 0.75 - Environment Setup](https://reactnative.dev/docs/0.75/set-up-your-environment) instructions up until the "Creating a new application" step before proceeding.

## Step 1: Install modules and pods

First, you need to install all dependencies. 

Run the following commands in the root of the project to install node_modules:
```bash
npm install
```
For pods installation run:
```bash
npx pod-install
```
or
```bash
cd ios && pod install && cd ..
```

## Step 2: Start the Metro Server

Second, start **Metro**, the JavaScript bundler that ships with React Native.

To start Metro, run one of the following commands from the root of the Task Manager project:

- Without debugger:
```bash
npm start
```
This project uses the [New RN Debugger](https://reactnative.dev/docs/0.75/debugging), 
which uses _React Native v0.76_ globally (this will be installed during the process when 
you run the command above). If you don’t want to use the debugger, just continue with ```npm start```.
- With debugger:
```bash
npx react-native start --experimental-debugger
```
## Step 3: Start the JSON Server

Let _Metro Bundler_ run in its own terminal. Open a new terminal from the _root_ of your React Native project and run the following command to start json-server:
```bash
json-server --watch db.json --port 3000
```
You can change the port if needed. To ensure everything works as expected, you should see the following in your terminal:
```bash
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

♡( ◡‿◡ )

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/taskList
```
Now, we can start the application.

## Step 4: Start the Task Manager

>**Note**:  This application uses json-server, so to enable the main functionality (task management), please run this application on an **iPhone/iPad Simulator** or **Android Emulator**. It may not work correctly on real devices.

Let _json-server_ run in its own terminal. Open a new terminal from the root of the project and run the following command to start your Android or iOS app:

### For Android

```bash
npm run android
```

### For iOS

```bash
npm run ios
```

If everything is set up _correctly_, you should see the Task Manager running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app - you can also run it directly from within _Android Studio_ or _Xcode_.

# Troubleshooting

- **Error**: ```listen EADDRINUSE: address already in use :::[port]``` then run ```json-server --watch db.json --port 3000``` or ```npx react-native start --experimental-debugger``` that uses port ```8081```:

Run the following commands in your terminal.

1. Find the process using the port
```bash
sudo lsof -i :[port]
```
2. Kill the process
```bash
kill -9 <PID>
```
>**Note**: -9 kills the process immediately, and gives it no chance of cleaning up after itself. This may cause problems. Consider using -15 (TERM) or -3 (QUIT) for a softer termination which allows the process to clean up after itself.

- If you encounter any issues with React Native, refer to the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Contacts

If you have questions, remarks, or need help with setup, feel free to reach out via email: mzagalec@gmail.com

<!--
/**
 * Read the instructions and make changes the files located in node modules. These changes are important
 * for same UI.
 */
  -->

# App Name

Boostr



# Setup and running the code

1. Clone the app from repo

2. Run the following commands
   a. yarn install / npm install
   b. npx react-native link
   c. cd ios && pod install
   d. react-native run-ios / react-native run-android

# system requirements to run the code smoothly

MacBook with at-least 8gb ram with a good physical storage and a cpu with at-least 1.4GHz clock speed, also it can be run on other Operating systems as well with same configuration but creating ios simulator is not possible on any other operating system, but android supports most probably all operating systems.

# How to add a new entry in translation file to support localization

Run command => yarn i18n:edit, there would be a new i18n window will open where it will ask to locate the project, choose (File => import project => select "src/i18n/translations"), here you can add the localization data,
After adding/updating any localization value, please save the data by (File => Save), after that please close that window and run the command in terminal, i.e (yarn i18n:sync)

# Common Problems

1. A Problem while creating ios build ("No such module 'Combine'") =>
   This issue will resolve by comment out a line i.e (import Combine;) inside file(Pods/Development Pods/kingstinct-react-native-healthkit/ReactNativeHealthkit.swift)

2. Certificates issues while creating ios build
   Please install all required certificates before build inside folder "ios/Certificates"

3. Creating Android build signature issue
   Please check the app/build.gradle file for keystore and its credentials.

# Android minimum sdk version required to run the app

minSdkVersion : 21

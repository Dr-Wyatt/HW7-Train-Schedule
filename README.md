# HW7-Train-Schedule

## Introduction
This app was created for the seventh homework for NU Bootcamp. We were to develop a time table for a user to calculate the next train time provided some user input.

## Problems 
The most difficult issue was calculating time with Moment.JS. There were some formatting issues I ran into, where it would not recognize an input as a moment, or it would not want to subtract correctly. I read through the documentation, looked up different examples until I finally arrived at the correct conclusion to allow for the calculation to succeed.

## Instructions
Enter a train line name, destination, First Train time, and frequency, then click submit.
The information will be pushed to the Firebase Realtime Database, and then diplayed to the table above. 
The next arrival and minutes away are calculated from the First Train Time, frequency, and the current time utilitzing Moment.js. 

Never be late again!

## Website
https://dr-wyatt.github.io/HW7-Train-Schedule/
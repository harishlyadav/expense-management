# App for Expense-Management [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

### Table of Contents
* [What is this?](#what-is-this)
* [Features](#features)
* [Requirements](#requirements)
* [Installation](#installation)
* [Run Application and start development Server](#run-application-and-start-development-server)
* [Run Tests](#run-tests)

## What is this?
This small application can calculate a department and/or manager’s monthly expense allocation based on the number and types of employees reporting to the manager or contained within the department.

## Features
This application show manager/employee hierarchy and expense for respective manager in department based on the number and types of employees reporting to the manager or contained within the department.

## Requirements
Below are the requirement for the application.
-Developers warrant an allocation of $1000 each.
-QA Testers warrant an allocation of $500 each.
-Managers warrant an allocation of $400 each.
-Managers can have QA Testers, Developers and other managers report to them.
-Departments consist of any kinds of employees.
-Users of this application should be able to:
-Determine the monthly expense allocation warranted a manager who has various employee types reporting to him/her at least two levels deep (Manager -> Manager -> Developer).   -The level of depth of the hierarchy should be flexible ideally.
    -Determine the monthly expense allocation warranted a department with various employee types under it at multiple levels deep just as the Manager can.

## Installation
Open the terminal window in Visual Studio Code. Just start the commands below in the root folder where you stored the package.
This will install all required dependencies automatically. 
```SH
root> npm install
```

## Run Application and start development Server
To run this app in your browser just start everything with the comment below in the applications root folder.
```SH
root> npm run start
```


## Run Tests
All unit tests are performed with [jasmin](https://jasmine.github.io) and [karma](https://karma-runner.github.io) and can be configured in `karma.conf.js`.
Run command below to execute all unit test:
```SH
root> npm run test
```
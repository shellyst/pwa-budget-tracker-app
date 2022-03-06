# Progressive Web Application (PWA): Budget Tracking App

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Preview](#preview)
- [Contributors](#contributors)

## Description

This project provides users with a simple way to keep track of purchases in real time, as their money is being spent. The application uses service works and indexDB in order to provide offline functionality, so users can use the app even when no online internet connection is available.

## User Story

```
AS AN avid traveler
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling
```

## Acceptance Criteria

```
GIVEN a budget tracker without an internet connection
WHEN the user inputs an expense or deposit
THEN they will receive a notification that they have added an expense or deposit
WHEN the user reestablishes an internet connection
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated
Mock-Up
```

## Installation

In order to use the application, follow these steps in the terminal in the root of your application:

`npm init`

`npm install`

## Usage

Once npm packages have been installed, user may use the application using the following commands in the terminal:

`npm start`

## Testing

In order to test the network's offline availability, open the `http://localhost:3001/` and open DevTools in Chrome. Under the Network tab, select connection to "offline", and enter a transaction. Turn the connection back online, and users will be able to see the offline data updated in real time.

## Preview

[![image.png](https://i.postimg.cc/bw0tH87z/image.png)](https://postimg.cc/jD52RVq9)

## Contributors

Michelle Stone

# Real World App

This project uses WebDriverIO, Faker, and Allure for automated testing.

## Prerequisites

Before running the tests, make sure you have Node.js installed on your machine. These tests work only on local server. 
You can clone the repo via the command line with:
```bash
git clone https://github.com/cypress-io/cypress-realworld-app.git
```
Make sure that local server is running before tests execution.

## Installation

-   Clone this repository
-   Go to the project root
-   Install dependencies:

```bash
npm install
```

## Scripts

- To run tests in Chrome: 
```bash
wdio:chrome
```

-  To run tests in Firefox:

```bash
wdio:firefox
```

- To run a specific test file:
```bash 
wdio:file
```
- To run all tests:
```bash
wdio:all
```

## Dependencies

- @faker-js/faker: Fake data generation.
- allure-commandline: Commandline tool to generate Allure reports.
- wdio: WebDriver bindings for Node.js.
# Frontend for the IBC job portal

This repository contains the code for the frontend application for the IBC job portal. It is developed in line with the requirements of the course Digitale Wirtschaft for the MMT masters program at LMU.
Backend can be found [here](https://github.com/r-wittmann/ibc-backend)

# Getting Started

This is a React project. Should you not be familiar with React, please have a look at the following resources:

[Getting started with React](https://reactjs.org/docs/hello-world.html)
[Tutorial](https://reactjs.org/tutorial/tutorial.html)

To get started insert the following lines to your console

    $> git clone https://github.com/r-wittmann/ibc-portal-frontend.git
    $> cd ibc-portal-frontend
    $> npm install
    $> npm run dev

This starts the application and opens the default browser. The Application is rebuild every time a file is updated and saved.

The application runs on ```localhost:3000``` and connects to the running backend. Landing page is the student portal with postings and companies.
Company account login can be found at ```localhost:3000/company/login```. Following test accounts are available:

| username | password |
|----------|----------|
| user1    | 1        |
| user2    | 1        |
| user3    |          |

User3 is not accepted yet and therefore doesn't have a password yet.

Admin account login can be found at ```localhost:3000/admin/login```. Following test account is available:

| username | password |
|----------|----------|
| admin    | 1        |

# Deployment

As the legal situation is not clear yet, we decided to host the frontend on a trial account at [pivotal webservices](http://run.pivotal.io/) using [cloud foundry](https://www.cloudfoundry.org/).

Before you can deploy the application to the cloud, you need to install the cloud foundry command line interface ([How To](http://docs.cloudfoundry.org/cf-cli/install-go-cli.html))
After you are able to run cf commands in your terminal, you will be able to deploy the application using

    $> npm run deploy

This triggers a production build and uploads the static build folder to pivotal webservices.
It is accessible at https://ibc-job-portal.cfapps.io
As this is our current production environment, there is no test data available.

&copy; 2017 by Lisa Nierhaus, Katrin Hagner, Abdelrahman Youssef and Rainer Wittmann. All rights reserved.

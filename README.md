# Interview Scheduler

### Version 1.0.0

Welcome to Interview Scheduler, an application designed to manage interview appointments between students and interviewers. With this application you may create, edit and delete interviews within the available appointment spots, in a persistent database.

The User Interface was built using React, and was tested using Jest and Cypress as unit, integration and E2E (End-to-End) test platforms. Moreover, Storybook was used to build the app's components separately.

Please refer to the API avaliable [here](https://github.com/jgoncalvesjr/scheduler-api), to run the app's database.

# Final Product

Interview Scheduler is designed to perform in mobile devices, tablets and desktops. Its layout can adapt responsively depending on the device you may be using.

![Mobile presentation](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_mobile.png) ![Tablet presentation](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_tablet.png)

![Desktop presentation](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_desktop.png)

When the application is loaded, the current schedule is displayed. From there, you may navigate through days between Monday and Friday and book a new interview, within any available spot for that day:

![Create a new appointment](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_form.png)

The app is designed to validate whether a student name or intervier is blank, and will validate such information:

![Validate student](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_validate_student.png)
![Vaidate interviewer](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_validate_interviewer.png)

After filling name and selecting an interviewer, the new appointment is saved and displayed, and the spots available for that day are updated. The user will see a progress image while the information is processed to the database.

Any saved appointment may be edited or deleted. The corresponding icons will be displayed while hovering the mouse over an appointment.

![Saving appointment](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_save.png)
![Displaying new appointment](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_show.png)

You may delete any interview clicking in the corresponding trash icon. In this case, you will be prompted to confirm its deletion, and if confirmed, the interview will be deleted, and the spot for that day will be cleared.

![Delete interview prompt](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_confirm.png)
![Deleting appointment](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_delete.png)
![Displaying clear spot](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_show2.png)

If any server error prevent an appointment from being saved or deleted, the user will be informed of the error, and may click the "X" (back) icon to return to the previous display (appointment show or new appointment form):

![Error saving](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_error_save.png)
![Error deleting](https://github.com/jgoncalvesjr/scheduler/blob/master/docs/interviewer_error_delete.png)

## Technologies used

- Node.JS
- React
- SASS
- PostrgreSQL
- Webpack
- Axios
- Storybook
- Jest
- Cypress

## Dependencies

- axios
- classnames
- normalize.css
- react 16.9.0
- react-dom
- react-scripts

## Dev Dependencies

- @babel/core
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- cypress
- eslint-plugin-cypress
- node-sass
- prop-types
- react-test-renderer 16.9.0

# Setup

1. Clone the repository with `git clone https://github.com/jgoncalvesjr/scheduler`.
2. Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

# ESTCube-2 telemetry decoder frontend

## Project structure

The `app` sub-project is a React application that will contain a iframe to display the contents of the grafana dashboard as well as any other features, exclusive to the telemetry decoder and relay software (such as configuration components).

The `app` sub-project uses typescript and webpack.

## Running

The project is using yarn workspaces, and is configured with that in mind. To install the dependencies for all sub-projects, run `yarn install` in the `frontend/` directory.

This will place all the required node modules in the `frontend/node_modules` directory, which the sub-projects will share.

The yarn scripts depend on the current working directory:

### Root directory

When run from the root directory `frontend/`, the available scripts are:

* ```yarn build``` will build the development bundle of the `app` sub-project.
* ```yarn build:prod``` will build the production bundle of the `app` sub-project.
* ```yarn serve``` will serve the `app` sub-project locally (default port: 3000)
* ```yarn test``` will run the tests for the `app` sub-project.
* ```yarn lint``` will run the linter on all sub-projects.
* ```yarn lint:fix``` will run the linter on all sub-projects with the auto-fixer on.

### `app` sub-directory

To install dependencies to whole project, dependencies must be installed in `frontend/app/` directory.  
When run from the app directory `frontend/app/`, the avialable scripts are:

* ```yarn build``` will build the development bundle of the `app` sub-project.
* ```yarn build:prod``` will build the production bundle of the `app` sub-project.
* ```yarn serve``` will serve the `app` sub-project locally (default port: 3000)
* ```yarn test``` will run the tests for the `app` sub-project.
* ```yarn lint``` will run the linter on `app` sub-project.
* ```yarn lint:fix``` will run the linter on `app` sub-projects with the auto-fixer on.
 

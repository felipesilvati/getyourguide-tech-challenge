# GetYourGuide Tech Challenge

This repository contains a full-stack application for displaying activities and suppliers data. It is composed of a React frontend, a Node.js backend, and a Cypress end-to-end testing suite.

Made by Felipe Silva (https://github.com/felipesilvati)

## Application Components

- **frontend**: A Vite + React application that fetches and renders activities and suppliers data from the backend.
- **backend**: A Node.js Express application that serves as an API provider for activities and suppliers information.
- **e2e**: A Cypress end-to-end testing suite that ensures the application's features work as expected with significant test coverage.

## Running the Application

To run the application:

1. Ensure that Docker is installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the root directory of the project.
4. Run the following command to build and start all services:

   ```sh
   docker compose up --build

   # or simply
   ./run.sh
   ```

This command will start the frontend application and the backend API. Once the services are running, you can access:

- The frontend at `http://localhost:4173`.
- The backend API endpoints directly at `http://localhost:3001`.

## Testing the Application

### End to End Testing

To execute the end-to-end tests:

   ```sh
   ./run-e2e-tests.sh
   ```

This will open the backend, frontend and the Cypress Test Runner in the terminal.

You can also run it locally with the following steps:

1. Make sure that both frontend/backend services are running.
2. Navigate to the `/e2e` directory.
3. Run the following command to start the Cypress Test Runner:

   ```sh
   yarn install
   yarn run cypress open
   ```

### Unit Testing
#### Frontend
To run the frontend unit tests:

1. Navigate to the `/frontend` directory.
2. Run the following command to execute the tests:

   ```sh
   yarn install
   yarn test
   ```

#### Backend
To run the backend unit tests:

1. Navigate to the `/backend` directory.
2. Run the following command to execute the tests:

   ```sh
   yarn install
   yarn test
   ```

## Design Rationale

When approaching the GetYourGuide Tech Challenge, I made strategic decisions to craft a solution that balances rapid development with best practices in software architecture.

### Frontend Architecture

The frontend is powered by Vite and React, a combination chosen for its exceptional development speed and robust build optimizations, especially beneficial for a project with a tight deadline. Vite's out-of-the-box features, such as fast refresh and efficient bundling, allowed me to quickly see changes and iterate on the application's functionality.

React's component-based model was instrumental in building a modular and maintainable codebase. The use of Storybook paralleled this approach, offering a sandbox to develop and test UI components in isolation. This not only expedited the frontend development process but also ensured a high fidelity in the visual rendering of components, which is crucial for a user-centric application.

### Backend Infrastructure

For the backend, I implemented a Node.js application with an Express server, a choice driven by its simplicity and flexibility. This setup enabled me to quickly scaffold a RESTful API that could reliably serve data from the provided `activities.json` and `suppliers.json` files. Although frameworks like NestJS offer extensive standardization, Express's minimalist nature was more in line with the project's scope, allowing for an agile development process without the overhead of a more opinionated framework.

A key feature of the backend is pagination, ensuring the API remains scalable and performant regardless of the dataset's size. This design decision anticipates future growth and addresses potential performance bottlenecks by limiting the number of activities delivered in a single response, thereby optimizing data transfer and load times.

### Testing and Quality Assurance

Testing was a cornerstone of the development cycle. I leveraged Jest for unit testing to validate both backend and frontend components, ensuring reliability at the module level. To guarantee the integrated application functions as intended, I introduced an end-to-end testing suite using Cypress. This was particularly crucial for validating the application's behavior in a Dockerized environment, simulating real-world usage scenarios.

### API Strategy

The decision to use a REST API over GraphQL was deliberate, aimed at maintaining simplicity and reducing the initial setup complexity. Given the current requirements, REST provided a straightforward, time-efficient solution without sacrificing the application's quality or future scalability.

### Concluding Thoughts

In summary, the design choices made throughout this project were carefully considered to align with the challenge's objectives—delivering a scalable, testable, and high-quality application within a defined timeframe. These choices reflect a strategic approach to software development that prioritizes adaptability, performance, and maintainability.

## My TODO List

#### Backend Development
- [x] Init Express Backend with a REST API (healthcheck)
- [x] Endpoint to get list of activities
- [x] Endpoint to get suppliers
- [x] Endpoint to get activities with suppliers combined
- [x] Decide on REST vs. GraphQL for API
- [x] Add pagination for the list of activities
- [x] Add a Dockerfile for the backend

#### Frontend Development
- [x] Init React Frontend
- [x] Create a storybook for the main UI components
- [x] Create UI showing list of activities
- [x] Add a search bar to filter activities (ensure alignment with backend filtering logic decision)
- [x] Add a Dockerfile for the frontend

#### Fullstack Integration
- [x] Ensure client application consumes the API exposed by the backend (activities)
- [x] Ensure client application consumes the API exposed by the backend (suppliers)
- [x] Ensure client application consumes the API exposed by the backend (activities with suppliers combined)
- [x] Ensure pagination works as expected with the client application

#### Infrastructure and Deployment
- [x] Ensure the project can be run locally with the provided Docker compose file (`docker-compose up --build`)
- [x] Modify/add any dependencies as required for Docker integration

#### Documentation and Notes
- [x] Document architectural decisions and rationale
- [x] Note any features/improvements left out due to time constraints
- [x] List any assumptions made during development
- [x] Prepare documentation for setup and API usage in `readme.md`

#### Testing and Quality Assurance
- [x] Check unit test coverage for both backend and frontend components
- [x] Ensure functionality works as expected with Docker setup
- [x] End to end testing for the application

#### Submission and Presentation Preparation
- [x] Prepare project for submission (exclude `node_modules` or other dependency directories)
- [x] Be prepared to present the work, demo the application, and explain architectural choices and code
- [x] Ready for live coding during the interview to refactor code, add features, or fix bugs

## Future Improvements
- [ ] Replace json files with a SQL database
- [ ] Use opinionated framework for the backend (e.g., NestJS) to improve scalability and maintainability
- [ ] Authentication and Authorization for the API
- [ ] Add more advanced error handling and logging
- [ ] Implement UI to display more activity details by ID (redundant for now)
- [ ] Replace the current search bar with more advanced search features (e.g., sorting, filtering, etc.)
- [ ] Add caching mechanism (based on performance needs)
- [ ] Fix variable ActivityCard component height for better UI/UX
- [ ] "Hot reload" frontend/backend container and skip build caching to not get stuck with old content
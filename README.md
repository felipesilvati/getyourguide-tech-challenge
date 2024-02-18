# getyourguide-tech-challenge

### TODO List

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
- [x] Ensure the project can be run locally with the provided Docker compose file (`docker compose up --build`)
- [x] Modify/add any dependencies as required for Docker integration

#### Documentation and Notes
- [ ] Document architectural decisions and rationale
- [x] Note any features/improvements left out due to time constraints
- [ ] List any assumptions made during development
- [ ] Prepare documentation for setup and API usage in `readme.md`

#### Testing and Quality Assurance
- [ ] Check unit test coverage for both backend and frontend components
- [x] Ensure functionality works as expected with Docker setup
- [ ] Basic End to end testing for the application

#### Submission and Presentation Preparation
- [ ] Prepare project for submission (exclude `node_modules` or other dependency directories)
- [ ] Be prepared to present the work, demo the application, and explain architectural choices and code
- [ ] Ready for live coding during the interview to refactor code, add features, or fix bugs

### Future Improvements
- [ ] Replace json files with a SQL database
- [ ] Use opinionated framework for the backend (e.g. NestJS) to improve scalability and maintainability
- [ ] Authentication and Authorization for the API
- [ ] Add more advanced error handling and logging
- [ ] Implement UI to display more activity details by ID (redundant for now)
- [ ] Replace the current search bar with a more advanced search features (e.g. sorting, filtering, etc.)
- [ ] Add caching mechanism (based on performance needs)
- [ ] Fix variable ActivityCard component height for better UI/UX
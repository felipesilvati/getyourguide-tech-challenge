# getyourguide-tech-challenge

### TODO List

#### Backend Development
- [ ] Init Express Backend with a REST API (healthcheck)
- [ ] Endpoint to get list of activities
- [ ] Endpoint to get suppliers
- [ ] Decide on REST vs. GraphQL for API
- [ ] Implement filtering logic (server-side or client-side, based on decision)
- [ ] Add a Dockerfile for the backend
- [ ] Add caching mechanism (optional, based on performance needs)

#### Frontend Development
- [x] Init React Frontend
- [x] Create a storybook for the main UI components
- [ ] Create UI showing list of activities
- [ ] Add a search bar to filter activities (ensure alignment with backend filtering logic decision)
- [ ] Add a sorting feature for activities
- [ ] Implement UI to display activity details (title, price with currency, rating, special offer status, supplier name, and location)
- [ ] Add a Dockerfile for the frontend

#### Fullstack Integration
- [ ] Ensure client application consumes the API exposed by the backend
- [ ] Implement searching/filtering functionality based on architectural decision
- [ ] Implement sorting functionality for the list of activities
- [ ] Implement pagination for handling large sets of activities

#### Infrastructure and Deployment
- [ ] Ensure the project can be run locally with the provided Docker compose file (`docker compose up --build`)
- [ ] Modify/add any dependencies as required for Docker integration

#### Documentation and Notes
- [ ] Document architectural decisions and rationale
- [ ] Note any features/improvements left out due to time constraints
- [ ] List any assumptions made during development
- [ ] Prepare documentation for setup and API usage in `readme.md`

#### Testing and Quality Assurance
- [ ] Check test coverage for both backend and frontend components
- [ ] Ensure functionality works as expected with Docker setup

#### Submission and Presentation Preparation
- [ ] Prepare project for submission (exclude `node_modules` or other dependency directories)
- [ ] Be prepared to present the work, demo the application, and explain architectural choices and code
- [ ] Ready for live coding during the interview to refactor code, add features, or fix bugs

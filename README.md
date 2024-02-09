# Acceptance Criteria

## General Requirements

-   The API must be built using ExpressJS.
-   Zod must be used for validating endpoint parameters and data from the SQLite database.
-   The API documentation must be updated to reflect new capabilities and must reside within the repository.

## API Endpoints

-   CRUD Operations for Todos:
    -   Create new todo items.
    -   Retrieve existing todo items, with support for pagination.
    -   Update existing todo items.
    -   Delete existing todo items.
-   Pagination:
    -   Implement pagination for the retrieve (list) todo items endpoint.
    -   Support customizable page size and page number parameters.
-   Authentication:
    -   Implement an authentication mechanism (e.g., JWT tokens).
    -   Secure endpoints to require a valid authentication token, except for login/signup endpoints.
    -   Provide endpoints for user registration and login.
    -   Include middleware to validate authentication tokens.

## Validation

-   Endpoint Parameter Validation:
    -   Use Zod to validate request parameters for each endpoint (e.g., todo item ID, pagination parameters).
-   Data Validation:
    -   Use Zod to validate data structures for todos and users before inserting or updating in the SQLite database.

## Database

-   Utilize SQLite for storing data related to todos and users.
-   Ensure the database schema supports necessary fields for todos (e.g., ID, title, description, status) and users (e.g., ID, username, password hash).

## Documentation

-   Update API documentation to include:
    -   Instructions for setting up and running the API.
    -   Detailed descriptions of all endpoints, including required parameters and example requests/responses.
    -   Authentication guide, explaining how to register, log in, and make authenticated requests.
    -   Pagination details, explaining how to use pagination parameters.
-   Ensure the documentation is accessible within the repository, ideally in a README file or a dedicated docs directory.

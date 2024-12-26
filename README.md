# GitHub API Statistic

This project is a Node.js application that fetches and displays GitHub user statistics using the GitHub API.

## Features

- Fetches user data from GitHub
- Calculates user rating based on various metrics
- Displays user statistics in an SVG format

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ilhamridho04/github-api-statistic.git
    ```
2. Navigate to the project directory:
    ```sh
    cd github-api-statistic
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Copy the contents of `.env-example` into `.env` and fill in the required values:
    ```env
    APP_NAME=GITHUB-API
    APP_ENV=local
    APP_KEY=base64:q1Q6
    APP_DEBUG=true
    APP_URL=http://localhost
    APP_TIMEZONE=Asia/Jakarta
    PORT=3000

    LOG_CHANNEL=stack

    DB_CONNECTION=mysql
    DB_HOST=
    DB_PORT=
    DB_DATABASE=
    DB_USERNAME=
    DB_PASSWORD=

    GITHUB_TOKEN=your_github_token_here
    ```

## Usage

1. Start the application:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Endpoints

- `/`: Fetches and displays statistics for the authenticated GitHub user.
- `/username/:username`: Fetches and displays statistics for the specified GitHub username.

## License

This project is licensed under the MIT License.
# IndianCalendarBadge

This project captures a screenshot of a badge displaying today's date in the Hindu calendar (Vikram Samvat) and updates it daily using GitHub Actions.

## Features

- Uses Puppeteer to capture a screenshot of the badge.
- Automatically updates the screenshot daily using a scheduled GitHub Action.
- Stores the screenshot in the repository.


## GitHub Actions

This project includes a GitHub Actions workflow that captures a screenshot daily at midnight and commits it to the repository.

### Workflow Configuration

The workflow is defined in `.github/workflows/screenshot.yml`. It performs the following steps:
- Checks out the code.
- Sets up Node.js.
- Cleans old artifacts.
- Installs dependencies.
- Runs the Puppeteer script to capture the screenshot.
- Checks if the screenshot exists.
- Moves the screenshot to the `screenshots` directory.
- Commits the screenshot to a new branch and merges it into the main branch.
- Uploads the screenshot as an artifact.

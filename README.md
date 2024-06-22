# Cartridge Generator CLI

This Command Line Interface (CLI) tool automates the creation of a new cartridge structure for Salesforce Commerce Cloud projects. It sets up directories and copies template files while allowing customization of the cartridge name.

## Requirements

- Node.js (version >= 8)
- npm (Node Package Manager)

## Installation

Ensure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org).

### Clone the repository:

```bash
git clone https://github.com/marcboreu/sfcc-cartridge-generator.git
cd sfcc-cartridge-generator
```

### Install dependencies:

```bash
npm install
```

### Usage

Run the CLI tool from the command line:

```bash
npx cartridge-generator-cli
```

Follow the prompts to enter the name of the new cartridge when prompted.

## What It Does

Prompts for Cartridge Name: Asks the user to input a name for the new cartridge.

Creates Directory Structure: Sets up a basic directory structure for the new cartridge.

Copies Template Files: Copies predefined template files from ```../templates/cartridge to the current working directory.```

Customizes Files: Renames and updates files to reflect the provided cartridge name.

Completion: Notifies the user when the cartridge creation process is complete.

### Output Directory Structure

The generated cartridge structure will include the following directories and files:

```
cartridge/
├── controllers/  # Contains controllers for the cartridge.
├── models/       # Contains models for the cartridge.
├── scripts/      # Contains scripts for the cartridge.
├── static/       # Contains static assets for the cartridge.
└── templates/    # Contains template files for the cartridge.
```

This README provides clear instructions on how to use the CLI tool to generate a new Salesforce Commerce Cloud cartridge structure, ensuring clarity on the usage of Node.js for execution. Adjust paths and placeholders (npx cartridge-generator-cli, ../templates/cartridge, /path/to/destination/MyCartridge, etc.) according to your specific project setup.

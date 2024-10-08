# Next.js Authentication Example with NextAuth.js

This repository provides an example authentication system for Next.js using **NextAuth.js**. It includes user authentication with providers such as Google, GitHub, and credentials-based login, utilizing MongoDB as the database.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables Setup](#environment-variables-setup)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project demonstrates how to integrate Next.js with **NextAuth.js** for a fully functional authentication system. It supports multiple providers and stores user data in a MongoDB database using **Prisma** as an ORM.

## Features

- Authentication with Google, GitHub, and credentials
- Session management using **NextAuth.js**
- MongoDB as a persistent database via **Prisma ORM**
- Secure environment with `.env` configuration

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [PNPM](https://pnpm.io/) (for package management)
- [MongoDB](https://www.mongodb.com/) (for database setup)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli) (for database schema management)

## Installation

Follow these steps to install and set up the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/nextjs-auth-example.git
   ```

2. **Navigate to the project directory:**

 ```bash
   cd nextjs-auth-example
  ````

3. **Install dependencies using PNPM:**

  ```bash
   pnpm install
   ```

## Environment Variables Setup

Next, you need to set up the environment variables for the project. Create a `.env` file in the root directory and configure the following variables:

# .env file

NEXTAUTH_SECRET=your-nextauth-secret

# 
GOOGLE_CLIENT_ID=your-google-client-id
#
GOOGLE_CLIENT_SECRET=your-google-client-secret
#
GITHUB_ID=your-github-id
#
GITHUB_SECRET=your-github-secret
#
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname


Ensure you replace the placeholder values with your actual credentials.

## Database Setup

The project uses **Prisma** to manage the database schema. To set up the MongoDB database:

1. **Create a MongoDB database** on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or any other MongoDB provider.

2. Push the Prisma schema to the database using this command:

  ```bash
   pnpm prisma db push
   ```

This will synchronize your Prisma schema with your MongoDB database.

## Running the Project

Once you have the environment variables and database set up, you can start the development server:

```bash
pnpm dev
```

The application will be running locally  on [http://localhost:3000](http://localhost:3000) .

## Contributing

Contributions are welcome! If you would like to contribute to this project, feel free to submit a pull request. Please ensure your contributions follow the project's coding standards.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

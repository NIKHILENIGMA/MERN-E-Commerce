# Full stack E-Commerce Project 

This is a full stack e-commerce application built using the MERN stack with additional libraries and tools.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Shadcn**: A component library for React.
- **TailwindCSS**: A utility-first CSS framework.
- **React Router**: A collection of navigational components for React applications.

### Backend
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing application data.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **bcryptjs**: A library to help hash passwords.

## Features

- User authentication and authorization using JWT and bcryptjs.
- Product listing, searching, and filtering.
- Shopping cart and checkout process.
- Order management for users and admins.
- Responsive design using TailwindCSS.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/NIKHILENIGMA/MERN-E-Commerce.git
    cd MERN-E-Commerce
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the development servers:
    ```bash
    # In the client directory
    npm start

    # In the server directory
    npm run dev
    ```

## Usage

- Visit `http://localhost:3000` to view the application.
- Use the provided UI to register, login, and start shopping.

## Contribution Guidelines

We appreciate your interest in contributing to the project! To ensure a smooth process, please follow these guidelines:

### How to Contribute

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page to create a copy of the repository on your GitHub account.

2. **Clone Your Fork**: Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/your-username/MERN-E-Commerce.git
    cd MERN-E-Commerce
    ```

3. **Create a Branch**: Create a new branch for your feature or bugfix.
    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make Changes**: Make your changes to the codebase.

5. **Commit Changes**: Commit your changes with a clear and descriptive commit message.
    ```bash
    git add .
    git commit -m "Add feature: your feature name"
    ```

6. **Push to GitHub**: Push your changes to your forked repository.
    ```bash
    git push origin feature/your-feature-name
    ```

7. **Create a Pull Request**: Go to the original repository and create a pull request from your forked repository. Provide a clear description of your changes and any related issue numbers.

### Code Style

- Follow the existing code style and conventions.
- Write clear and concise commit messages.
- Ensure your code is well-documented.

### Reporting Issues

- If you find a bug, please create an issue on GitHub with a clear description of the problem and steps to reproduce it.
- Feature requests are welcome! Please provide a detailed description of the feature and its potential benefits.

Thank you for contributing!

## License

This project is licensed under the MIT License.
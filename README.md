# My React App

This is a React application that serves as a task management tool. It features a login page, a dashboard for viewing tasks, and reusable components for better maintainability.

## Features

- **Reusable Components**: The application is structured with reusable components such as `TaskCard` and `TaskList`.
- **Routing**: Utilizes React Router for navigation between the Login and Dashboard pages.
- **Global State Management**: Implements global state management using the Context API.
- **API Integration**: Consumes a REST API using Axios for fetching tasks and user data.
- **Responsive Design**: Designed to be responsive using CSS Modules and Tailwind CSS.

## Project Structure

```
my-react-app
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── TaskCard.tsx
│   │   ├── TaskList.tsx
│   │   └── index.ts
│   ├── context
│   │   └── GlobalState.tsx
│   ├── pages
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── index.ts
│   ├── services
│   │   └── api.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── routes.tsx
│   ├── styles
│   │   ├── App.module.css
│   │   └── index.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-react-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Navigate to the Login page to authenticate.
- Once logged in, you will be redirected to the Dashboard where you can view your tasks.

## Technologies Used

- React
- TypeScript
- React Router
- Axios
- CSS Modules / Tailwind CSS

## License

This project is licensed under the MIT License.# frontend-proy-final

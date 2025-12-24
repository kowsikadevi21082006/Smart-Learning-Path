/**
 * Mock Data for Development
 * 
 * Sample learning path structure and quiz data for testing.
 */

export const mockLearningPath = {
    goal: "Build a SaaS Application",
    totalWeeks: 4,
    totalHours: 24,
    weeks: [
        {
            id: "week-1",
            weekNumber: 1,
            title: "Frontend Fundamentals",
            topics: [
                "Advanced React Hooks (useState, useEffect, useContext)",
                "Component Architecture & Composition",
                "State Management Basics",
                "API Integration with Axios"
            ],
            whyThisFirst: "Before building complex features, you need to master React's core concepts. This week focuses on the building blocks that every SaaS application requires - proper state management and component design patterns.",
            estimatedHours: 6,
            resources: [
                {
                    id: "res-1",
                    type: "youtube",
                    title: "React Hooks Deep Dive",
                    searchString: "React UseEffect vs UseState practical tutorial 2024",
                    estimatedTime: "45 mins",
                    url: "https://youtube.com/search?q=React+UseEffect+vs+UseState+practical+tutorial"
                },
                {
                    id: "res-2",
                    type: "article",
                    title: "Component Composition Patterns",
                    searchString: "React component composition patterns best practices",
                    estimatedTime: "20 mins",
                    url: "https://google.com/search?q=React+component+composition+patterns"
                },
                {
                    id: "res-3",
                    type: "documentation",
                    title: "Official React Docs - Hooks",
                    estimatedTime: "30 mins",
                    url: "https://react.dev/reference/react"
                }
            ]
        },
        {
            id: "week-2",
            weekNumber: 2,
            title: "Backend Integration & Authentication",
            topics: [
                "RESTful API Design Principles",
                "JWT Authentication Implementation",
                "Protected Routes in React",
                "Error Handling & Loading States"
            ],
            whyThisFirst: "Now that you understand React, it's time to connect to real data. Authentication is the foundation of any SaaS app - you'll learn how to secure your application and manage user sessions properly.",
            estimatedHours: 6,
            resources: [
                {
                    id: "res-4",
                    type: "youtube",
                    title: "JWT Authentication Tutorial",
                    searchString: "React JWT authentication tutorial complete guide",
                    estimatedTime: "60 mins",
                    url: "https://youtube.com/search?q=React+JWT+authentication+tutorial"
                },
                {
                    id: "res-5",
                    type: "article",
                    title: "Protected Routes Pattern",
                    searchString: "React Router protected routes authentication",
                    estimatedTime: "25 mins"
                }
            ]
        },
        {
            id: "week-3",
            weekNumber: 3,
            title: "Database & Data Management",
            topics: [
                "MongoDB/PostgreSQL Basics",
                "CRUD Operations",
                "Data Modeling for SaaS",
                "Real-time Updates with WebSockets"
            ],
            whyThisFirst: "Your SaaS needs to persist data reliably. This week covers database fundamentals and how to structure your data for scalability. Real-time features make your app feel modern and responsive.",
            estimatedHours: 6,
            resources: [
                {
                    id: "res-6",
                    type: "youtube",
                    title: "MongoDB Crash Course",
                    searchString: "MongoDB tutorial for beginners 2024",
                    estimatedTime: "90 mins"
                },
                {
                    id: "res-7",
                    type: "documentation",
                    title: "Mongoose ODM Guide",
                    estimatedTime: "40 mins",
                    url: "https://mongoosejs.com/docs/guide.html"
                }
            ]
        },
        {
            id: "week-4",
            weekNumber: 4,
            title: "Deployment & Production Readiness",
            topics: [
                "Environment Variables & Config",
                "Deployment on Vercel/Netlify",
                "CI/CD Pipeline Basics",
                "Performance Optimization",
                "Error Monitoring"
            ],
            whyThisFirst: "Time to take your SaaS live! Learn deployment best practices, how to handle different environments, and ensure your app performs well at scale. This final week makes your project production-ready.",
            estimatedHours: 6,
            resources: [
                {
                    id: "res-8",
                    type: "youtube",
                    title: "Deploy React App to Vercel",
                    searchString: "Deploy React application Vercel tutorial",
                    estimatedTime: "30 mins"
                },
                {
                    id: "res-9",
                    type: "article",
                    title: "Production Best Practices",
                    searchString: "React production deployment checklist best practices",
                    estimatedTime: "20 mins"
                }
            ]
        }
    ],
    prerequisites: [
        "Basic HTML/CSS knowledge",
        "JavaScript ES6+ fundamentals",
        "Command line basics"
    ],
    outcomes: [
        "Build and deploy a full-stack SaaS application",
        "Understand modern React patterns and best practices",
        "Implement secure authentication and authorization",
        "Work with databases and real-time data",
        "Deploy applications to production"
    ]
};

export const mockQuizData = {
    "week-1": [
        {
            id: "q1",
            question: "What is the primary purpose of useEffect in React?",
            options: [
                "To manage component state",
                "To perform side effects in functional components",
                "To create context providers",
                "To optimize rendering performance"
            ],
            correctAnswer: 1,
            explanation: "useEffect is designed to handle side effects like data fetching, subscriptions, and manual DOM manipulations in functional components."
        },
        {
            id: "q2",
            question: "When does useState trigger a re-render?",
            options: [
                "Every time the setter function is called",
                "Only when the new value is different from the current value",
                "Only on initial mount",
                "When manually triggered"
            ],
            correctAnswer: 1,
            explanation: "React's useState uses Object.is comparison to determine if the state has changed before triggering a re-render."
        },
        {
            id: "q3",
            question: "What is component composition in React?",
            options: [
                "Combining multiple components using props.children",
                "Creating components with classes",
                "Using Redux for state management",
                "Writing inline styles"
            ],
            correctAnswer: 0,
            explanation: "Component composition is the practice of building complex UIs by combining simpler components, often using props.children for flexibility."
        },
        {
            id: "q4",
            question: "How do you prevent unnecessary API calls in useEffect?",
            options: [
                "Use async/await inside useEffect",
                "Add dependencies to the dependency array",
                "Use multiple useEffect hooks",
                "Call the API in useState"
            ],
            correctAnswer: 1,
            explanation: "The dependency array controls when useEffect runs. By specifying dependencies, you prevent unnecessary executions."
        },
        {
            id: "q5",
            question: "What's the best practice for handling loading states in React?",
            options: [
                "Use console.log to track loading",
                "Use a boolean state variable",
                "Disable all buttons",
                "Refresh the page"
            ],
            correctAnswer: 1,
            explanation: "A boolean state variable (e.g., isLoading) is the standard approach to track and display loading states in React applications."
        }
    ]
};

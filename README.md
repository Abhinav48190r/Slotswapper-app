Features
User Authentication
Secure user registration with email validation

JWT-based login system

Password hashing with bcrypt

Protected routes and API endpoints

Event Management
Create, edit, and delete events

Set event details (title, description, start/end time, location)

Mark events as SWAPPABLE, BUSY, or SWAP_PENDING

View all personal events in a clean interface

Slot Swapping System
Request to swap time slots with other users

View incoming and outgoing swap requests

Accept or reject swap requests

Real-time status

.
Project Structure
text
slotswapper-app/
│
├── backend/ # Node.js/Express API
│ ├── models/
│ │ ├── User.js # User schema (username, email, password)
│ │ ├── Event.js # Event schema (title, times, status)
│ │ └── SwapRequest.js # Swap request schema
│ ├── routes/
│ │ ├── auth.js # Authentication routes
│ │ ├── events.js # Event CRUD operations
│ │ └── swapRequests.js # Swap request operations
│ ├── middleware/
│ │ └── auth.js # JWT verification middleware
│ ├── .env.example # Environment variables template
│ ├── server.js # Express server entry point
│ └── package.json
│
├── frontend/ # React Application
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ ├── Auth/
│ │ │ │ ├── Login.js # Login page with form validation
│ │ │ │ ├── Signup.js # Registration page
│ │ │ │ └── Auth.css # Authentication styling
│ │ │ ├── common/
│ │ │ │ ├── Header.js # Navigation header
│ │ │ │ ├── Header.css
│ │ │ │ ├── Footer.js # Page footer
│ │ │ │ ├── LoadingSpinner.js # Loading component
│ │ │ │ └── LoadingSpinner.css
│ │ │ ├── Events/
│ │ │ │ ├── EventsList.js # Event list view
│ │ │ │ ├── EventsList.css
│ │ │ │ ├── EventCard.js # Individual event card
│ │ │ │ ├── EventCard.css
│ │ │ │ ├── EventForm.js # Create/edit event form
│ │ │ │ └── EventForm.css
│ │ │ └── SwapRequests/
│ │ │ └── SwapRequestList.js # Swap request management
│ │ ├── hooks/
│ │ │ └── useAuth.js # Custom authentication hook
│ │ ├── services/
│ │ │ └── api.js # Axios API configuration
│ │ ├── styles/
│ │ │ └── globals.css # Global styles
│ │ ├── App.js # Main app component
│ │ ├── index.js # React entry point
│ │ └── index.css
│ ├── .env.example
│ └── package.json
│
├── .gitignore # Git ignore rules
├── README.md # This file
└── package.json # Root package

Author
Abhinav

GitHub: @Abhinav48190r

Email: dinesh.abhinav2001@gmail.com

Acknowledgments

ServiceHive for the assignment opportunity

React and Node.js communities for excellent documentation

Lucide Icons for beautiful, consistent icons

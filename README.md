# CTRL Chat

CTRL Chat is a modern real-time chat application that enables seamless communication between users. Built with Node.js and Socket.IO, it provides a responsive and intuitive interface for instant messaging.

## Table of Contents

- [CTRL Chat](#ctrl-chat)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Description](#description)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Contact](#contact)
  - [Acknowledgements](#acknowledgements)

## Project Structure

```
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── chatController.js       # Chat functionality
│   └── conversationController.js # Conversation management
├── middlewares/
│   └── authMiddleware.js      # Authentication middleware
├── models/
│   ├── conversations.js       # Conversation data model
│   ├── messages.js           # Message data model
│   └── users.js              # User data model
├── public/
│   ├── css/
│   │   ├── output.css        # Compiled CSS
│   │   └── style.css         # Custom styles
│   └── js/
│       ├── chatScript.js     # Chat functionality
│       ├── signinScript.js   # Sign-in logic
│       └── signupScript.js   # Sign-up logic
├── routes/
│   ├── api/
│   │   ├── authRoute.js      # Authentication routes
│   │   └── conversationRoute.js # Conversation routes
│   └── pages/
│       ├── chatRoute.js      # Chat page routes
│       ├── homeRoute.js      # Home page routes
│       ├── signinRoute.js    # Sign-in page routes
│       └── signupRoute.js    # Sign-up page routes
├── services/
│   └── socketService.js      # Socket.IO service
├── utils/
│   ├── conversationUtils.js  # Conversation helpers
│   └── hash.js              # Password hashing
├── views/
│   ├── components/
│   │   ├── alert.ejs        # Alert component
│   │   ├── footer.ejs       # Footer component
│   │   ├── header.ejs       # Header component
│   │   └── toast.ejs        # Toast notifications
│   ├── chat.ejs             # Chat page template
│   ├── index.ejs            # Home page template
│   ├── signin.ejs           # Sign-in page template
│   └── signup.ejs           # Sign-up page template
├── index.js                 # Application entry point
├── package.json             # Project dependencies
└── README.md               # Project documentation
```

## Description

CTRL Chat is designed to provide a seamless real-time messaging experience. With its modern UI, users can easily connect with others and exchange messages instantly. The application features user authentication, real-time message delivery, and a responsive design that works across all devices.
this is my first project using node.js and socket.io and i hope you like it

## Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure signup and signin system
- **Responsive Design**: Modern UI that adapts to all screen sizes
- **User-Friendly Interface**: Clean and intuitive chat interface
- **Message History**: Persistent storage of chat conversations
- **Coming Soon**:
  - File Sharing
  - Group Chats

## Technologies Used

- **Frontend**:

  - EJS (Embedded JavaScript templates)
  - TailwindCSS
  - Lucide Icons
  - Modern JavaScript (ES6+)

- **Backend**:
  - Node.js
  - Express.js
  - Socket.IO
  - MongoDB (for data persistence)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kareem172/Chat_app.git
   cd ctrl-chat
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   SESSION_SECRET=your session secret
   JWT_SECRET=your jwt secret
   NODE_ENV=development
   DB_CONNECTION_STRING=mongodb+srv://kareem_khalaf:wijP86hAscSIKHyr@chatcluster.9bdfwst.mongodb.net/ChatCluster
   PORT=5000 # Port number
   JWT_EXPIRES_IN= # JWT token expiration
   COOKIE_EXPIRES_IN= Cookie expiration in ms
   ```

4. Start the development server:
   ```bash
   node index.js
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Create a new account or sign in if you already have one
3. Start chatting with other users in real-time
4. Your conversations will be automatically saved

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## Contact

For any questions or suggestions, please feel free to reach out:

- GitHub: [@kareem172](https://github.com/kareem172)
- Email: kareemkhalaf1722@gmail.com

## Acknowledgements

- [Socket.IO](https://socket.io/) for real-time communication
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons

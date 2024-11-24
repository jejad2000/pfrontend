# Front End

## Project Overview

This application allows users to **add** and **update** notes in a WYSIWYG editor that supports rich text formatting, such as **bold**, *italic*, and _underline_. It also includes a **live preview** of the notes and supports **real-time collaboration** where multiple users can edit and update notes simultaneously.

The backend utilizes WebSocket connections for real-time updates, and the front-end features include a rich text editor powered by **ReactQuill** for a smooth and intuitive user experience.

## Tech Stack

- **Frontend**:
  - React.js (with TypeScript)
  - ReactQuill for rich text editing
  - Material UI for components and layout
  - Zustand for state management
  - Tailwind CSS for styling

## Features Implemented

- **WYSIWYG Editor**: A powerful editor for text formatting like bold, italic, and underline.
- **Real-Time Collaboration**: Changes to notes are updated across all connected clients immediately.
- **Live Preview**: Changes in the editor are instantly reflected in a live preview.
- **WebSocket Integration**: Uses **Socket.IO** to enable real-time communication between the server and clients.
- **JWT Authentication**: Secure user login and registration using JSON Web Tokens (JWT).

## Future Improvements
- **Add Delete Notes:**: Allow users to delete their notes, and broadcast this action to all connected users in real time.
- **Logout Functionality**: Implement a logout feature that will invalidate the user's session and clear the stored JWT token.
- **More Polished UI**: Improve the overall user interface with better design, user experience improvements, such as smoother transitions and a more intuitive layout.
- **List of Online Users**: Display a list of online users who are currently connected and collaborating on notes. This will allow users to see who is actively editing or viewing the notes.

## Installation

### Prerequisites

Before starting, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Steps

1. Clone the repository:
```bash
   git https://github.com/jejad2000/pfrontend.git
   cd pfrontend
```
2. Install dependencies for both the front-end and back-end:
```bash
   npm install 
``` 
or
```bash
    yarn add
```
3. Start the frontend application:
```bash
   npm start 
``` 

The front-end will run on http://localhost:3000

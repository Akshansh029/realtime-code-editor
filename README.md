# Collaborative Code Editor

A real-time, collaborative code editor built using React, TailwindCSS, Socket.io, NodeJS/ExpressJS, and CodeMirror (v5). This application allows multiple users to collaborate on code in real-time. Users can join a room by sharing a unique room ID, where their code will be synced across all connected users. It supports multiple programming languages, syntax highlighting, and a variety of themes and font selectors.

![image](https://github.com/user-attachments/assets/cf5b3a85-4830-4570-ab58-02d32afc425f)


## Features

- **Real-time collaboration**: Multiple users can join a room using a unique room ID, and their code will be synced across all participants.
- **Room sharing**: Users can share their room ID with others to invite them for collaboration.
- **Toasts notifications**: Get notified when users enter or leave the room.
- **Syntax highlighting**: Supports popular programming languages such as:
  - JavaScript (JS)
  - Python (Python)
  - PHP (PHP)
  - Go (Go)
  - Markdown (Markdown)
- **Themes and customization**: Dozens of themes and a font selector for a personalized coding experience.
- **CodeMirror integration**: Used for a powerful and customizable code editor interface.
- **Real-time updates**: Code is synced between users in real time via WebSocket connections using Socket.io.

## Technologies Used

- **Frontend**: 
  - React
  - TailwindCSS
  - CodeMirror v5
  - Socket.io-client
- **Backend**: 
  - Node.js
  - Express.js
  - Socket.io

## Installation

To run the application locally, follow the steps below:

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/realtime-code-editor.git
cd realtime-code-editor
```
### 2. Install dependencies
```bash
npm install
```
### 3. Run the backend server
  ```bash
  npm run server:prod
  ```
The backend server will start on http://localhost:5000.
### 4. Run the frontend application
```bash
npm run start
```
The frontend will be available at http://localhost:3000.

### 5. Open in your browser
Visit http://localhost:3000 to open the application in your browser.

## Screenshots
1. Home page
![image](https://github.com/user-attachments/assets/d6a4014e-6260-4ae8-8334-f1c1e6448b7c)
2. Editor page
![image](https://github.com/user-attachments/assets/5368e102-6ffe-4e67-98ac-27a99c8dcf93)
3. Code sync
![image](https://github.com/user-attachments/assets/a21d0949-edfb-4d79-a57a-325a0c9255e6)
4. Notifications
![image](https://github.com/user-attachments/assets/2001cc55-e2bc-40de-97f4-6b2f97060b2f)

## Usage
1. Create or Join a Room:
  - To start, click on "Create Room" or share an existing room ID with others to join the same room.
2. Collaborative Coding:
  - Once you're in the room, the code you write will be synced with all other participants in real-time.
3. Customizing the Editor:
  - Select from dozens of themes and adjust the font settings to match your preferences.
4. Notifications:
  - When someone enters or leaves the room, you will receive a notification through toast messages.
    
## Contributing
Contributions are always welcome! To contribute:

1. Fork the repository
2. Create your feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -am 'Add feature')
4. Push to the branch (git push origin feature-name)
5. Create a new Pull Request

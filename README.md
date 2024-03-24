# Real-Time Chat Application

<img src="https://camo.githubusercontent.com/d668acbf047004e41f1b003580965e2ed1bb450ad66c3a56bdd60c8352792f12/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f65332f31622f37352f65333162373532383735363739623634666365303039393232663966306464612e676966" alt="Real-Time Chat Application" style="width: 300px; height: 200px;">


Welcome to our Real-Time Chat Application! This application allows users to engage in real-time conversations with each other.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
  - [Client Setup](#client-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time messaging
- User authentication
- Search user chat functionality (to be implemented)

## Setup

To set up the client and backend for this application, follow the instructions below:

### Client Setup

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Harshil-sitapara/realtime-chat-app.git
   ```
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a **.env** file in the root of the **client directory** with the following keys:
   ```bash
   BACK_END_URL=http://localhost:5001
   ```
5. Start the development server:
  ```bach
  npm run dev
  ```
6. Access the application at **http://localhost:5173** in your browser.

### Backend Setup
1. Navigate to the client directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a **.env** file in the root of the **server directory** with the following keys:
   ```bash
   MONGO_URL=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=you_api_secret
   PORT=5001
   ```
 5. Start the development server:
   ```bach
   npm run dev
   ```
 
### Contributing
Contributions are welcome! Please open an issue or submit a pull request to suggest improvements or new features.

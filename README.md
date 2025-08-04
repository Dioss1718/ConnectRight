# ConnectRight - Real-time Chat Application




## About The Project

ConnectRight is a sleek, real-time chat application built to facilitate instant communication between users. It features a modern, intuitive user interface and a robust backend for seamless message exchange. Users can join the chat by entering a username and engage in live conversations, with messages appearing instantly for all participants.

### Key Features

* **Real-time Messaging:** Instantly send and receive messages.
* **User Identification:** Messages are tagged with the sender's username.
* **Scrollable Chat History:** Automatically scrolls to the latest message.
* **Responsive Design:** Clean and adaptive interface.
* **Intuitive UI:** Easy to join and participate in conversations.

---

## Technologies Used

This project leverages the following technologies:

**Frontend:**
* **React.js:** A JavaScript library for building user interfaces.
* **Socket.IO Client:** For real-time, bidirectional event-based communication.
* **CSS:** For styling and responsiveness, featuring a custom color palette and a background image.

**Backend:**
* **Node.js:** A JavaScript runtime for server-side development.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **Socket.IO:** For enabling real-time, bidirectional communication between web clients and servers.
* **CORS:** Middleware for enabling Cross-Origin Resource Sharing.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm (Node Package Manager) installed on your system.

* **Node.js & npm**
    ```bash
    node -v
    npm -v
    ```
    If not installed, download from [nodejs.org](https://nodejs.org/).

### Installation

Clone the repository and install dependencies for both the backend and frontend.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git)
    ```
2.  **Navigate to the project root directory**
    ```bash
    cd YOUR_REPO_NAME
    ```

#### Backend Setup

1.  **Navigate to the backend directory** (assuming your backend `index.js` is in a `backend` folder, adjust if different)
    ```bash
    cd backend # Or wherever your backend files are
    ```
2.  **Install backend dependencies**
    ```bash
    npm install
    ```
3.  **Start the backend server**
    The backend will run on `http://localhost:3001`.
    ```bash
    node index.js
    ```
    You should see a message like "Server Running on PORT 3001".

#### Frontend Setup

1.  **Navigate to the frontend directory** (assuming your frontend `App.js`, `index.js`, `index.css` are in a `frontend` folder, adjust if different, e.g., if it's a Create React App structure, you might `cd ..` and then `cd frontend-app`)
    ```bash
    cd ../frontend # Or wherever your frontend files are
    ```
    *If your project root already contains `package.json` for frontend, just `cd YOUR_REPO_NAME` and proceed.*
2.  **Install frontend dependencies**
    ```bash
    npm install
    ```
3.  **Start the frontend development server**
    The frontend will typically run on `http://localhost:3000`.
    ```bash
    npm start
    ```

---

## Usage

1.  **Start both the backend and frontend servers** as described in the [Installation](#installation) section.
2.  Open your web browser and navigate to `http://localhost:3000`.
3.  You will be prompted to **enter a username**. Type your desired username and click "Chat" or press Enter.
4.  Once joined, you can **type messages** in the input field at the bottom and click "Send" or press Enter to send them.
5.  All messages (sent by you and received from others) will appear in the chat window in real-time.




---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---




## Acknowledgments

* [Socket.IO Documentation](https://socket.io/docs/)
* [React Documentation](https://react.dev/docs)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)

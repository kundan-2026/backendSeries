# 🎥 Video Hosting Backend (VideoHub)

This is a **complete backend project** for a video hosting platform, similar to YouTube, built with modern and scalable technologies such as **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **JWT**, **bcrypt**, and more.

## 🚀 Features

- 🔐 User Authentication (Sign Up / Login)
- 🔄 Access Token & Refresh Token flow using **JWT**
- 🔒 Password hashing with **bcrypt**
- 🧾 Watch History
- 📤 Upload Videos
- 📺 Fetch Videos
- 👍 Like / 👎 Dislike a video
- 💬 Commenting system with reply support
- 🔔 Subscribe / Unsubscribe functionality
- 👤 User profile with avatar & cover image
- 🧹 Modular codebase for scalability and maintainability

## 🛠️ Tech Stack

| Technology | Description         |
|------------|---------------------|
| Node.js    | JavaScript runtime  |
| Express.js | Backend framework   |
| MongoDB    | NoSQL database      |
| Mongoose   | ODM for MongoDB     |
| JWT        | Authentication      |
| bcrypt     | Password encryption |
| Cloudinary | Media storage       |

## 📁 Project Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
├── .env
├── server.js / app.js
└── package.json
```

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/kundan-2026/video-hosting-backend.git
cd video-hosting-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

4. **Start the server**
```bash
npm run dev
```

The server will start at `http://localhost:5000`.

## 📡 API Endpoints Overview

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | /api/auth/signup     | Register a new user      |
| POST   | /api/auth/login      | Login and receive tokens |
| POST   | /api/video/upload    | Upload a video           |
| GET    | /api/video/:id       | Get video by ID          |
| POST   | /api/comment         | Add a comment            |
| POST   | /api/like            | Like a video             |
| POST   | /api/dislike         | Dislike a video          |
| POST   | /api/subscribe       | Subscribe to a user      |

## ✨ What You’ll Learn

- Full JWT authentication with access/refresh tokens
- Secure user management with password hashing
- How to structure large Express apps
- Connecting and modeling data with Mongoose
- Working with media uploads and user-generated content
- Building features like like/dislike, comments, subscriptions, and more

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change or add.

## 📄 License

This project is licensed under the MIT License.

## 🙌 Acknowledgements

Thanks to the open-source community and contributors who inspired this project.

## 💡 Project Status

This backend is under active development. More features and improvements coming soon!

## 📬 Contact

For any queries or support, reach out to the maintainer via:

- GitHub: [click here](https://github.com/kundan-2026/)
- LinkedIn: [click here](https://www.linkedin.com/in/kundan2026/)

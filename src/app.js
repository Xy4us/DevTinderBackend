// require("dotenv").config();

// const express = require("express");
// const connectDB = require("./config/database");
// const cookieParser = require("cookie-parser");
// const app = express();
// const cors = require("cors");

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true, // Allow cookies to be sent
//   }),
// );
// //Middleware to parse JSON bodies of incoming requests
// app.use(express.json());
// //Middle ware to parse cookies from incoming requests
// app.use(cookieParser());

// const authRouter = require("./routes/auth");
// const requestRouter = require("./routes/request");
// const profileRouter = require("./routes/profile");
// const userRouter = require("./routes/user");

// app.use("/", authRouter);
// app.use("/", requestRouter);
// app.use("/", profileRouter);
// app.use("/", userRouter);

// connectDB()
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(7777, () => {
//       console.log("Server is running on http://localhost:7777");
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB", err);
//   });

// require("dotenv").config();

// const express = require("express");
// const connectDB = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const app = express();

// // CORS Configuration
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://dev-tinder-front-kohl.vercel.app",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // Explicitly handle preflight requests
// app.options(/.*/, cors(corsOptions));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse cookies
// app.use(cookieParser());

// // Routes
// const authRouter = require("./routes/auth");
// const requestRouter = require("./routes/request");
// const profileRouter = require("./routes/profile");
// const userRouter = require("./routes/user");

// app.use("/", authRouter);
// app.use("/", requestRouter);
// app.use("/", profileRouter);
// app.use("/", userRouter);

// // Connect Database and Start Server
// connectDB()
//   .then(() => {
//     console.log("Connected to MongoDB");

//     const PORT = process.env.PORT || 7777;

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB", err);
//   });

// require("dotenv").config();

// const express = require("express");
// const connectDB = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const app = express();

// // CORS Configuration
// const corsOptions = {
//   origin: ["http://localhost:3000", "https://dev-tinder-front-kohl.vercel.app"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse cookies
// app.use(cookieParser());

// // Routes
// const authRouter = require("./routes/auth");
// const requestRouter = require("./routes/request");
// const profileRouter = require("./routes/profile");
// const userRouter = require("./routes/user");

// app.use("/", authRouter);
// app.use("/", requestRouter);
// app.use("/", profileRouter);
// app.use("/", userRouter);

// // Connect Database and Start Server
// connectDB()
//   .then(() => {
//     console.log("Connected to MongoDB");

//     const PORT = process.env.PORT || 7777;

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB", err);
//   });

// require("dotenv").config();

// const express = require("express");
// const connectDB = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const app = express();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://dev-tinder-front-kohl.vercel.app",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("Incoming Origin:", origin);

//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log("Blocked Origin:", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },

//   credentials: true,

//   methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// // IMPORTANT: This must be before your routes
// app.use(cors(corsOptions));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse cookies
// app.use(cookieParser());

// // Routes
// const authRouter = require("./routes/auth");
// const requestRouter = require("./routes/request");
// const profileRouter = require("./routes/profile");
// const userRouter = require("./routes/user");

// app.use("/", authRouter);
// app.use("/", requestRouter);
// app.use("/", profileRouter);
// app.use("/", userRouter);

// // Connect Database and Start Server
// connectDB()
//   .then(() => {
//     console.log("Connected to MongoDB");

//     const PORT = process.env.PORT || 7777;

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB", err);
//     process.exit(1);
//   });

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ===============================
// CORS CONFIGURATION
// ===============================

const allowedOrigins = [
  "http://localhost:3000",
  "https://dev-tinder-front-kohl.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming Origin:", origin);

    // Allow requests without an Origin (e.g. Postman)
    if (!origin) {
      return callback(null, true);
    }

    // Remove trailing slashes and whitespace
    const normalizedOrigin = origin.trim().replace(/\/+$/, "");

    // Allow only trusted frontend origins
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.log("Blocked Origin:", normalizedOrigin);

    // Do not throw an error that causes a 500 response
    return callback(null, false);
  },

  credentials: true,

  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS before routes
app.use(cors(corsOptions));

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(cookieParser());

// ===============================
// ROUTES
// ===============================

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

// ===============================
// CONNECT DATABASE & START SERVER
// ===============================

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 7777;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

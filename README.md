# 📱 React Native Firebase App

A cross-platform mobile application built with **React Native** and powered by **Firebase** for authentication, database, and cloud services. This project demonstrates scalable mobile architecture, real-time data synchronization, and secure backend integration.

---

## 🚀 Features

* 🔐 Firebase Authentication (Email / Google / Phone)
* ☁️ Cloud Firestore real-time database
* 📦 Firebase Storage for media uploads
* 🔔 Push Notifications with Firebase Cloud Messaging
* 🔄 Real-time data synchronization
* 📱 Cross-platform (Android & iOS)
* 🔒 Secure environment configuration
* ⚡ Fast refresh & optimized performance

---

## 🛠 Tech Stack

| Technology               | Purpose                         |
| ------------------------ | ------------------------------- |
| React Native             | Cross-platform mobile framework |
| Firebase                 | Backend-as-a-Service            |
| Firestore                | NoSQL real-time database        |
| Firebase Auth            | User authentication             |
| Firebase Storage         | File uploads                    |
| Firebase Cloud Messaging | Push notifications              |
| React Navigation         | App navigation                  |
| Axios / Fetch            | API communication               |

---

## 📂 Project Structure

```
project-root
│
├── android/                # Android native files
├── ios/                    # iOS native files
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/            # App screens
│   ├── navigation/         # Navigation configuration
│   ├── services/           # Firebase services
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── assets/             # Images, fonts, icons
│
├── firebase/
│   ├── config.js           # Firebase initialization
│   └── services.js         # Firebase helpers
│
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/react-native-firebase-app.git
cd react-native-firebase-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 🔥 Firebase Setup

1. Go to the Firebase Console
2. Create a new project
3. Register Android and/or iOS app
4. Download configuration files:

### Android

```
google-services.json
```

Place inside:

```
android/app/
```

### iOS

```
GoogleService-Info.plist
```

Place inside:

```
ios/
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

---

## 🔌 Firebase Configuration Example

`firebase/config.js`

```javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
```

---

## ▶️ Running the App

### Start Metro

```bash
npx react-native start
```

### Run Android

```bash
npx react-native run-android
```

### Run iOS

```bash
npx react-native run-ios
```

---

## 🔐 Firebase Authentication Example

```javascript
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const loginUser = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.error(error.message);
  }
};
```

---

## ☁️ Firestore Example

```javascript
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

await addDoc(collection(db, "users"), {
  name: "John Doe",
  email: "john@example.com",
});
```

---

## 📸 Screenshots

| Home Screen          | Login Screen         |
| -------------------- | -------------------- |
| Add screenshots here | Add screenshots here |

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

---

## 🚀 Deployment

### Android Build

```bash
cd android
./gradlew assembleRelease
```

### iOS Build

Use **Xcode** to archive and distribute the app.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 🐛 Issues

If you encounter a bug or want to request a featu

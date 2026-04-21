# 🚀 ImmunoBridge

Offline-first vaccination record system for migrant children with QR-based identity and smart search.

---

## 📌 Features

* ✅ Unique Child Identifier (UCI)
* ✅ QR Code generation & scanning
* ✅ Smart search (name, guardian, phone, DOB, location)
* ✅ Deduplication system

---

## 🛠️ Tech Stack

* Frontend: React
* Backend: Node.js + Express
* Database: MongoDB

---

## ⚙️ Installation & Setup Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/immunobridge.git
cd immunobridge
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file inside **backend/**:

```env
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
npm start
```

👉 Runs on: `http://localhost:5000`

---

### 3️⃣ Setup Frontend

Open new terminal:

```bash
cd frontend
npm install
npm start
```

👉 Runs on: `http://localhost:3000`

---

## 🔗 API Endpoints

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/child/register | Register child   |
| GET    | /api/child/:uci     | Get child by UCI |
| GET    | /api/child/qr/:uci  | Generate QR      |
| POST   | /api/child/search   | Smart search     |
| GET    | /api/child/all      | Get all children |

---

## 📸 How to Use

1. Register a child
2. Get UCI + QR code
3. Scan QR to fetch details
4. Use search if QR is lost
5. Admin can view all records

---

## ⚠️ Important Notes

* Do NOT upload `.env` file
* MongoDB must be running or Atlas connected
* Allow network access (0.0.0.0/0) in MongoDB Atlas

---

## 👨‍💻 Author

Vaibhav Rajput

---

## ⭐ Future Improvements

* Vaccination tracking system
* SMS/WhatsApp notifications
* Offline sync support
* Advanced admin analytics
* Admin dashboard

---

💡 Built for real-world impact in healthcare accessibility.



##  `README.md` 

````markdown
# 🚀 Product API – Express.js CRUD Assignment (Week 2)

This is a simple **RESTful API** built with **Express.js** for managing products.  
It supports **CRUD operations**, **middleware**, **API key authentication**, and **error handling**.

---

##  Setup

### 1 Clone the Repo
```bash
git clone <your-assignment-repo-url>
cd <your-folder>
````

### 2 Install Dependencies

```bash
npm install
```

### 3 Environment Variables

Create a `.env` file in the root folder:

```env
PORT=3000
API_KEY=mysecretkey
```

(Use `.env.example` as reference.)

### 4 Start the Server

```bash
node server.js
```

Server runs at  **[http://localhost:3000](http://localhost:3000)**

---

##  API Endpoints

| Method | Endpoint              | Description                                                       | Auth Required |
| ------ | --------------------- | ----------------------------------------------------------------- | ------------- |
| GET    | `/`                   | Welcome message                                                   | ❌             |
| GET    | `/api/products`       | Get all products (supports `category`, `search`, `page`, `limit`) | ❌             |
| GET    | `/api/products/:id`   | Get a single product by ID                                        | ❌             |
| POST   | `/api/products`       | Create a new product                                              | ✅             |
| PUT    | `/api/products/:id`   | Update a product by ID                                            | ✅             |
| DELETE | `/api/products/:id`   | Delete a product by ID                                            | ✅             |
| GET    | `/api/products-stats` | Get product statistics by category                                | ❌             |

**Auth Header:**

```
x-api-key: mysecretkey
```

---

## ⚙️ Middleware Used

* Logger (request details)
* Authentication (via API key)
* Validation (checks product data)
* Global error handler

---

## 📂 Project Structure

```
📦 plp-express-api
 ┣ 📄 server.js
 ┣ 📄 .env.example
 ┣ 📄 README.md
 ┣ 📄 package.json
 ┗ 📁 node_modules/
```

---

## 🧑‍💻 Author

Developed by **[Tracy Renee]**
Power Learn Project – Week 2 Assignment



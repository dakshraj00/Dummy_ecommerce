# 🛒 — AI-Powered Order Management System

An intelligent full-stack e-commerce operations dashboard. Manage orders, automatically detect incidents, and chat with an AI assistant that knows your store data — all in one place.

---

## 🖼️ Preview

> Frontend runs at `http://localhost` · Backend API at `http://localhost:8000`

---

## ✨ Features

- **Order Management** — Create, update status, and delete orders in real time
- **Incident Detection** — Automatically flags suspicious or anomalous orders with severity levels (critical / high / medium / low)
- **AI Chatbot** — LangChain-powered agent that answers questions about your orders and incidents
- **Clean Dashboard** — Dark-themed React UI built with Tailwind CSS
- **Fully Containerized** — One command to run everything with Docker

---

## 🔧 Tech Stack

### Backend
| Tool | Purpose |
|---|---|
| FastAPI | REST API framework |
| SQLAlchemy | ORM / database layer |
| SQLite | Database |
| LangChain + LangGraph | AI agent with tools |
| Uvicorn | ASGI server |
| Pydantic | Data validation |

### Frontend
| Tool | Purpose |
|---|---|
| React + Vite | UI framework |
| Tailwind CSS | Styling |
| Nginx | Serves built app in Docker |

### DevOps
| Tool | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |

---

## 📁 Project Structure

```
maze_ke_liye/
├── docker-compose.yml
├── .gitignore
│
├── nerf_ecom/                  ← FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env                    ← not committed (see Environment Variables)
│   ├── Database/
│   │   ├── database.py
│   │   ├── models.py
│   │   └── Schemas.py
│   ├── routers/
│   │   ├── orders.py
│   │   └── ai_router.py
│   ├── detectors/
│   │   ├── detector.py
│   │   ├── analyzer.py
│   │   └── detecetor_router.py
│   └── ai_chatbot/
│       ├── ai_agent.py
│       └── tools.py
│
└── frontend/                   ← React frontend
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── App.jsx
        ├── ui/
        ├── orders/
        ├── incidents/
        ├── chat/
        ├── hooks/
        └── utils/
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/) installed

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/maze_ke_liye.git
cd maze_ke_liye
```

### 2. Set up environment variables

Create a `.env` file inside `nerf_ecom/`:

```bash
cp nerf_ecom/.env.example nerf_ecom/.env
```

Then fill in your values:

```env
DATABASE_URL=sqlite:///./data/maze.db
OPENAI_API_KEY=your_openai_key_here
```

### 3. Run with Docker

```bash
docker-compose up --build
```

First build takes 3–5 minutes. After that:

| Service | URL |
|---|---|
| 🌐 Frontend | http://localhost |
| ⚡ Backend | http://localhost:8000 |
| 📖 API Docs | http://localhost:8000/docs |

---

## 💻 Local Development (without Docker)

### Backend
```bash
cd nerf_ecom
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend

# Create .env for local dev
echo "VITE_API_URL=http://127.0.0.1:8000" > .env

npm install
npm run dev
```

---

## 📡 API Endpoints

### Orders
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/orders` | Get all orders |
| `POST` | `/orders` | Create a new order |
| `GET` | `/orders/{id}` | Get order by ID |
| `PUT` | `/orders/{id}` | Update order status |
| `DELETE` | `/orders/{id}` | Delete an order |

### Incidents
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/incidents` | Get all incidents |
| `GET` | `/incident/{order_id}` | Detect incident for an order |

### AI
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ai/query` | Send a question to the AI agent |

---

## 🐳 Docker Commands

```bash
# Start everything
docker-compose up --build

# Run in background
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Stop and wipe database volume
docker-compose down -v
```

---

## 🔐 Environment Variables

Create `nerf_ecom/.env` — never commit this file:

```env
DATABASE_URL=sqlite:///./data/maze.db
OPENAI_API_KEY=sk-...
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch — `git checkout -b feature/my-feature`
3. Commit changes — `git commit -m "add my feature"`
4. Push — `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use this project however you like.

---

Built with ❤️ by [Raj](https://github.com/yourusername)

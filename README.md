# E-Commerce Application with AI Chatbot

A premium ecommerce platform with an intelligent AI chatbot powered by OpenAI, built with React, Node.js, and MySQL.

## Features

### E-Commerce
- 🛍️ Product Catalog with Advanced Filtering
- 🛒 Shopping Cart Management
- 💳 Secure Checkout & Payment Integration
- 👤 User Authentication & Profiles
- 📦 Order Management & Tracking
- ⭐ Product Reviews & Ratings
- 📊 Admin Dashboard

### AI Chatbot
- 🤖 OpenAI-Powered Conversations
- 🛍️ Smart Product Recommendations
- 📋 Order Status Tracking
- 💬 Customer Support
- 🎯 Personalized Suggestions
- 📚 Product Information Queries

## Tech Stack

**Frontend:**
- React 18+
- Redux Toolkit (State Management)
- Tailwind CSS (Styling)
- Axios (HTTP Client)
- Socket.io (Real-time Chat)

**Backend:**
- Node.js & Express
- OpenAI API Integration
- JWT Authentication
- RESTful APIs
- Socket.io Server

**Database:**
- MySQL 8.0+
- Sequelize ORM

## Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL (v8.0+)
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dilipkumars067/E-Commerce-Application-with-AI-chat-bot.git
   cd E-Commerce-Application-with-AI-chat-bot
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp ../.env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

4. **Database Setup**
   - MySQL Username: `root`
   - MySQL Password: `root`
   - Database: `ecommerce_db`

## Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=ecommerce_db
DB_PORT=3306
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
FRONTEND_URL=http://localhost:3000
```

## Project Structure

```
├── backend/
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   ├── config/           # Configuration files
│   └── server.js         # Express server
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # React entry point
│   └── public/           # Static files
├── database/
│   └── schema.sql        # MySQL database schema
└── .env.example          # Environment variables template
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order

### Chatbot
- `POST /api/chatbot/message` - Send message to chatbot
- `GET /api/chatbot/history/:sessionId` - Get chat history

## Features Details

### Smart Product Search
The AI chatbot understands natural language and helps customers find products:
- "Show me blue t-shirts for men"
- "What's your most affordable dress?"
- "I'm looking for formal wear"

### Order Tracking
Real-time order status updates through the chatbot:
- "Where's my order?"
- "Track order #12345"
- "When will my package arrive?"

### Personalized Recommendations
AI suggests products based on customer preferences and browsing history.

### Customer Support
24/7 AI-powered customer support for common inquiries and issues.

## Running Tests

### Create Test Account
1. Visit `http://localhost:3000/register`
2. Create account with credentials
3. Login and explore products

### Test Chatbot
Click the chat icon and try:
- "Show me men's clothing"
- "What dresses do you have?"
- "Help me find a shirt"

## Database Schema

The application uses the following main tables:
- **users** - User accounts and profiles
- **products** - Product catalog
- **categories** - Product categories
- **cart** - Shopping cart items
- **orders** - Customer orders
- **orderItems** - Items in each order
- **reviews** - Product reviews
- **chatHistories** - Chat conversation history

## Security Features

- JWT Token-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization
- Secure HTTP headers with Helmet.js

## Performance Optimizations

- Database indexing for frequently queried fields
- Redis caching (optional)
- Pagination for product listings
- Lazy loading of images
- Code splitting in React

## Deployment

### Backend Deployment
1. Set environment variables on server
2. Install dependencies: `npm install`
3. Start server: `npm start` or use PM2
4. Configure MySQL on production server

### Frontend Deployment
1. Build: `npm run build`
2. Deploy `dist/` folder to hosting service
3. Configure API URL for production

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions:
- Create an issue in GitHub
- Contact: support@fashionhub.com
- Documentation: See SETUP.md for detailed setup guide

## Changelog

### Version 1.0.0
- Initial release
- Complete ecommerce platform
- AI chatbot integration
- User authentication
- Order management
- Product catalog with filtering

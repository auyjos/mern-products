# 🛒 MERN Products Store

A full-stack web application for managing products built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to create, read, update, and delete products with a modern, responsive UI built using Chakra UI.

## 🚀 Features

- **Product Management**: Create, view, update, and delete products
- **Responsive Design**: Modern UI built with Chakra UI and responsive design
- **Dark/Light Mode**: Toggle between dark and light themes
- **Real-time Updates**: State management with Zustand for optimal performance
- **Pagination**: Browse products with pagination controls
- **Form Validation**: Client-side validation for product forms
- **Image Support**: Add product images via URL
- **RESTful API**: Clean backend API with proper HTTP status codes
- **Testing**: Comprehensive backend testing with Vitest
- **Production Ready**: Configured for production deployment

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Chakra UI** - Modern component library
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Framer Motion** - Animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development & Testing
- **Vitest** - Testing framework
- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **Cross-env** - Cross-platform environment variables

## 📦 Project Structure

```
mern-products/
├── backend/                 # Backend application
│   ├── __tests___/         # Backend tests
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.js           # Express server entry point
├── frontend/               # Frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state management
│   │   └── assets/         # Images and other assets
│   └── package.json
├── generate_products.py    # Python script for generating sample data
├── newegg_hardware.csv     # Sample product data
└── package.json           # Root package.json with scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Python 3 (optional, for data generation script)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-products
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/mern-products
   # Or for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-products
   
   NODE_ENV=development
   PORT=3000
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (runs on port 3000)
   npm run dev
   
   # In a new terminal, start frontend (runs on port 5173)
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

## 📱 Usage

### Creating Products
1. Navigate to the "Create Product" page using the "+" button in the navbar
2. Fill in the product details:
   - **Name**: Product name (required)
   - **Price**: Product price in numbers (required)
   - **Image**: Product image URL (required)
3. Click "Add Product" to save

### Managing Products
- **View Products**: All products are displayed on the home page with pagination
- **Edit Product**: Click the edit icon on any product card to modify details
- **Delete Product**: Click the delete icon to remove a product
- **Pagination**: Navigate through products using the pagination controls

### Theme Toggle
- Use the sun/moon icon in the navbar to switch between light and dark themes

## 🧪 Testing

The project includes comprehensive backend testing using Vitest:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test -- --coverage

# Run tests in watch mode
npm run test -- --watch
```

### Test Coverage
- **Product Creation**: Tests for valid and invalid product data
- **Product Retrieval**: Tests for fetching all products
- **Product Updates**: Tests for updating existing products
- **Product Deletion**: Tests for removing products
- **Error Handling**: Tests for various error scenarios

## 🌐 API Endpoints

### Products
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create a new product
- `PUT /api/product/:id` - Update a product by ID
- `DELETE /api/product/:id` - Delete a product by ID

### API Response Format
```json
{
  "success": true,
  "message": "Success message",
  "data": { /* product data */ }
}
```

## 🔧 Configuration

### Frontend Configuration (Vite)
- **Proxy**: API calls are proxied to `http://localhost:3000` in development
- **Build**: Optimized production build with Vite

### Backend Configuration
- **CORS**: Configured for cross-origin requests
- **JSON Parsing**: Built-in JSON body parser
- **Static Files**: Serves frontend build in production
- **Environment Variables**: Configurable via `.env` file

## 🚀 Production Deployment

### Build for Production
```bash
# Build the entire application
npm run build
```

### Start Production Server
```bash
# Start production server
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
PORT=3000
```

## 📊 Sample Data Generation

The project includes a Python script for generating sample product data from Newegg:

```bash
# Run the data generation script
python generate_products.py
```

This creates a `newegg_hardware.csv` file with sample product data that can be imported into your MongoDB database.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**José Auyón**

## 🔄 State Management

The application uses Zustand for state management with the following store structure:

```javascript
{
  products: [],           // Array of all products
  setProducts: fn,        // Set products array
  createProduct: fn,      // Create new product
  fetchProducts: fn,      // Fetch all products from API
  deleteProduct: fn,      // Delete product by ID
  updateProduct: fn       // Update existing product
}
```

## 🎨 UI Components

The application uses Chakra UI components for a consistent and modern design:

- **Layout**: Container, VStack, HStack, SimpleGrid
- **Navigation**: Responsive navbar with routing
- **Forms**: Input validation and error handling
- **Feedback**: Toast notifications for user actions
- **Theming**: Built-in dark/light mode support
- **Icons**: Chakra UI icons and React Icons

## 🔍 Key Features Explained

### Pagination
- Products are displayed 9 per page
- Dynamic pagination controls based on total products
- Smooth navigation between pages

### Form Validation
- Client-side validation for all product fields
- Real-time error feedback
- Prevention of multiple spaces in product names

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Adaptive navigation for different screen sizes

### Error Handling
- Comprehensive error handling on both frontend and backend
- User-friendly error messages
- Proper HTTP status codes

---

For more information or support, please open an issue in the repository.

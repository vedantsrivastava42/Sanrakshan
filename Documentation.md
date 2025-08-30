
# Sanrakshan - Fire Safety NOC Management System

## 🔥 Project Overview

**Sanrakshan** is a comprehensive fire safety management platform that streamlines the No Objection Certificate (NOC) application process for building fire safety clearances. The system facilitates digital document submission, multi-stage approval workflows, real-time tracking, and administrative oversight.

---

## 🏗️ Architecture Overview

### Technology Stack

**Frontend:**
- **React 18.3.1** - Component-based UI framework
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Bootstrap 5.3.3** - UI component library
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client for API calls

**Backend:**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time bidirectional communication
- **Cloudinary** - Cloud image/document storage
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
Sanrakshan/
├── BackEnd/
│   ├── Config/           # Configuration files
│   ├── Controllers/      # Business logic handlers
│   ├── Middleware/       # Authentication & authorization
│   ├── Models/          # Database schemas
│   ├── Routes/          # API endpoint definitions
│   ├── uploads/         # Local file storage (backup)
│   └── server.js        # Express server entry point
├── FrontEnd/
│   ├── src/
│   │   ├── Components/  # Reusable UI components
│   │   ├── Pages/       # Route-specific pages
│   │   ├── Context/     # Global state management
│   │   ├── utils/       # Helper functions & API calls
│   │   └── assets/      # Static files
│   └── public/          # Static assets
└── Admin/               # Admin dashboard (separate build)
```

---

## 🚀 Key Features

### 1. **User Management**
- Role-based authentication (User, Admin, Super Admin)
- JWT token-based authorization
- Protected routes and components
- Local storage persistence

### 2. **NOC Application System**
- Digital form submission with file uploads
- Multi-format document support (PDF, images)
- Cloud storage integration with Cloudinary
- Reference ID generation for tracking

### 3. **Multi-Stage Approval Workflow**
- Configurable approval stages
- Role-based decision making
- Progress percentage calculation
- Status tracking with timestamps

### 4. **Real-Time Updates**
- Socket.IO integration for live notifications
- Real-time progress updates
- Instant status changes across clients

### 5. **Document Management**
- Cloudinary integration for file storage
- Multer middleware for file handling
- Support for multiple file formats
- Secure file access with proper validation

---

## 🔄 Data Flow Architecture

### Request Lifecycle (Node.js vs Rails Comparison)

**Rails Flow:**
```
Client → routes.rb → Controller#action → Model → Database → View → Response
```

**Node.js/Express Flow:**
```
Client → Route Handler → Middleware → Controller Function → Model Method → MongoDB → Response
```

### Detailed Backend Flow

1. **Entry Point (`server.js`)**
   - Express app initialization
   - MongoDB connection
   - Socket.IO setup
   - Middleware configuration
   - Route mounting

2. **Routes (`Routes/`)**
   - `approvalRoutes.js` - NOC application endpoints
   - `ListRoute.js` - User management endpoints
   - Express router mapping to controller functions

3. **Middleware (`Middleware/`)**
   - `auth.js` - JWT token validation
   - `roleAuth.js` - Role-based access control
   - CORS configuration
   - File upload handling

4. **Controllers (`Controllers/`)**
   - `approvalController.js` - NOC business logic
   - `Controller.js` - User management logic
   - Request validation and processing
   - Model interaction and response handling

5. **Models (`Models/`)**
   - `Approval.js` - NOC application schema
   - `ListItems.js` - User/list data schema
   - Mongoose ODM with validation
   - Pre-save hooks for timestamps

6. **Configuration (`Config/`)**
   - `db.js` - MongoDB connection
   - `cloudinary.js` - Cloud storage setup
   - `cloudinary-storage.js` - Multer storage engine
   - `file-upload.js` - Upload middleware

---

## 📊 Database Schema

### Approval Model
```javascript
{
  referenceId: String (unique),
  userId: String,
  document: String (Cloudinary URL),
  stages: [
    {
      role: String,
      status: String,
      decision: String,
      time: String,
      date: String,
      percentage: Number
    }
  ],
  progressPercentage: Number,
  finalStatus: String
}
```

---

## 🔐 Authentication & Authorization

### JWT Implementation
- Token generation on login
- Middleware validation on protected routes
- Role-based access control
- Token storage in localStorage (frontend)

### Security Features
- Password hashing with bcryptjs
- CORS protection
- Environment variable management
- File upload validation

---

## 🌐 Frontend Architecture

### Component Structure
```
Components/
├── Card/              # Display components
├── Dashboard/         # User dashboards
├── Form/             # Input forms
├── Header/Footer/    # Layout components
├── LoginPopup/       # Authentication UI
├── NavBar/           # Navigation
└── ProtectedRoute/   # Route guards
```

### State Management
- **Context API** for global state
- **AuthContext** for user authentication
- **Local state** for component-specific data
- **Props drilling** for component communication

### Routing Structure
```javascript
/ (Home)
├── /dashboard (User Dashboard)
├── /applynoc (NOC Application)
├── /trackProgress (Status Tracking)
└── /complaint (Complaint System)
```

---

## 🔄 Real-Time Features

### Socket.IO Implementation
- **Server-side:** Express HTTP server with Socket.IO
- **Client-side:** React hooks for socket connection
- **Use cases:** Live status updates, notifications
- **Events:** Connection handling, status broadcasts

---

## 📡 API Endpoints

### Approval Routes (`/api/approvals`)
- `POST /` - Create new approval
- `GET /:referenceId` - Get approval by reference
- `PATCH /:referenceId/status` - Update approval status
- `GET /user/:userId` - Get user's approvals

### User Routes (`/api/users`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /profile` - Get user profile
- `PATCH /profile` - Update user profile

---

## 🔧 Development Setup

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Cloudinary account
- Git

### Environment Variables
```bash
# Backend (.env)
PORT=4000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Installation & Setup
```bash
# Clone repository
git clone <repository-url>
cd Sanrakshan

# Backend setup
cd BackEnd
npm install
npm run server

# Frontend setup (new terminal)
cd FrontEnd
npm install
npm run dev

# Admin setup (new terminal)
cd Admin
npm install
npm run dev
```

---

## 🚀 Deployment Considerations

### Production Setup
- **Backend:** Node.js hosting (Heroku, Railway, Render)
- **Frontend:** Static hosting (Netlify, Vercel)
- **Database:** MongoDB Atlas
- **File Storage:** Cloudinary
- **Environment:** Production environment variables

### Performance Optimizations
- Image optimization with Cloudinary
- Code splitting with Vite
- Lazy loading for components
- MongoDB indexing for queries
- Caching strategies

---

## 🧪 Testing Strategy

### Potential Testing Approaches
- **Unit Tests:** Jest for utility functions
- **Integration Tests:** Supertest for API endpoints
- **Frontend Tests:** React Testing Library
- **E2E Tests:** Cypress or Playwright

---

## 📈 Scalability Features

### Current Architecture Benefits
- **Microservices Ready:** Separate frontend/backend
- **Database Scaling:** MongoDB horizontal scaling
- **File Storage:** Cloud-based (Cloudinary)
- **Real-time:** Socket.IO cluster support
- **State Management:** Context API for complex state

### Future Enhancements
- Redis for session management
- Message queues for background processing
- CDN for static assets
- Database sharding strategies
- Load balancing for multiple instances

---

## 🔍 Common Interview Questions & Answers

### Q: How does your authentication work?
**A:** JWT-based authentication with role-based access control. Tokens generated on login, validated via middleware on protected routes, stored in localStorage on frontend.

### Q: How do you handle file uploads?
**A:** Multer middleware processes uploads, Cloudinary storage engine directly uploads to cloud, no local storage bottleneck.

### Q: What's your database schema design?
**A:** MongoDB with Mongoose ODM, embedded documents for approval stages, pre-save hooks for timestamps, unique reference IDs for tracking.

### Q: How do you implement real-time features?
**A:** Socket.IO for bidirectional communication, HTTP server integration with Express, event-driven updates across connected clients.

### Q: How is your project structured compared to Rails?
**A:** Similar MVC pattern but more flexible - Express routes map to controller functions, Mongoose models handle data layer, middleware for cross-cutting concerns.

### Q: What's your error handling strategy?
**A:** Centralized error handling middleware, custom HttpError class, proper HTTP status codes, frontend error boundaries.

### Q: How would you scale this application?
**A:** Horizontal database scaling, microservices separation, Redis caching, message queues, CDN implementation, load balancing.

### Q: Explain your state management strategy in React.
**A:** Using React Context API for global state (AuthContext for user authentication), local useState for component-specific state, and props for parent-child communication. Context provides user data and auth status across the app without prop drilling.

### Q: How do you handle CORS in your application?
**A:** CORS middleware configured in Express server with specific origins, headers (Authorization, Content-Type), and methods (GET, POST, PATCH, DELETE). Additional manual headers set for cross-origin requests.

### Q: What security measures have you implemented?
**A:** 
- JWT tokens with expiration
- Password hashing with bcryptjs
- Input validation and sanitization
- File upload restrictions (format validation)
- Environment variables for sensitive data
- CORS protection
- Protected routes with authentication middleware

### Q: How do you manage environment variables and configuration?
**A:** Using dotenv package to load environment variables from .env file. Separate configs for development/production. Variables include MongoDB URI, JWT secrets, Cloudinary credentials, and port configuration.

### Q: Explain your component architecture in React.
**A:** 
- **Atomic Design:** Small reusable components (Card, Button)
- **Page Components:** Route-specific pages (Home, Dashboard)
- **Layout Components:** Header, Footer, NavBar
- **Context Providers:** Wrap app for global state
- **Protected Routes:** Authentication-based route guards

### Q: How do you handle form validation?
**A:** Client-side validation using React state and conditional rendering for error messages. Server-side validation using express-validator middleware. File upload validation for type and size restrictions.

### Q: What's your database indexing strategy?
**A:** MongoDB indexes on frequently queried fields like referenceId (unique), userId for faster lookups. Compound indexes for complex queries. Mongoose schema-level indexes for performance optimization.

### Q: How do you handle errors and logging?
**A:** 
- **Backend:** Centralized error middleware, custom HttpError class, console logging
- **Frontend:** Error boundaries for React components, try-catch for async operations
- **Network:** Axios interceptors for API error handling

### Q: Explain your file upload architecture.
**A:** 
1. Frontend: File input with validation
2. Multer middleware: Processes multipart/form-data
3. Cloudinary Storage: Direct upload to cloud
4. Database: Store Cloudinary URLs
5. No local file storage to avoid server bloat

### Q: How do you implement role-based access control?
**A:** JWT payload contains user role, middleware checks role permissions before route access. Frontend components conditionally render based on user role. Different dashboards for different user types.

### Q: What testing strategies would you implement?
**A:** 
- **Unit Tests:** Jest for utility functions and components
- **Integration Tests:** Supertest for API endpoints
- **E2E Tests:** Cypress for user workflows
- **Component Tests:** React Testing Library
- **API Tests:** Postman collections for manual testing

### Q: How do you optimize application performance?
**A:** 
- **Frontend:** Code splitting with Vite, lazy loading components, image optimization
- **Backend:** MongoDB indexes, connection pooling, efficient queries
- **Network:** Cloudinary CDN for images, compression middleware
- **Caching:** Potential Redis implementation for session data

### Q: Describe your deployment strategy.
**A:** 
- **Backend:** Node.js hosting (Railway/Render) with environment variables
- **Frontend:** Static hosting (Vercel/Netlify) with build optimization
- **Database:** MongoDB Atlas for managed database
- **File Storage:** Cloudinary for global CDN

### Q: How do you handle database relationships in MongoDB?
**A:** Using embedded documents for approval stages (one-to-many), references for user relationships. Mongoose populate for joining data. Designed schema to minimize queries while maintaining data integrity.

### Q: What would you add to make this production-ready?
**A:** 
- **Monitoring:** Application performance monitoring (APM)
- **Logging:** Structured logging with Winston
- **Security:** Rate limiting, input sanitization, security headers
- **Testing:** Comprehensive test coverage
- **CI/CD:** Automated deployment pipeline
- **Backup:** Database backup strategies

### Q: How do you handle concurrent users and race conditions?
**A:** MongoDB atomic operations for updates, optimistic locking for critical operations, Socket.IO for real-time synchronization, proper transaction handling for multi-document updates.

### Q: Explain your API design principles.
**A:** RESTful endpoints with proper HTTP methods, consistent naming conventions, standardized response formats, proper status codes, versioning strategy (/api/v1/), comprehensive error responses.

### Q: How would you implement caching in this application?
**A:** 
- **Client-side:** Browser caching for static assets, localStorage for user preferences
- **Server-side:** Redis for session data, database query caching
- **CDN:** Cloudinary for image caching
- **Application-level:** In-memory caching for frequently accessed data

### Q: What monitoring and analytics would you add?
**A:** 
- **Performance:** Response time tracking, database query performance
- **User Analytics:** Application usage patterns, feature adoption
- **Error Tracking:** Sentry for error monitoring and alerting
- **Infrastructure:** Server resource monitoring, uptime tracking

### Q: How do you ensure data consistency across the application?
**A:** Mongoose schema validation, pre-save hooks for data transformation, atomic operations for critical updates, proper error handling to prevent partial updates, transaction support for multi-collection operations.

---

## 📝 Technical Highlights

- **Full-stack JavaScript** ecosystem
- **Modern React** with hooks and context
- **RESTful API** design patterns
- **Real-time communication** implementation
- **Cloud-native** file storage
- **Security best practices** implementation
- **Responsive design** with Bootstrap
- **Component-based architecture**

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Developer

**Your Name** - Full Stack Developer  
Specialized in MERN stack development with experience in Ruby on Rails

---

*This README covers the complete technical architecture and implementation details needed for comprehensive project discussions in interviews.*

### For Applicants:
- Register and log in to submit a Fire NOC application.
- Upload necessary documents and track application progress in real-time.
- Receive notifications and alerts for any required actions.

### For Fire Department Officials:
- Log in to access assigned applications.
- Review documents, conduct inspections, and issue approvals or rejections.
- Communicate with applicants through the platform.

### For Inspectors:
- Log in to view inspection schedules.
- Access application details and submit inspection reports.
- Track inspection history and compliance status.

## Contribution

We welcome contributions to enhance the functionality of this project. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Future Plans

- **IoT Device Integration:** Implement IoT devices for real-time fire safety monitoring.
- **Mobile App Development:** Extend the platform to mobile devices for easier access.
- **Advanced AI Features:** Enhance AI capabilities for more detailed risk assessments and predictions.

## Contact

For any queries or support, please contact the project team at [This Email](mailto:ayushtomarrudra@gmail.com).

---
 # Work Flow
![Functions](./readmeimage.jpg)
 # Procedure
![Procedure](./procedure.pdf)
 # Website Outlay
![Outlay](./OutLay.pdf)
 # UserPanel
![UserPanel](./UserPanel.pdf)
 # IoT
![IoT](./IoT.pdf)

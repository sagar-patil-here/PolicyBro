
# MongoDB Atlas Integration

This folder contains model definitions for the MongoDB Atlas database integration.

## Connection String

```
mongodb+srv://sagarpatil22112004:<db_password>@policypro.r9vaghj.mongodb.net/?retryWrites=true&w=majority&appName=policypro
```

## Models

- User - Authentication and user management
- UserProfile - Extended user information for personalization
- Insurance - Insurance products and policies
- Recommendations - AI-generated insurance recommendations

## Implementation Plan

1. Set up Express.js backend
2. Connect to MongoDB Atlas using the provided connection string
3. Implement authentication endpoints (register, login, logout)
4. Implement user profile management
5. Integrate Gemini API for insurance recommendations

## Security Note

- The actual database password should be stored in environment variables
- JWT tokens will be used for authentication
- Password hashing will be implemented using bcrypt

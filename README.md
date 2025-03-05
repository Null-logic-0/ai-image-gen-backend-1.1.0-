AI Image Generator - Backend
A backend service that enables AI-powered image generation, user authentication, and image storage. Built using Node.js, Express.js, and Supabase.

📌 Features
    
    ✅ AI Image Generation – Generate images based on user prompts
    ✅ User Authentication – Secure login and authentication using JWT TOKEN
    ✅ Image Storage – Save and retrieve images from AWS bucket Storage
    ✅ REST API – Well-documented API endpoints for frontend integration

🛠 Tech Stack
    
    Backend: Node.js, Express.js
    Database: Mongo.DB & Mongoose
    Authentication: JWT token stored in cookies
    Storage: AWS storage
    AI API: Replicate API

🚀 Installation & Setup

1️⃣ Clone the Repository

    git clone https://github.com/Null-logic-0/ai-image-gen-backend-1.1.0.git
    cd ai-image-gen-backend-1.1.0

2️⃣ Install Dependencies

    npm install
3️⃣ Setup Environment Variables
Create a .env file in the root directory and add:

 
    DATABASE=your_mongo_URI
    DATABASE_PASSWORD=your_password
    
    JWT_SECRET=secret
    JWT_EXPIRES_IN=30d
    JWT_COOKIE_EXPIRES_IN=30
    
    
    AWS_ACCESS_KEY_ID=your_AWS_access_key_id
    AWS_SECRET_ACCESS_KEY=your_AWS_secret_access_key_id
    AWS_REGION=your_AWS_secret_access_key_id
    AWS_BUCKET_NAME=your_AWS_bucket_name
    
    REPLICATE_API_TOKEN=your_replicate-ai-token


4️⃣ Run the Server

    npm start



    

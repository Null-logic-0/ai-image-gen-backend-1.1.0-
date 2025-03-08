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



![Screenshot 2025-03-07 at 14 48 06](https://github.com/user-attachments/assets/3c05668e-cfbf-415e-a5c9-6aff19e5e0ce)
![Screenshot 2025-03-07 at 14 48 57](https://github.com/user-attachments/assets/84b8f889-3b2a-4b49-bc19-fe57a07439f7)
![Screenshot 2025-03-07 at 14 49 18](https://github.com/user-attachments/assets/e5f9aff9-5fdd-4cbb-99fd-74c5c69fad99)
![Screenshot 2025-03-07 at 14 49 33](https://github.com/user-attachments/assets/66b52d0d-fce2-43d1-90a9-9f655c5e63e5)
![Screenshot 2025-03-07 at 14 49 49](https://github.com/user-attachments/assets/31d0c7d2-1167-4561-b761-8dcaf79dfadc)
![Screenshot 2025-03-07 at 14 50 00](https://github.com/user-attachments/assets/3eb05b8a-2fcf-4106-a9f7-b16501d15326)
![Screenshot 2025-03-07 at 14 50 29](https://github.com/user-attachments/assets/e519aa7b-cfac-47f4-8ae3-298583727f7f)
![Screenshot 2025-03-07 at 14 51 03](https://github.com/user-attachments/assets/b45b89af-979d-43a1-8187-303e698986fc)
![Screenshot 2025-03-07 at 14 51 33](https://github.com/user-attachments/assets/dd94603c-5636-453f-b34f-5324c49851ac)
![Screenshot 2025-03-07 at 14 51 44](https://github.com/user-attachments/assets/437a7933-46c8-489f-bbb1-0b7c8510e4fd)
![Screenshot 2025-03-07 at 14 51 57](https://github.com/user-attachments/assets/0deab147-94b1-4e30-892a-200c47edf84d)
![Screenshot 2025-03-07 at 14 52 36](https://github.com/user-attachments/assets/6c668d6d-5b59-4147-93c3-4bea00ffb32c)
![Screenshot 2025-03-07 at 14 52 53](https://github.com/user-attachments/assets/38d2646f-7da1-40f7-af80-71356bb355d1)
![Screenshot 2025-03-07 at 14 53 06](https://github.com/user-attachments/assets/281a75bf-40af-406c-94e6-1f6ee996cc4b)
![Screenshot 2025-03-07 at 14 53 28](https://github.com/user-attachments/assets/18e06563-121e-4ec9-8fd7-94cb0d0ed292)
![Screenshot 2025-03-07 at 14 54 58](https://github.com/user-attachments/assets/e0471684-af95-455e-9644-a94b71b917ec)
![Screenshot 2025-03-07 at 14 56 07](https://github.com/user-attachments/assets/792e3fee-eba4-4b27-b39e-498f6c6cee7c)
![Screenshot 2025-03-07 at 14 58 08](https://github.com/user-attachments/assets/fc501070-41be-4352-ac0c-0f8f9308adf5)
![Screenshot 2025-03-07 at 14 58 18](https://github.com/user-attachments/assets/24ae95ee-3026-4560-892e-5bd7ae4edc8d)

Whatch video -----> 

https://www.youtube.com/watch?v=J5digNPWANw

*

Front-End -------->

https://github.com/Null-logic-0/AI-image-generator-version-1.1.0-Front-end

#!/bin/bash

echo "🚀 Starting LMS Backend with Redis..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create a .env file with your environment variables:"
    echo ""
    echo "DATABASE_URL=your_mongodb_atlas_connection_string"
    echo "JWT_SECRET=your_jwt_secret_key"
    echo "JWT_REFRESH_SECRET=your_jwt_refresh_secret_key"
    echo "SUPABASE_URL=your_supabase_url"
    echo "SUPABASE_KEY=your_supabase_anon_key"
    echo "EMAIL_HOST=smtp.gmail.com"
    echo "EMAIL_PORT=587"
    echo "EMAIL_USER=your_email@gmail.com"
    echo "EMAIL_PASS=your_app_password"
    echo ""
    exit 1
fi

# Build and start the services
docker-compose up --build

echo "✅ Application started!"
echo "🌐 Backend: http://localhost:4000"
echo "🔴 Redis: localhost:6379" 
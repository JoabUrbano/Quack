-- Create IMDTravel database
CREATE DATABASE imdtravel;

-- Create AirlinesHub database
CREATE DATABASE airlineshub;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE imdtravel TO quack;
GRANT ALL PRIVILEGES ON DATABASE airlineshub TO quack;

-- Create extensions in both databases
\c imdtravel
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c airlineshub
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Grant privileges on schemas
\c imdtravel
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO quack;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO quack;

\c airlineshub
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO quack;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO quack;
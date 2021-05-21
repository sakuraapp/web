# sakura-web

## Installation
Install the dependencies
```
npm install
```
Copy `.env.sample` as `.env`
```
cp .env.sample .env
```
Replace `localhost` with your site domain or ip address in the .env file
```
VITE_API_URL = "http://example.com:4000"
VITE_WEBSOCKET_SERVER_ADDRESS = "ws://example.com:4000"
VITE_COOKIE_DOMAIN = "example.com"
```
For development, install the ESLint & Prettier extensions for your code editor.

## Usage
**Development**
```
npm run dev
```
**Production**
```
npm run build
```
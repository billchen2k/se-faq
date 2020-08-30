let config = {
  // "api": "http://localhost:3001/api"
  "api": location.hostname == 'localhost' ? "http://localhost:3001/api" : "/api"

}

export default config;
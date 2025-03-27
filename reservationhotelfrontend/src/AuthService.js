// AuthService.js

const API_URL = 'http://localhost:8000/api/'; 
const AuthService = {
    login: async (username, password) => {
        const response = await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), 
        });

        if (!response.ok) {
            throw new Error('Échec de la connexion : ' + response.statusText); 
        }

        const data = await response.json(); 
        localStorage.setItem('token', data.token); 
        return data;
    },
    
    logout: async () => {
        await fetch(`${API_URL}logout`, {
            method: 'POST',
        });
        localStorage.removeItem('token'); 
    }
};

export default AuthService;

// src/components/RoomService.js

export const fetchRoomsByHotelId = async (hotelId) => {
    const response = await fetch(`http://localhost:8000/api/hotels/${hotelId}/chambres`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des chambres');
    }
    return response.json();
};

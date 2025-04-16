import { fetchworkoutsession } from "./fetch"

export const fetchTotalCalsBurn = async () => {
    try {
        const token = localStorage.getItem('authtoken')
        if (!token) {
            return 0
        }
        let session_id = localStorage.getItem("session_id")
        if (!session_id) {
            session_id = fetchworkoutsession()
        }
        const response = await fetch('http://localhost:5000/api/data/calsburned', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}`
            },
            body: JSON.stringify({ "session_id": session_id }) // Placed correctly
        });
        if (!response.ok) {
            throw new Error("Failed at retrieving session_id")
        }
        const text = await response.json();
        return text.totalCalories

    } catch (error) {
        console.log(error)
    }
}

export const fetchCategory =async()=>{
    try{
        const token=localStorage.getItem('authtoken')

        if(!token){
            return [
                { category: "Legs" }, // Quadriceps, Hamstrings, Calves, Glutes
                { category: "Back"}, // Lats, Traps, Lower Back, Middle Back
                { category: "Chest"}, // Pectorals
                { category: "Arms" }, // Biceps, Triceps, Forearms
                { category: "Shoulders" }, // Deltoids
                { category: "Core" }, // Abdominals, Obliques
              ]
        }
        let session_id = localStorage.getItem("session_id")
        if(!session_id){
            session_id = fetchworkoutsession()
        }
        const response = await fetch('http://localhost:5000/api/data/categories', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}`
            },
            body: JSON.stringify({ "session_id": session_id }) 
        });

        if (!response.ok) {
            throw new Error("Failed at retrieving session_id")
        }
        const text = await response.json();
        console.log(text.data)
        return text.data

    }catch(err){
        console.log(err)
        return [{category:'all'}];
    }
}
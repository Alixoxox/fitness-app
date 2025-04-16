import { fetchworkoutsession } from "./fetch"

export const savePlanDataDb = async (PlanData) => {
    const token = localStorage.getItem('authtoken')
    if (token) {
        let session_id = localStorage.getItem('session_id')
        if (!session_id) {
            session_id = fetchworkoutsession()
        }
        const { planName, focus, level, dayTag, progduraion, planDescription } = PlanData
        const response = await fetch('http://localhost:5000/api/NewPlan', {
            method: "POST", headers: { "Content-Type": "application/json",'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}` },
            body: JSON.stringify({planName, focus, level, dayTag, progduraion, planDescription})
        })
        if (!response.ok) {
            throw new Error("Failed to Insert Plan info")
        }
        const data = await response.json()
        if (data.message=="success") {
            console.log(data)
            return data.workout_plan_id
        }
    }
}

export const savePlanExercises = async(days,workout_plan_id) => {
    const token = localStorage.getItem('authtoken')
    if (token) {
        let session_id = localStorage.getItem('session_id')
        if (!session_id) {
            session_id = fetchworkoutsession()
        } 
        const response = await fetch('http://localhost:5000/api/PlanExercises', {
            method: "POST", headers: { "Content-Type": "application/json",'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}` },
            body: JSON.stringify({days,workout_plan_id,session_id})
        })
        if (!response.ok) {
            throw new Error("Failed to verify user info")
        }
        
    }
    
}
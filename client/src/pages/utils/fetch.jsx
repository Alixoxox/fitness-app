
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
    }
};

export const submituserinfo = async (user_data) => {
    try {
        const { email, fname, lname, username, password } = user_data
        const response = await fetch('http://localhost:5000/api/users/signup', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, fname: fname, lname: lname, username: username, password: password }) })
        if (!response.ok) {
            throw new Error("Failed to submit user info")
        }
        const token = await response.json()
        console.log(token.token)
        localStorage.setItem("authtoken", JSON.stringify(token.token))
    } catch (err) {
        console.log(err)
    }
}
export const verifyuserinfo = async (user_data) => {
    try {
        const { email, password } = user_data
        const response = await fetch('http://localhost:5000/api/users/login', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, password: password }) })
        if (!response.ok) {
            throw new Error("Failed to verify user info")
        }
        const data = await response.json()
        console.log(data.token)
        localStorage.setItem("authtoken", JSON.stringify(data.token))
        console.log(data.UserData)
        return data.UserData
    } catch (err) {
        console.log(err)
    }
}
export const fetchworkoutsession = async (formattedDate) => {
    try {
        const token = localStorage.getItem('authtoken');

        const response = await fetch('http://localhost:5000/api/data/workout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}`
            },
            body: JSON.stringify({ Date_search: formattedDate })
        });

        const text = await response.text();
        if (!response.ok) {
            throw new Error("Failed to retrieve session_id");
          
        }
        const data = JSON.parse(text);
        if(data){
            localStorage.setItem("session_id", JSON.stringify(data.session_id));
            return data.session_id;
        }else{
            createNewSession()
        }
    } catch (error) {
        console.error("❌ Error in fetchworkoutsession:", error);
    }
};
//change here
export const fetchexercisesdata = async (date) => {
    try {
        const token = localStorage.getItem("authtoken")
        if (!token) {
            return [
                { name: "Back Squats", category: "Legs", sets: 5, reps: "15", weight: "30kg", duration: "10 min" },
                { name: "Bench Press", category: "Chest", sets: 4, reps: "10", weight: "40kg", duration: "10 min" },
                { name: "Deadlifts", category: "Back", sets: 4, reps: "8", weight: "60kg", duration: "12 min" },
                { name: "Overhead Press", category: "Shoulders", sets: 4, reps: "10", weight: "25kg", duration: "10 min" },
                { name: "Bicep Curls", category: "Arms", sets: 3, reps: "12", weight: "15kg", duration: "6 min" },
                { name: "Tricep Dips", category: "Arms", sets: 3, reps: "12", weight: "Bodyweight", duration: "6 min" },
                { name: "Plank", category: "Core", sets: 3, reps: "Hold", duration: "1 min each" },
            ]
        }
        else {
            const formattedDate = new Date(date).toLocaleDateString('en-CA');
            console.log("Formatted Date:", formattedDate);

            let lastStoredDate = localStorage.getItem('last_date');
            let session_id = localStorage.getItem('session_id') 

            if (!session_id || lastStoredDate !== formattedDate) {
                session_id = await fetchworkoutsession(formattedDate);
                if (!session_id) {
                    console.warn(`No workout session found for User on ${formattedDate}`);
                    localStorage.removeItem("session_id");
                    localStorage.removeItem("last_date");
                   createNewSession()
                    return [];
                }

                localStorage.setItem("session_id", JSON.stringify(session_id));
                localStorage.setItem("last_date", formattedDate);
            }
            const response = await fetch('http://localhost:5000/api/data/exercise', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}`
                },
                body: JSON.stringify({ "session_id": session_id })// Placed correctly
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error Response:", errorText); // Log the error response for debugging
                throw new Error(`Failed at retrieving session_id. Server responded with: ${errorText}`);
            }
            const text = await response.json();
            return text
            }
        } catch (error) {
            console.log("something went wrong in fetchexercisesdata func", error)
            return []; // Return empty array in case of error
        }
        }

export const createNewSession = async (workout_name) => {
    try {
        const token = localStorage.getItem("authtoken");
        if (token) {
            const response = await fetch('http://localhost:5000/api/workout/new', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.trim().replace(/^"|"$/g, "")}`
                },
                body: JSON.stringify({ workout_name: workout_name })
            });

            const text = await response.text();
            if (!response.ok) {
                throw new Error("Failed to retrieve session_id");
            }
            console.log(text)  
            const formattedDate = new Date().toLocaleDateString('en-CA');
            localStorage.setItem("session_id",text.session_id)
            localStorage.setItem('last_date', formattedDate)
            return
        }
    } catch (error) {
        console.log(error)
    }

}


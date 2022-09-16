generatePetButton = document.querySelector("#generate-pet");
adoptPetButton =  document.querySelector("#adopt-pet");

generatePetButton.addEventListener("click", () => {
        fetch("/generate-pet")
        .then((response) => response.json())
        .then((petData) => {
            console.log(petData);
            // Update species img
            document.querySelector("#species-img").src = petData["Species img path"];
            document.querySelector("#species-img").alt = petData["Pet species"];

            // Update pet info table
            document.getElementById("pet-species").innerText = petData["Pet species"];
            document.getElementById("food-fave").innerText = petData["Favorite food"];
            document.getElementById("food-least").innerText = petData["Least favorite food"];
            document.getElementById("activity-fave").innerText = petData["Favorite activity"];
            document.getElementById("activity-least").innerText = petData["Least favorite activity"];
            document.getElementById("music-fave").innerText = petData["Favorite music genre"];
            document.getElementById("music-least").innerText = petData["Least favorite music genre"];
            document.getElementById("weather-fave").innerText = petData["Favorite weather"];
            document.getElementById("weather-least").innerText = petData["Least favorite weather"];
            document.getElementById("personality").innerText = petData["Personality"];
            document.getElementById("astro-sign").innerText = petData["Astrological sign"];
    })
});


adoptPetButton.addEventListener("click", () => {
    let currentPetData = {
        "Pet species" : document.getElementById("pet-species").textContent,
        "Species img path" : document.getElementById("species-img").src,
        "Favorite food" : document.getElementById("food-fave").textContent,
        "Least favorite food" : document.getElementById("food-least").textContent,
        "Favorite activity" : document.getElementById("activity-fave").textContent,
        "Least favorite activity" : document.getElementById("activity-least").textContent,
        "Favorite music genre" : document.getElementById("music-fave").textContent,
        "Least favorite music genre" : document.getElementById("music-least").textContent,
        "Favorite weather" : document.getElementById("weather-fave").textContent,
        "Least favorite weather" : document.getElementById("weather-least").textContent,
        "Personality" : document.getElementById("personality").textContent,
        "Astrological sign" : document.getElementById("astro-sign").textContent,
        "Name" : null,
        "Country" : null,
        "Region" : null,
        "City" : null,
        "lat" : null,
        "lon" : null,
    }

    fetch("/get-loc")
        .then((response) => response.json())
        .then((userData) => {
            console.log(userData);
            currentPetData["Country"] = userData["country"];
            currentPetData["Region"] = userData["regionName"];
            currentPetData["City"] = userData["city"];
            currentPetData["lat"] = userData["lat"];
            currentPetData["lon"] = userData["lon"];

            currentPetData["Name"] = prompt("Please name your pet:");

            fetch("/adopt-pet", {
                method: 'POST',
                body: JSON.stringify(currentPetData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((msg) => {
                    alert(msg)
                })
    })
});
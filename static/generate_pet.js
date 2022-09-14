generatePetButton = document.querySelector("#generate-pet");
adoptPetButton =  document.querySelector("#adopt-pet");

petInfoTable = document.querySelector("#pet-info");

generatePetButton.addEventListener("click", () => {
        fetch("/generate-pet")
        .then((response) => response.json())
        .then((petData) => {
            console.log(petData);
            // Update species img
            document.querySelector("#species-img").src = petData["Species img path"]

            // Update pet info table
            petInfoTable.innerHTML = "";
            let tableRows = `
                <tr>
                    <td>Pet species</td>
                    <td id="pet-species">${petData["Pet species"]}</td>
                </tr>
                <tr>
                    <td>Favorite food</td>
                    <td id="food-fave">${petData["Favorite food"]}</td>
                </tr>
                <tr>
                    <td>Least favorite food</td>
                    <td id="food-least">${petData["Least favorite food"]}</td>
                </tr>
                <tr>
                    <td>Favorite activity</td>
                    <td id="activity-fave">${petData["Favorite activity"]}</td>
                </tr>
                <tr>
                    <td>Least favorite activity</td>
                    <td id="activity-least">${petData["Least favorite activity"]}</td>
                </tr>
                <tr>
                    <td>Favorite music genre</td>
                    <td id="music-fave">${petData["Favorite music genre"]}</td>
                </tr>
                <tr>
                    <td>Least favorite music genre</td>
                    <td id="music-least">${petData["Least favorite music genre"]}</td>
                </tr>
                <tr>
                    <td>Favorite weather</td>
                    <td id="weather-fave">${petData["Favorite weather"]}</td>
                </tr>
                <tr>
                    <td>Least favorite weather</td>
                    <td id="weather-least">${petData["Least favorite weather"]}</td>
                </tr>
                <tr>
                    <td>Personality</td>
                    <td id="personality">${petData["Personality"]}</td>
                </tr>
                <tr>
                    <td>Astrological sign</td>
                    <td id="astro-sign">${petData["Astrological sign"]}</td>
                </tr>
            `;
            petInfoTable.insertAdjacentHTML('beforeEnd', tableRows);
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
        "Zipcode" : null
    }

    console.log("adding evt listener")
    currentPetData["Name"] = prompt("Please name your pet:");
    currentPetData["Zipcode"] = prompt("Where would you like your pet to live? (Enter zipcode)");
    fetch("/adopt-pet", {
        method: 'POST',
        body: JSON.stringify(currentPetData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
});
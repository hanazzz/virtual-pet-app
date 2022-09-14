generatePetButton = document.querySelector("#generate-pet");
adoptPetButton =  document.querySelector("#adopt-pet");

petInfoTable = document.querySelector("#pet-info");

let currentPetData = null;

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
                    <td>${petData["Pet species"]}</td>
                </tr>
                <tr>
                    <td>Favorite food</td>
                    <td>${petData["Favorite food"]}</td>
                </tr>
                <tr>
                    <td>Least favorite food</td>
                    <td>${petData["Least favorite food"]}</td>
                </tr>
                <tr>
                    <td>Favorite activity</td>
                    <td>${petData["Favorite activity"]}</td>
                </tr>
                <tr>
                    <td>Least favorite activity</td>
                    <td>${petData["Least favorite activity"]}</td>
                </tr>
                <tr>
                    <td>Favorite music genre</td>
                    <td>${petData["Favorite music genre"]}</td>
                </tr>
                <tr>
                    <td>Least favorite music genre</td>
                    <td>${petData["Least favorite music genre"]}</td>
                </tr>
                <tr>
                    <td>Favorite weather</td>
                    <td>${petData["Favorite weather"]}</td>
                </tr>
                <tr>
                    <td>Least favorite weather</td>
                    <td>${petData["Least favorite weather"]}</td>
                </tr>
                <tr>
                    <td>Personality</td>
                    <td>${petData["Personality"]}</td>
                </tr>
                <tr>
                    <td>Astrological sign</td>
                    <td>${petData["Astrological sign"]}</td>
                </tr>
            `;
            petInfoTable.insertAdjacentHTML('beforeEnd', tableRows);

            currentPetData = petData;

             // When user clicks adopt pet button, prompt for pet name and
            //  zipcode, send pet data back to server
            adoptPetButton.addEventListener("click", () => {
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
    })
});
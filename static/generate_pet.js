generatePetButton = document.querySelector("#generate-pet");
petInfoTable = document.querySelector("#pet-info");

generatePetButton.addEventListener("click", () => {
    fetch("/generate-pet")
    .then((response) => response.json())
    .then((petData) => {
        petInfoTable.innerHTML = "";
        for (key in petData) {
            console.log(key);
            console.log(petData[key]);
            let tableRows = `
            <tr>
                <td>${key}</td>
                <td>${petData[key]}</td>
            </tr>`;
            petInfoTable.insertAdjacentHTML('beforeEnd', tableRows);
        }

        let currentPetData = petData;
    })
});

adoptPetButton =  document.querySelector("#adopt-pet");

// adoptPetButton.addEventListener("click", () => {
//     console.log(currentPetData);
// });
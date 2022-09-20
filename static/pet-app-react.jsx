function PetDisplay(props) {
  return (
    <div>
      <div>
        <img src={`${props.pet.species_img_path}`} alt={`${props.pet.species_name}`} id="species-img" />
        <p>Images created using <a href="https://www.craiyon.com/">Craiyon</a></p>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Pet species</td>
            <td id="pet-species">{props.pet.species_name}</td>
          </tr>
          <tr>
              <td>Favorite food</td>
              <td id="food-fave">{props.pet.food_fave}</td>
          </tr>
          <tr>
              <td>Least favorite food</td>
              <td id="food-least">{props.pet.food_least}</td>
          </tr>
          <tr>
              <td>Favorite activity</td>
              <td id="activity-fave">{props.pet.activity_fave}</td>
          </tr>
          <tr>
              <td>Least favorite activity</td>
              <td id="activity-least">{props.pet.activity_least}</td>
          </tr>
          <tr>
              <td>Favorite music genre</td>
              <td id="music-fave">{props.pet.music_fave}</td>
          </tr>
          <tr>
              <td>Least favorite music genre</td>
              <td id="music-least">{props.pet.music_least}</td>
          </tr>
          <tr>
              <td>Favorite weather</td>
              <td id="weather-fave">{props.pet.weather_fave}</td>
          </tr>
          <tr>
              <td>Least favorite weather</td>
              <td id="weather-least">{props.pet.weather_least}</td>
          </tr>
          <tr>
              <td>Personality</td>
              <td id="personality">{props.pet.personality}</td>
          </tr>
          <tr>
              <td>Astrological sign</td>
              <td id="astro-sign">{props.pet.astro_sign}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


function PetGenerator(props) {
  const [newPetData, setNewPetData] = React.useState();
  console.log("Loading pet generator");
  console.log(newPetData);

  function generateNewPet() {
    console.log("generating pet");
    fetch("/generate-pet")
    .then((response) => response.json())
    .then((petJson) => {
      console.log("new pet available");
      setNewPetData(petJson);
    });
  }

  function adoptPet() {
    console.log("preparing to adopt pet");
    fetch("/get-loc-mock")
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData);

        let name = prompt("Please name your pet:");
        let updatedPetData = newPetData;
        updatedPetData["name"] = name;
        updatedPetData["country"] = userData["country"];
        updatedPetData["region"] = userData["regionName"];
        updatedPetData["city"] = userData["city"];
        updatedPetData["lat"] = userData["lat"];
        updatedPetData["lon"] = userData["lon"];
        setNewPetData(updatedPetData);
        console.log(newPetData);
        // setNewPetData((currentNewPetData) => {({
        //     ...currentNewPetData,
        //     "name": name,
        //     "country": userData["country"],
        //     "region": userData["regionName"],
        //     "city": userData["city"],
        //     "lat": userData["lat"],
        //     "lon": userData["lon"]
        // })}
        // );

        fetch("/adopt-pet", {
          method: 'POST',
          body: JSON.stringify(newPetData),
          headers: {
              'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((msg) => {
            console.log("adoption complete");
            alert(msg);
            props.setAdoptedPet(true);
          });
    });
  }


  if (newPetData) {
    console.log("showing pet")
    return (
      <div>
        <h2>Potential Pet</h2>
        <button type="button" onClick={generateNewPet} id="generate-pet">GENERATE PET</button><br />
        <PetDisplay pet={newPetData} />
        <br/><button type="button" onClick={adoptPet} id="adopt-pet">ADOPT PET</button>
      </div>
    )
  } else {
    return (
      <div><button type="button" onClick={generateNewPet} id="generate-pet">GENERATE PET</button></div>
    )
  }
  
}


function CurrentPet(props) {
  function deletePet() {
    fetch("/delete-pet")
      .then((response) => response.json())
      .then((msg) => {
        alert(msg);
        props.setPetData(null);
      });
  }

  return (
    <div>
      <h1>meow! here is your pet!</h1>
      <h2>{props.pet.name} the {props.pet.personality} {props.pet.species_name}</h2>
      <h3 id="location">Location: {props.pet.city}, {props.pet.region}, {props.pet.country}</h3>
      <PetDisplay pet={props.pet} />
  
      <button id="delete-pet" onClick={deletePet}>DELETE PET</button>
    </div>
  )
}


function VirtualPetApp() {
  const [petData, setPetData] = React.useState("TBD");
  // const [hasPet, setHasPet] = React.useState();
  const [adoptedPet, setAdoptedPet] = React.useState(false);

  console.log("Loading app")

  React.useEffect(() => {
    console.log("fetching");
    fetch("/user-info")
      .then((response) => response.json())
      .then((petJson) => {
        if (petJson) {
          console.log("has pet")
          setPetData(petJson);
        } else {
          console.log("no pet");
          setPetData(null);
        }
      })
  }, [adoptedPet]);

  // If user has pet
  if (petData && petData != "TBD") {
    console.log("Existing pet data");
    alert("Your pet is so cute!");
    return(
      <CurrentPet pet={petData} setPetData={setPetData} />
    )
  // If user doesn't have pet
  } else if (!petData && !adoptedPet) {
    console.log("NO pet data");
    alert("Looks like you don't have a pet yet! Let's fix that.");
    return (
      <PetGenerator adoptedPet={adoptedPet} setAdoptedPet={setAdoptedPet} />
    )
  // If useEffect hasn't run
  } else {
    console.log("the void");
    return (
      <div>Loading...</div>
    )
  } 
}


ReactDOM.render(<VirtualPetApp />, document.querySelector("#app")); 

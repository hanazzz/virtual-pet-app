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
              <td id="food-fave">TBD</td>
          </tr>
          <tr>
              <td>Least favorite food</td>
              <td id="food-least">TBD</td>
          </tr>
          <tr>
              <td>Favorite activity</td>
              <td id="activity-fave">TBD</td>
          </tr>
          <tr>
              <td>Least favorite activity</td>
              <td id="activity-least">TBD</td>
          </tr>
          <tr>
              <td>Favorite music genre</td>
              <td id="music-fave">TBD</td>
          </tr>
          <tr>
              <td>Least favorite music genre</td>
              <td id="music-least">TBD</td>
          </tr>
          <tr>
              <td>Favorite weather</td>
              <td id="weather-fave">TBD</td>
          </tr>
          <tr>
              <td>Least favorite weather</td>
              <td id="weather-least">TBD</td>
          </tr>
          <tr>
              <td>Personality</td>
              <td id="personality">TBD</td>
          </tr>
          <tr>
              <td>Astrological sign</td>
              <td id="astro-sign">TBD</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


function GeneratePet() {
  alert("Looks like you don't have a pet yet! Let's fix that.")

  return (
    <div>
      no pet!
      <PetDisplay />
    </div>
  )
}


function CurrentPet(props) {
  alert("Your pet is so cute!");

  return (
    <div>
      <h1>meow! here is your pet!</h1>
      <h2>{props.pet.name} the {props.pet.personality} {props.pet.species_name}</h2>
      <h3 id="location">Location: {props.pet.city}, {props.pet.region}, {props.pet.country}</h3>
      <PetDisplay pet={props.pet} />
  
      <button id="delete-pet">DELETE PET</button>
    </div>
  )
}


function VirtualPetApp() {
  const [petData, setPetData] = React.useState();

  React.useEffect(() => {
    fetch("/user-info")
      .then((response) => response.json())
      .then((petJson) => {
        if (petJson) {
          setPetData(petJson);
        } 
      })
  }, []);
  
  if (petData) {
    return (
      <CurrentPet pet={petData} />
    )
  } else if (petData == false) {
    return (
      <GeneratePet petData="TBD" />
    )
  } else {
    return null
  }
}


ReactDOM.render(<VirtualPetApp />, document.querySelector("#app")); 

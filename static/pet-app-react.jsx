function PetDisplay() {

  return (
    <table>
      <tr>
          <td>Pet species</td>
          <td id="pet-species">TBD</td>
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
    </table>
  )
}


function GeneratePet() {
  alert("Looks like you don't have a pet yet! Let's fix that.")

  return (
    <div>
      no pet!
    </div>
  )
}


function CurrentPet() {
  alert("Your pet is so cute!")
  // <button id="delete-pet">DELETE PET</button>

  return (
    <div>
      meow! here is your pet!
    </div>
  )
}


function VirtualPetApp() {
  // const [userID, setUserID] = React.useState(0)
  const [hasPet, setHasPet] = React.useState();

  React.useEffect(() => {
    fetch("/user-info")
      .then((response) => response.json())
      .then((petData) => {
        console.log(petData);

        if (petData) {
          setHasPet(true);
        }
      })
  }, []);
  
  if (hasPet) {
    return (
      <CurrentPet />
    )
  } else {
    return (
      <GeneratePet />
    )
  }
}


ReactDOM.render(<VirtualPetApp />, document.querySelector("#app")); 

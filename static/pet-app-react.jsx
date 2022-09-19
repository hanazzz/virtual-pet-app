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

}


function CurrentPet() {

  // <button id="delete-pet">DELETE PET</button>
}


function VirtualPetApp() {
  // const [userID, setUserID] = React.useState(0)
  
  return (
    <div>
      meow!
    </div>
  )
}


ReactDOM.render(<VirtualPetApp />, document.querySelector("#app")); 

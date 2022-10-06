// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Create custom species and adopt pet (custom species pet)

// eslint-disable-next-line no-unused-vars
function CustomPetCreator({ adoptPet }) {
  const adjectives = ['sparkly', 'glowing', 'translucent'];
  const colors = ['turquoise', 'black', 'neon yellow'];
  const animals = ['dog', 'mouse', 'turtle'];
  const [adjective, setAdjective] = React.useState('');
  const [color, setColor] = React.useState('');
  const [animal, setAnimal] = React.useState('');

  // const queryClient = ReactQuery.useQueryClient();
  const { makeCustomImg } = useMakeCustomImg();

  function makeCustomPet(evt) {
    evt.preventDefault();

    adoptPet(`${adjective} ${animal}`, null);

    // console.log('preparing to adopt pet');
    // // Get user's location via IP address and use for pet's location
    // fetch('/user/location/mock')
    //   .then((response) => response.json())
    //   .then((userData) => {
    //     console.log('userData (location):', userData);

    //     const name = prompt('Please name your pet:');

    //     const updatedPetData = newPetData;
    //     updatedPetData.name = name;
    //     updatedPetData.country = userData.country;
    //     updatedPetData.region = userData.regionName;
    //     updatedPetData.city = userData.city;
    //     updatedPetData.lat = userData.lat;
    //     updatedPetData.lon = userData.lon;
    //     updatedPetData.species_name = `${adjective} ${animal}`;
    //     updatedPetData.species_img_path = null;
    //     setNewPetData(updatedPetData);

    //     console.log('updated newPetData:', newPetData);

    //     // TODO: Troubleshoot (doesn't currently work)
    //     // setNewPetData(prevData => ({
    //     //   ...prevData,
    //     //   name: name,
    //     //   country: userData["country"],
    //     //   region: userData["regionName"],
    //     //   city: userData["city"],
    //     //   lat: userData["lat"],
    //     //   lon: userData["lon"],
    //     // }));

    //     // console.log(newPetData);

    //     // Adopt pet (create pet in database and link to user)
    //     fetch('/user/pet/new', {
    //       method: 'POST',
    //       body: JSON.stringify(newPetData),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //       .then(() => {
    //         // Get new data from server
    //         // (previous data no longer valid), re-runs query fctn in custom hook, prompts re-render
    //         queryClient.invalidateQueries(['pet data']);

    //         console.log('adoption complete');
    //         // eslint-disable-next-line react/prop-types
    //         alert(`Congratulations on bringing home your new pet, ${newPetData.name} the ${newPetData.personality} ${newPetData.species_name}!`);
    //       })
    //       .catch((error) => alert(error.toString()));
    //   });

    console.log('creating custom pet');

    const petPrompt = [adjective, color, animal];

    makeCustomImg(petPrompt);
    // console.log(petPrompt);
    // fetch('/user/pet/custom', {
    //   method: 'POST',
    //   body: JSON.stringify(petPrompt),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }

  return (
    <div className="form-control w-full max-w-xs md:col-span-2">
      <form id="custom-species-form" name="custom-pet" onSubmit={(evt) => makeCustomPet(evt)}>
        <h3>Make a custom pet species!</h3>
        <SelectInput
          selectID="pet-adjective"
          labelText="Pick an adjective"
          optionList={adjectives}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={adjective}
          setState={setAdjective}
        />

        <SelectInput
          selectID="pet-color"
          labelText="Pick a color"
          optionList={colors}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={color}
          setState={setColor}
        />

        <SelectInput
          selectID="pet-animal"
          labelText="Pick an animal"
          optionList={animals}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={animal}
          setState={setAnimal}
        />

        <input type="submit" className="btn" />
      </form>
    </div>
  );
}

CustomPetCreator.propTypes = {
  adoptPet: PropTypes.func.isRequired,
};

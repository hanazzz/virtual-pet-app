// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function VirtualPetApp() {
  const [petData, setPetData] = React.useState(undefined);
  const username = localStorage.getItem('username');

  console.log('Loading app');

  // Check if user has existing pet
  React.useEffect(() => {
    console.log('fetching');
    fetch('/user-info')
      .then((response) => response.json())
      .then((petJson) => {
        if (petJson) {
          console.log('checked db: has pet');
          setPetData(petJson);
        } else {
          console.log('checked db: no pet');
          setPetData(null);
        }
      })
      .catch((error) => alert(error.toString()));
  }, []);

  // If user's pet status is unknown (i.e. useEffect hasn't run)
  let appContent = (<div>Loading...</div>);

  // If user has pet, load CurrentPet. If not, load PetGene
  if (petData) {
    appContent = (
      <CurrentPet
        pet={petData}
        setPetData={setPetData}
      />
    );
  } else if (petData === null) {
    appContent = (
      <PetGenerator
        petData={petData}
        setPetData={setPetData}
      />
    );
  }

  return (
    <>
      <Navbar username={username} />
      {appContent}
    </>
  );

  // // If user has pet
  // if (petData) {
  //   alert('Your pet is so cute!');
  //   return (
  //     <>
  //       <Navbar username={petData.username} />
  //       <CurrentPet
  //         pet={petData}
  //         setPetData={setPetData}
  //       />
  //     </>
  //   );
  // // If user doesn't have pet
  // } else if (petData === null) {
  //   console.log('NO pet data, rendering PetGenerator');
  //   alert("Looks like you don't have a pet yet! Let's fix that.");
  //   return (
  //     <>
  //       <Navbar username={username} />
  //       <PetGenerator
  //         petData={petData}
  //         setPetData={setPetData}
  //       />
  //     </>
  //   );
  // }
  // // If user's pet status is unknown (i.e. useEffect hasn't run)
  // console.log('the void');
  // return (
  //   <>
  //     <Navbar username={username} />
  //     <div>Loading...</div>
  //   </>
  // );
}

ReactDOM.render(<VirtualPetApp />, document.querySelector('#app'));

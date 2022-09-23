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
  let appContent = (<div className="row">Loading...</div>);

  // If user has pet, load CurrentPet. If not, load PetGene
  if (petData) {
    appContent = (
      <CurrentPet
        pet={petData}
        setPetData={setPetData}
      />
    );
  } else if (petData === null) {
    // If any lingering stats in local storage, delete them.
    localStorage.removeItem('energy');
    localStorage.removeItem('happiness');
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
      <main className="row">
        {appContent}
      </main>
      <Footer />
    </>
  );
}

ReactDOM.render(<VirtualPetApp />, document.querySelector('#app'));

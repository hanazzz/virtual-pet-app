// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function VirtualPetApp() {
  // const [petData, setPetData] = React.useState(undefined);
  const username = localStorage.getItem('username');

  const queryClient = new ReactQuery.QueryClient();

  console.log('Loading app');

  // Check if user has existing pet
  // React.useEffect(() => {
  //   console.log('fetching');
  //   fetch('/user/pet/info')
  //     .then((response) => response.json())
  //     .then((petJson) => {
  //       if (petJson) {
  //         console.log('checked db: has pet');
  //         setPetData(petJson);
  //       } else {
  //         console.log('checked db: no pet');
  //         setPetData(null);
  //       }
  //     })
  //     .catch((error) => alert(error.toString()));
  // }, []);
  const {data: petData, isLoading} = ReactQuery.useQuery(['pet data'], () => 
    fetch('/user/pet/info')
    .then((response) => response.json())
    // .then((petJson) => {
    //   if (petJson) {
    //     console.log('checked db: has pet');
    //     setPetData(petJson);
    //   } else {
    //     console.log('checked db: no pet');
    //     setPetData(null);
    //   }
    // })
    .catch((error) => alert(error.toString())), 
  )

  // If user's pet status is unknown (i.e. useEffect hasn't run)
  // Can rewrite to check isLoading to determine what to show (and update following lines accordingly) + 
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
    <ReactQuery.QueryClientProvider client={queryClient}>
      <Navbar username={username} petData={petData} setPetData={setPetData} />
      <main className="px-10 py-6">
        {appContent}
      </main>
      <Footer />
    </ReactQuery.QueryClientProvider>
  );
}

ReactDOM.render(<VirtualPetApp />, document.querySelector('#app'));

// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function VirtualPetApp() {
  // const [petData, setPetData] = React.useState(undefined);
  const username = localStorage.getItem('username');

  const { petData, isLoading } = usePetData();

  console.log('Loading app');

  let appContent;

  if (isLoading) {
    // If still retrieving pet data from server, show loading
    appContent = <div className="row">Loading...</div>;
  } else if (petData) {
    // If received pet data and there is an existing pet, show current pet
    appContent = <CurrentPet />;
  } else if (!petData) {
    // If there is no existing pet, show pet generator
    // Delete any lingering stats in local storage
    localStorage.removeItem('energy');
    localStorage.removeItem('happiness');
    appContent = <PetGenerator />;
  }

  return (
    <>
      <Navbar username={username} />
      <main className="px-10 py-6">
        {appContent}
      </main>
      <Footer />
    </>
  );
}

function App() {
  const queryClient = new ReactQuery.QueryClient();

  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      <VirtualPetApp />
    </ReactQuery.QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));

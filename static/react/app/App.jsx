// Parent component for app
function VirtualPetApp() {
  // Get username from local storage (if any)
  const username = localStorage.getItem('username');

  // Get pet data from server (database)
  const { petData, isLoading } = usePetData();

  // tempInF tracks whether to display temperature in Fahrenheit (true) or Celsius (false)
  const [tempInF, setTempInF] = React.useState(JSON.parse(localStorage.getItem('tempInF')) || true);

  // alertList holds list of alerts to display to user
  const [alertList, setAlertList] = React.useState([]);

  // Create new alert and add to alertList
  function addAlert(msg, alertClasses) {
    const alertNum = alertList.length;
    const alert = (
      <Alert
        alertID={`app-alert-${alertNum}`}
        key={`app-alert-${alertNum}`}
        addlClasses={alertClasses}
      >
        {msg}
      </Alert>
    );
    setAlertList((prevList) => prevList.concat(alert));
  }

  let appContent;

  if (isLoading) {
    // If still retrieving pet data from server, show loading
    appContent = <div className="row">Loading...</div>;
  } else if (petData) {
    // If received pet data and there is an existing pet, show current pet
    appContent = <CurrentPet tempInF={tempInF} />;
  } else if (!petData) {
    // If there is no existing pet, show pet generator
    // Delete any lingering stats in local storage
    localStorage.removeItem('Energy');
    localStorage.removeItem('Happiness');
    appContent = <PetGenerator addAlert={addAlert} />;
  }

  return (
    <>
      {alertList}

      <Navbar username={username} tempInF={tempInF} setTempInF={setTempInF} addAlert={addAlert} />

      <main className="px-10 py-6 min-h-screen max-h-fit">
        {appContent}
      </main>

      <Footer />
    </>
  );
}

// Parent component to wrap VirtualPetApp in provider
function App() {
  const queryClient = new ReactQuery.QueryClient();

  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      <VirtualPetApp />
    </ReactQuery.QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));

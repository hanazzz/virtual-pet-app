// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */

function VirtualPetApp() {
  // Get username from local storage (if any)
  const username = localStorage.getItem('username');

  // Get pet data from server (database)
  const { petData, isLoading } = usePetData();

  // tempInF tracks whether to display temperature in Fahrenheit (true) or Celsius (false)
  const [tempInF, setTempInF] = React.useState(JSON.parse(localStorage.getItem('tempInF')) || true);

  function showAlert(msg, alertClasses) {
    // Get alert DOM element
    const alert = document.querySelector('.alert');
    // Remove any previous alert classes
    alert.classList.remove('alert-info');
    alert.classList.remove('alert-success');
    alert.classList.remove('alert-warning');
    alert.classList.remove('alert-error');
    // Add any additional classes to alert
    alert.classList.add(alertClasses);
    // Remove 'hidden' class to show alert
    alert.classList.remove('hidden');
    // Get alert text box DOM element
    const alertText = document.querySelector('#alert-text');
    // Update alert text with msg
    alertText.innerText = msg;
  }

  console.log('Loading app');

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
    localStorage.removeItem('energy');
    localStorage.removeItem('happiness');
    appContent = <PetGenerator />;
  }

  return (
    <>
      <Alert alertID="app-alert" addlClasses="hidden" />

      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Navbar username={username} tempInF={tempInF} setTempInF={setTempInF} showAlert={showAlert} />

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

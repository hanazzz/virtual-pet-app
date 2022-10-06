// Custom hook to create custom pet species with custom img from Craiyon

// eslint-disable-next-line no-unused-vars
const useMakeCustomImg = () => {
  const queryClient = ReactQuery.useQueryClient();

  const { mutate: makeCustomImg, isLoading, error, isSuccess } = ReactQuery.useMutation(
    // mutation function
    (petPrompt) => fetch('/user/pet/custom', {
      method: 'POST',
      body: JSON.stringify(petPrompt),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => (console.log('response:', response))),
    // .catch((error) => (console.log('fetch error:', error)))
    {
      // disable garbage collection
      cacheTime: Infinity,
      // callback function when mutation function is successful (get updated pet data from server)
      onSuccess: () => queryClient.invalidateQueries(['pet data']),
    },
  );

  console.log('useMakeCustomImg - isLoading:', isLoading);
  console.log('useMakeCustomImg - error:', error);
  console.log('useMakeCustomImg - isSuccess:', isSuccess);

  return { makeCustomImg, isLoading, error, isSuccess };
};

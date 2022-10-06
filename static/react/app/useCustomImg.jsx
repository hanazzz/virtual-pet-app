// const useCustomImg = (adjective, animal, color) => {
//   const petPrompt = [adjective, color, animal];

//   const {data, isLoading, error, isSuccess} = useQuery(['customImg', adjective, animal], () => fetch('/user/pet/custom', {
//     method: 'POST',
//     body: JSON.stringify(petPrompt),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }), {staleTime: Infinity, cacheTime: Infinity});

//   return {isLoading, error, isSuccess}
// }

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
      // callback function for when mutation function is successful
      onSuccess: () => queryClient.invalidateQueries(['pet data']),
    },
  );

  console.log('useMakeCustomImg - isLoading:', isLoading);
  console.log('useMakeCustomImg - error:', error);
  console.log('useMakeCustomImg - isSuccess:', isSuccess);

  return { makeCustomImg, isLoading, error, isSuccess };
};

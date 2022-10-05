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

const useMakeCustomImg = () => {
  const { mutate, isLoading, error, isSuccess } = ReactQuery.useMutation((petPrompt) => fetch('/user/pet/custom', {
    method: 'POST',
    body: JSON.stringify(petPrompt),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => (console.log('response:', response)))
    // .catch((error) => (console.log('fetch error:', error)))
    , { cacheTime: Infinity });

  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('isSuccess:', isSuccess);

  return { makeCustomImg: mutate, isLoading, error, isSuccess };
};

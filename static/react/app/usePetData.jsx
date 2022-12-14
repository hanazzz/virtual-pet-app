// eslint-disable-next-line no-unused-vars
const usePetData = () => {
  const { data: petData, isLoading, error } = ReactQuery.useQuery(
    // query key
    ['pet data'],
    // query function
    () => fetch('/user/pet/info')
      .then((response) => response.json()),
    // .catch((error) => alert(error.toString())),
    // function in case of error
    { onError: (error) => alert(error.toString()) },
  );

  return { petData, isLoading };
};

// eslint-disable-next-line no-unused-vars
function AttributesModal() {
  const modalID = 'pet-attributes-modal';

  return (
    <>
      <ModalBtn modalID={modalID}>
        ATTRIBUTES
      </ModalBtn>

      <ModalBox modalID={modalID}>
        <PetAttributes />
        <ModalFooter>
          <ModalBtn modalID={modalID}>
            Close
          </ModalBtn>
        </ModalFooter>
      </ModalBox>
    </>

  );
}

// eslint-disable-next-line no-unused-vars
function AttributesModal() {
  const modalID = 'pet-attributes-modal';

  return (
    <>
      <ModalBtn modalID={modalID} addlClasses="btn-lg btn-primary">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <i className="fa-solid fa-book pr-2" /> ATTRIBUTES
      </ModalBtn>

      <ModalBox modalID={modalID}>
        <PetAttributes />
        <ModalFooter>
          <ModalBtn modalID={modalID} closeModal>
            Close
          </ModalBtn>
        </ModalFooter>
      </ModalBox>
    </>

  );
}

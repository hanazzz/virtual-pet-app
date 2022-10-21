// eslint-disable-next-line no-unused-vars
function AttributesModal() {
  const modalID = 'pet-attributes-modal';

  return (
    <>
      <ModalBtn
        modalID={modalID}
        addlClasses="btn-lg btn-primary tooltip tooltip-primary content-center p-6 md:p-12 my-4 md:my-0"
        dataTip="ATTRIBUTES"
      >
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <i className="fa-solid fa-book  text-4xl pr-0" title="Attributes" />
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

function Attributes({ pet }) {
  const modalID = 'pet-attributes-modal';

  return (
    <>
      <ModalBtn modalID={modalID}>
        ATTRIBUTES
      </ModalBtn>

      <ModalBox modalID={modalID}>
        <PetAttributes pet={pet} />
        <ModalFooter>
          <ModalBtn modalID={modalID}>
            Close
          </ModalBtn>
        </ModalFooter>
      </ModalBox>
    </>

  // <Modal modalID="pet-attributes" modalBtnText="ATTRIBUTES">
  //   <PetAttributes pet={pet} />
  // </Modal>
  );
}

Attributes.propTypes = {
  pet: PropTypes.shape({
    species_name: PropTypes.string.isRequired,
    food_fave: PropTypes.string.isRequired,
    food_least: PropTypes.string.isRequired,
    activity_fave: PropTypes.string.isRequired,
    activity_least: PropTypes.string.isRequired,
    music_fave: PropTypes.string.isRequired,
    music_least: PropTypes.string.isRequired,
    weather_fave: PropTypes.string.isRequired,
    weather_least: PropTypes.string.isRequired,
    personality: PropTypes.string.isRequired,
    astro_sign: PropTypes.string.isRequired,
  }).isRequired,
};

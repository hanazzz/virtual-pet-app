/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
function About() {
  return (

    <>
      <ModalBtn modalID="about-modal" addlClasses="btn-ghost w-16"><i className="fa-solid fa-rainbow" title="About" /></ModalBtn>

      <ModalBox modalID="about-modal">
        <ModalTitle>ABOUT</ModalTitle>

        <Heading3>What is BitBuddy?</Heading3>
        <p className="pb-4">BitBuddy is a virtual pet app inspired by digital pet games from the early/mid 2000s, but with a modern twist: AI. It was created by Hanâ Zait as their capstone project for the Hackbright Software Engineering Bootcamp.</p>
        <p className="pb-8">
          You can learn more about BitBuddy, including the tech stack used, on
          {' '}
          <a
            href="https://github.com/hanazzz/virtual-pet-app"
            className="link hover:bg-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <Heading3>Who is Hanâ?</Heading3>
        <p className="pb-4">Hanâ is a software engineer based in the Bay Area. BitBuddy is a nod to Hanâ's first exposure to tech: as an avid Neopets player growing up, they loved to tinker with the HTML on their profile.</p>
        <p>
          You can find Hanâ on
          {' '}
          <a
            href="https://github.com/hanazzz/"
            className="link hover:bg-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {' '}
          and
          {' '}
          <a
            href="https://www.linkedin.com/in/hanazait/"
            className="link hover:bg-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
        <ModalFooter>
          <ModalBtn modalID="about-modal">
            Close
          </ModalBtn>
        </ModalFooter>
      </ModalBox>
    </>
  );
}

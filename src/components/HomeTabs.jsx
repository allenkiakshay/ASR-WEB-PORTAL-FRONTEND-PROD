import styled from 'styled-components';

//? Secondary Navbar
const HomeTabs = ({ setTabSelected }) => {
  //? handle click on any nav item
  const handleClick = (e) => {
    document.querySelectorAll('.tabs').forEach((item) => {
      item.classList.remove('active');
    });
    const eleName = e.target.attributes.name.value;
    setTabSelected((p) => (p !== eleName ? eleName : p));
    e.target.classList.add('active');
  };

  return (
    <Container>
      <Tabs className='tabs active' name='transcript' onClick={handleClick}>
        Speech to Text
      </Tabs>
      <Tabs className='tabs' name='translation' onClick={handleClick}>
        Text to Text
      </Tabs>
      <Tabs className='tabs' name='TTS' onClick={handleClick}>
        Text to Speech
      </Tabs>
      <Tabs className='tabs' name='V2V' onClick={handleClick}>
        Video to Video
      </Tabs>
      <Tabs className='tabs' name='custom' onClick={handleClick}>
        Youtube Subtitle creation
      </Tabs>
    </Container>
  );
};

export default HomeTabs;

const Container = styled.nav`
  margin: 20px auto;
  border-radius: 10px;
  padding: 10px;
  display: grid;
  align-items: center;
  gap: 20px;
  background-color: var(--main-color);
  position: relative;
  @media (max-width: 800px) {
    width: 69%;
    grid-template-rows: 1fr;
  }
  @media (min-width: 801px) {
    width: 90%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const Tabs = styled.div`
  width: 85%;
  justify-self: center;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem;
  border-radius: 10px;
  transition: 0.5s;
  cursor: pointer;
  color: var(--doc-bg-color);
  position: relative;
  box-shadow: transparent 0px 0px 0px 0px inset;
  &.active {
    background-color: var(--tab-selected-bg-color);
    box-shadow: var(--home-tab-shadow);
    color: var(--main-color);
  }
`;

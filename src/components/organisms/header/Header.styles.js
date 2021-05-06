import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 3rem;
  position: sticky;
  top: 0;
  z-index: 2;

  @media only screen and (max-width: 1000px) {
    padding: 0.4rem 1rem;
  }
`;

export default StyledHeader;

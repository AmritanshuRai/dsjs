import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media (max-width: 1048px) {
    width: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

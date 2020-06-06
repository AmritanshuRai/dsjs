import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1048px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;

export const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 480px) {
    flex-direction: column;
    height: 100px;
  }
`;

export const ForgotPasswordContainer = styled.span`
  color: #1890ff;
  margin: 8px 0;
  cursor: pointer;
  letter-spacing: 0.5px;
`;

import styled from 'styled-components';

const StyledFormField = styled.label`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  position: relative;
  cursor: pointer;
  margin-bottom: 1rem;

  .error {
    color: ${({ theme }) => theme.colors.special};
    font-size: 0.9rem;
  }

  &.isRow {
    width: 45%;
  }

  &:last-of-type {
    margin-bottom: 1rem;
  }

  &.checkboxWrapper {
    flex-direction: row;
    align-items: center;
    margin-top: 0.5rem;
  }

  .label {
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 1rem;

    &.required::before {
      position: absolute;
      left: -1rem;
      top: 0;
      color: red;
      font-size: 1.2rem;
      font-weight: 900;
      content: '*';
      vertical-align: middle;
      margin-right: 0.5rem;
    }

    &.checkbox {
      margin-right: 2rem;

      &::after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        color: ${({ theme }) => theme.colors.text};
        content: '';
        display: block;
        height: 1.2rem;
        width: 1.2rem;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        border-radius: 0.4rem;
        box-shadow: 1px 1px 10px 1px rgba(41, 47, 54, 0.5);
        transition: all 0.2s ease-in-out;
      }
    }
  }

  input {
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-sizing: border-box;
    box-shadow: 1px 1px 10px 1px rgba(41, 47, 54, 0.5);
    border-radius: 0.4rem;
    margin: 0.5rem 0;

    font-size: 1rem;
    &.invalid {
      border: 1px solid ${({ theme }) => theme.colors.special};
    }

    &[type='checkbox'] {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 1.2rem;
      height: 1.2rem;
      opacity: 0;

      &:checked + span::after {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
        display: flex;
        justify-content: center;
        align-items: center;
        content: '✔';
      }
      &:focus + span::after {
        box-shadow: 1px 1px 10px 2px rgba(41, 47, 54, 0.75);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 1px 1px 10px 2px rgba(41, 47, 54, 0.75);
    }
  }
`;

export default StyledFormField;

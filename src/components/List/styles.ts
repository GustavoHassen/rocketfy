import styled from 'styled-components';

interface ContainerProps {
  isDone: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;
  opacity: ${props => (props.isDone ? 0.6 : 1)};

  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    h2 {
      font-weight: 500;
      padding: 0 10px;
      font-size: 16px;
    }

    button {
      height: 42px;
      width: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
    }
  }
  ul {
    margin-top: 30px;
  }
`;

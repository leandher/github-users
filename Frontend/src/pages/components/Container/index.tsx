import React from 'react';

import './styles.css';

interface ContainerProps {
  children: React.ReactElement;
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps): React.ReactElement => {
  return <div className="container">{children}</div>;
};

export default Container;

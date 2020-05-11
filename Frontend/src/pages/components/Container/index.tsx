import React from 'react';
import { FiGithub } from 'react-icons/fi';

import './styles.css';
import Spinner from '../Spinner';

interface ContainerProps {
  loading: boolean;
  headerText: string;
}

const Container: React.FC<ContainerProps> = ({
  headerText,
  loading,
  children,
}: React.PropsWithChildren<ContainerProps>): React.ReactElement => {
  return (
    <div className="container">
      <Spinner loading={loading} />
      <div className="header">
        <FiGithub size={100} />
        <div className="headerText">{headerText}</div>
      </div>
      {children}
    </div>
  );
};

export default Container;

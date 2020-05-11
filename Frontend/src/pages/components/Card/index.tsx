import React from 'react';

import './styles.css';

interface CardProps {}

const Card: React.FC = ({ children }:React.PropsWithChildren<CardProps>): React.ReactElement => {
  return <div className="card">{children}</div>;
};

export default Card;

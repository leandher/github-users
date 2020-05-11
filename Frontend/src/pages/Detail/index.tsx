import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { User } from '../../types/user';
import { Container } from '../components';

import './styles.css';

const Detail: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as User);
  const { login } = useParams();

  const getUserDetails = async () => {
    try {
      const response = await api.get(`/users/${login}/details`);
      const { data } = response;

      setUser(data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container loading={loading} headerText="User Details">
      {!loading && 
        <div className="details-container">
          <div className="image-container">
            <img src={user.avatar_url} alt="Avatar" />
          </div>
          <div className="information">
            <div className="title">
              <h2>#{user.id}</h2>
              <h2>{user.login}</h2>
            </div>
            <div className="description">
              <span>
                <strong>User since</strong>{' '}
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="go-back">
            <Link to="/home">
              <FiArrowLeft size={24} color="#000" />
            </Link>
          </div>
        </div>
      }
    </Container>
  );
};

export default Detail;

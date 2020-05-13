import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
// eslint-disable-next-line no-unused-vars
import { User, Repos } from '../../types/user';
import { Container, Table } from '../components';

import './styles.css';

const Detail: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [user, setUser] = useState({} as User);
  const [repos, setRepos] = useState([] as Repos[]);
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Url',
        accessor: 'html_url',
        // eslint-disable-next-line react/display-name
        Cell: ({value}: {value:string}) => <a target="_blank" href={value}>{value}</a>
      },
    ],
    []
  );

  const { login } = useParams();

  const getUserDetails = async () => {
    try {
      const response = await api.get(`/users/${login}/details`);
      const { data } = response;

      setUser(data || {} as User);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      getRepositories();
    }
  };

  const getRepositories = async () => {
    try {
      const response = await api.get(`/users/${login}/repos`);
      const { data } = response;

      setRepos(data || [] as Repos[]);
      setLoadingRepos(false);
    } catch (error) {
      toast.error(error?.message);
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container loading={loading} headerText="User Details">
      {!loading && (
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
      )}
      {!loadingRepos && (
        <div className="repos-container">
          <div className="title">
            <h1>Public Repositories</h1>
          </div>
          <Table data={repos} columns={columns} pagination={false} />
        </div>
      )}
    </Container>
  );
};

export default Detail;

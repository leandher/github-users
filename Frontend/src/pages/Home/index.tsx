import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';

import api from '../../services/api';
// eslint-disable-next-line no-unused-vars
import { User } from '../../types/user';
import { Container, Table } from '../components';

import './styles.css';

const Home: React.FC = (): React.ReactElement => {
  const [users, setUsers] = useState([] as User[]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([0]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Login',
        accessor: 'login',
      },
      {
        Header: 'Detail',
        accessor: (d) => d.login,
        Cell: (props) => renderButton(props),
      },
    ],
    []
  );

  const renderButton = ({ value }: { value: string }) => (
    <Link className="button" to={`/detail/${value}`}>
      <FiSearch size={15} />
    </Link>
  );

  const getUsers = async (page: number = 0) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get(`/users?since=${page}`);
      const { data, headers } = response;
      const nextPage = Number(headers['x-next-page']);
      const newPages = [...pages];

      if (newPages.indexOf(nextPage) === -1) {
        newPages.push(nextPage);
        setPages(newPages);
      }

      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const fetchData = ({ pageIndex }) => {
    if (pageIndex < pages.length) getUsers(pages[pageIndex]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container loading={loading} headerText="Users">
      <Table pagination columns={columns} data={users} fetchData={fetchData} />
    </Container>
  );
};

export default Home;

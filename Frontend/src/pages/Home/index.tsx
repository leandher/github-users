import React, { useMemo, useState, useEffect } from 'react';
import { Container, Table } from '../components';
import { toast } from 'react-toastify';

import api from '../../services/api';
import './styles.css';

const Home: React.FC = (): React.ReactElement => {
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
    ],
    []
  );

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([0]);

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
    console.log(pages, pages[pageIndex]);
    if (pageIndex < pages.length) getUsers(pages[pageIndex]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container loading={loading} headerText="Users">
      <Table columns={columns} data={users} fetchData={fetchData} />
    </Container>
  );
};

export default Home;

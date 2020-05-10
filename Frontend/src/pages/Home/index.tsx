import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Container, Table } from '../components';

import api from '../../services/api';
import './styles.css';

const Home: React.FC = (): React.ReactElement => {
  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Login',
      accessor: 'login',
    },
  ], []);

  const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(false)

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    console.log(pageSize, pageIndex)
  },[])

  const getUsers = async () => {
    const response = await api.get('/users')
    const { data } = response

    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  },[])

  return (
    <Container>
      <Table 
        columns={columns}
        data={users}
        fetchData={fetchData}
      />
    </Container>
  );
};

export default Home;

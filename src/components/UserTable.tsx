import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Input } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';

interface User {
  name: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  cell: string;
  picture: string;
}

const UserTable: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/manipulate/random-users`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.location.toLowerCase().includes(searchText.toLowerCase()) ||
      user.age.toString().includes(searchText) ||
      user.phone.includes(searchText) ||
      user.cell.includes(searchText)
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Umur',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Alamat',
      dataIndex: 'location',
      key: 'location',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'No. Telepon 1',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'No. Telepon 2',
        dataIndex: 'cell',
        key: 'cell',
      },
      {
        title: 'Gambar',
        dataIndex: 'picture',
        key: 'picture',
        render: (image: string) => {
           return <img src={image[0]} alt="user" style={{ width: 50, height: 50 }} />
        }
      },
  ];

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }
  return (
    <div>
      <Input
        placeholder="Filter berdasarkan nama, email, umur, alamat, no. telepon 1 atau no. telepon 2"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    </div>
  );
};

export default UserTable;

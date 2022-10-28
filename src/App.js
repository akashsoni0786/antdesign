import "antd/dist/antd.css";
import { Table } from "antd";
import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const onDelete = (key, e) => {
    e.preventDefault();
    setData(data.filter((item) => item.key !== key));
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <a
          onClick={(e) => {
            onDelete(record.key, e);
          }}
        >
          Delete
        </a>
      ),
    },
  ];

  React.useEffect(() => {
    const fetchfunc = () => {
      fetch("https://jsonplaceholder.typicode.com/users/")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          let temp = [];
          res.map((item, index) => {
            let row = {
              key: item.id,
              name: item.name,
              phone: item.phone,
              address:
                item.address.street +
                "," +
                item.address.city +
                "," +
                item.address.zipcode,
              description: "",
            };
            temp.push(row);
          });
          setData(temp);
        })
        .catch((err) => console.log(err));
    };
    fetchfunc();
  }, []);
  return <Table columns={columns} dataSource={data} />;
};
export default App;

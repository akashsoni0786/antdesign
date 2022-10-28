import "antd/dist/antd.css";
import { Table } from "antd";
import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const onDelete = (key, e, t) => {
    console.log(t);
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
        // onClick={(e) => {
        //   onDelete(record.key, e,text);
        // }}
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
              description: "Email : " + item.email,
            };
            temp.push(row);
          });
          setData(temp);
        })
        .catch((err) => console.log(err));
    };
    fetchfunc();
  }, []);
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
      onRow={(recored, rowIndex) => {
        return {
          onClick: (event) => {
            if(event.target.tagName==="A")
            data.splice(rowIndex,1);
            setData([...data])
            console.log(recored, rowIndex, event);
          },
        };
      }}
    />
  );
};
export default App;

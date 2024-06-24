import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const UserAccounts = () => {
  const [userAccounts, setUserAccounts] = useState(null);

  useEffect(() => {
    const userId = cookies.get('userId'); // Usamos cookies.get en lugar de universal_cookie__WEBPACK_IMPORTED_MODULE_3__.default.get
    if (userId) {
      fetch(`http://localhost:5000/users?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setUserAccounts(data[0].accounts);
          }
        })
        .catch(error => {
          console.error('Error fetching user accounts:', error);
        });
    }
  }, []);

  if (!userAccounts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">MIS CUENTAS</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Bank ID</th>
            <th scope="col">Bank Name</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {userAccounts.map((account, index) => (
            <tr key={index}>
              <td>{account.bankId}</td>
              <td>{account.bankName}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAccounts;

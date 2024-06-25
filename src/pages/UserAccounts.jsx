import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Accounts.css'
const UserAccounts = ({accounts}) => {
  
  if (!accounts) {
    return <div>Loading...</div>;
  }
  console.log(accounts);
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
        <tbody className='accounts-container'>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.bankId}</td>
              <td>{account.uuid}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAccounts;

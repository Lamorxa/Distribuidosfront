import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserAccounts = ({accounts}) => {
  
  if (!accounts) {
    return <div>Loading...</div>;
  }
  console.log(accounts);
  return (
    <div className="container">
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">Bank ID</th>
            <th scope="col">Bank Name</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody className='accounts-container'>
          {accounts.map((account, index) => (
            <tr key={index} className={account.balance<=0?"table-danger":""}>
              <td>{account.bankId}</td>
              <td>{account.uuid}</td>
              <td>S/. {Number.parseFloat(account.balance).toFixed(2)} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAccounts;

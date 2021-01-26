import React from 'react';
import { 
    Spin
} from 'antd';
import { useSelector } from 'react-redux';
import './Spinner.scss';

const Spinner = () => {
  const usersSpinner = useSelector(state => state.spinner.usersSpinner);

  return (
    <div className={"spinner-wrapper " + (usersSpinner ? "show-spinner" : "hide-spinner")}>
      <div className="spinner">
        <Spin />
      </div>
    </div>
  );

}


export default Spinner;

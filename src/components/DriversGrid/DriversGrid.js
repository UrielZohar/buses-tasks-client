import { useSelector, useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
import * as spinnerActions from '../../components/Spinner/SpinnerReducer';
import * as toasterActions from '../../utils/toasterActions';
import {
	Table
} from 'antd';
import * as rootActions from '../../reducers/RootReducer';
import './DriversGrid.scss';
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
  ];


const DriversGrid = () => {
  const dispatch = useDispatch();
  const setSelectedDriverId = useCallback((driverId) => {
    dispatch(rootActions.setSelectedDriverId(driverId));
  }, []);
  const drivers = useSelector(state => state.root.drivers);
  const selectedDriverId = useSelector(state => state.root.selectedDriverId);
  const selectedTaskId = useSelector(state => state.root.selectedTaskId);
  const assignTaskToDriver = useCallback((taskId, driverId) => {
    dispatch(spinnerActions.turnOnSpinner());
    dispatch(rootActions.assignTaskToDriver(taskId, driverId))
    .then((res) => {
        dispatch(spinnerActions.turnOffSpinner());
        if (res != 'error') {
          toasterActions.success();
          dispatch(rootActions.clearSelected());
        }
      });
  }, []);
  return (
    <div className="DriversGrid">
      <Table 
        columns={columns} 
        dataSource={drivers}
        pagination={false}
        rowClassName={(record, index) => 
          `driver-row ${record.id == selectedDriverId ? 'selected-row': ''}`
        }
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setSelectedDriverId(record.id);
              if (selectedTaskId) {
                assignTaskToDriver(selectedTaskId, record.id);
              }
            }
          };
        }}
      />
    </div>
  );
}

export default DriversGrid;


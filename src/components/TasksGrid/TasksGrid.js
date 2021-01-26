import { useSelector, useDispatch } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import * as spinnerActions from '../../components/Spinner/SpinnerReducer';
import * as toasterActions from '../../utils/toasterActions';
import {
	Table, Divider, Tag
} from 'antd';
import * as rootActions from '../../reducers/RootReducer';
import './TasksGrid.scss';


const columns = [
  {
    title: 'Driver',
    dataIndex: 'assignTo',
    key: 'assignTo',
    render: (text, row, index) => {
      if (!row.assignTo) {
        return (<span className='assign-cell'>+ Driver</span>);
      } else {
        return row.assignToName;
      }

    }
  },
  {
    title: 'Task Id',
    dataIndex: 'lineId',
    key: 'lineId',
    render: (text, row, index) => {
      return row.lineDisplayId;
    }
  },
  {
    title: 'Day 1',
    render: (text, record, index) => {
      return record.tasks[0].type
    }
  },
  {
    title: 'Day 2',
    render: (text, record, index) => {
      return record.tasks[1].type
    }
  },
  {
    title: 'Day 3',
    render: (text, record, index) => {
      return record.tasks[2].type
    }
  },
  {
    title: 'Day 4',
    render: (text, record, index) => {
      return record.tasks[3].type
    }
  },
  {
    title: 'Day 5',
    render: (text, record, index) => {
      return record.tasks[4].type
    }
  },
  {
    title: 'Day 6',
    render: (text, record, index) => {
      return record.tasks[5].type
    }
  },
  {
    title: 'Day 7',
    render: (text, record, index) => {
      return record.tasks[6].type
    }
  }
];

const TasksGrid = () => {
  const dispatch = useDispatch();
  const setSelectedTaskId = useCallback((taskId) => {
    dispatch(rootActions.setSelectedTaskId(taskId));
  });
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
  });
  const tasks = useSelector(state => state.root.tasks);
  const driversMap = useSelector(state => state.root.driversMap);
  const selectedTaskId = useSelector(state => state.root.selectedTaskId);
  const selectedDriverId = useSelector(state => state.root.selectedDriverId);

  return (
    <div className="TasksGrid">
      <Table 
        columns={columns} 
        dataSource={tasks}
        pagination={false}
        rowClassName={(record, index) => 
          `task-row ${record.lineId == selectedTaskId ? 'selected-row': ''}`
        }
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setSelectedTaskId(record.lineId)
              if (selectedDriverId) {
                assignTaskToDriver(record.lineId, selectedDriverId);
              }
            }
          };
        }}
      />
    </div>
  );
}

export default TasksGrid;

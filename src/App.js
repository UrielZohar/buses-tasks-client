import './App.css';
import DriversGrid from './components/DriversGrid/DriversGrid';
import TasksGrid from './components/TasksGrid/TasksGrid';
import Spinner from './components/Spinner/Spinner';
import * as spinnerActions from './components/Spinner/SpinnerReducer';
import * as rootActions from './reducers/RootReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  Layout,
  Row,
  Col,
  Switch
} from 'antd';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spinnerActions.turnOnSpinner());
    dispatch(rootActions.getAllData())
    .then(() => {
        dispatch(spinnerActions.turnOffSpinner());
      });
  }, []); 
  return (
    <div className="App">
      <Spinner></Spinner>
        <Row type="flex" style={{height: '100vh'}}>
          <Col 
            span={6} 
            style={{height: '100%', overflowY: 'scroll', borderRight: '2px solid'}}>
            <DriversGrid />
          </Col>
          <Col 
            span={18} 
            style={{height: '100%', overflowY: 'scroll', borderLeft: '2px solid'}}>
            <TasksGrid />
          </Col>
        </Row>
    </div>
  );
}

export default App;

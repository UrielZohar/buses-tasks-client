import axios from 'axios';
import APIManager from '../utils/APIManager';

const initialState = {
    drivers: [],
    driversMap: {},
    tasksMap: {},
    tasks: []
}

export const getAllData = () => dispatch => {
	return Promise.all([axios.get(APIManager.getDrivers), axios.get(APIManager.getTasks)])
		.then((resArr) => {
			const tasks = resArr[1].data;
			const drivers = resArr[0].data;
			const tasksMap = {};
			const driversMap = {};
			tasks.forEach(task => {
				tasksMap[task.lineId] = task;
			});
			drivers.forEach(driver => {
				driversMap[driver.id] = driver;
			});
			tasks.forEach(task => {
				if (task.assignTo) {
					task.assignToName = driversMap[task.assignTo].name
				}
			})
			dispatch({
				type: 'INIT_DATA',
				data: {
					drivers: drivers,
					tasks: tasks,
					tasksMap: tasksMap,
					driversMap: driversMap
				}
			})
		})
		.catch((err) => {
			window.alert("Error from server");
			return 'error';
		})
}

export const assignTaskToDriver = (taskId, driverId) => dispatch => {
	return axios.put(APIManager.assignTaskToDriver(taskId, driverId))
		.then(() => {
			dispatch({
				type: 'UPDATE_TASKS',
				data: {
					taskId,
					driverId
				}
			})
		})
		.catch(() => {
			window.alert("Error from server");
			return 'error';
		})
}

export const setSelectedDriverId = (selectedDriverId) => dispatch => dispatch({
	type: 'SET_SELECTED_DRIVER_ID',
	data: {
		selectedDriverId
	}
})

export const clearSelected = () => dispatch => dispatch({
	type: 'CLEAR_SELECTED',
})

export const setSelectedTaskId = (selectedTaskId) => dispatch => dispatch({
	type: 'SET_SELECTED_TASK_ID',
	data: {
		selectedTaskId
	}
})

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INIT_DATA': {
			return {
				...state,
				drivers: action.data.drivers,
				tasks: action.data.tasks,
				tasksMap: action.data.tasksMap,
				driversMap: action.data.driversMap
			}
		}

		case 'UPDATE_TASKS': {
			const newTasksMap = {
				...state.tasksMap
			};
			newTasksMap[action.data.taskId].assignTo = action.data.driverId;
			newTasksMap[action.data.taskId].assignToName = state.driversMap[action.data.driverId].name;
			return {
				...state,
				tasksMap: newTasksMap,
				tasks: [...state.tasks]
			}
		}

		case 'CLEAR_SELECTED': {
			return {
				...state,
				selectedDriverId: null,
				selectedTaskId: null,
			}
		}

		case 'SET_SELECTED_DRIVER_ID': {
			return {
				...state,
				selectedDriverId: action.data.selectedDriverId
			}
		}

		case 'SET_SELECTED_TASK_ID': {
			return {
				...state,
				selectedTaskId: action.data.selectedTaskId
			}
		}
        
		default: {
			return state;
		}
	}
}

export default reducer;
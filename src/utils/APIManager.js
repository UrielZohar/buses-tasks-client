
class APIManager {
    static ROOT = 'http://localhost:8080';

    static get getDrivers() {
      return `${APIManager.ROOT}/drivers`;
    }

    static get getTasks() {
      return `${APIManager.ROOT}/tasks`;
    }
     
    

    static assignTaskToDriver(taskId, driverId) {
      return `${APIManager.ROOT}/tasks/${taskId}/assign?driverId=${driverId}`;
    }
  }
  
  export default APIManager;
  
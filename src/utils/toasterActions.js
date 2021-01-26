import { notification } from 'antd'

export const success = () => {
  notification.success({
    message: `Assigment succeeded`,
    placement: 'bottomRight'
  });
}
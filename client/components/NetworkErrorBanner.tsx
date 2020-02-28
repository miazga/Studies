import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Banner } from 'react-native-paper';

import { axios } from '../axios';

const NetworkErrorBanner = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const handleAxiosErrors = () => {
    axios.interceptors.request.use(
      response => {
        return response;
      },
      error => {
        setVisible(true);
        setMessage(error.message);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        setVisible(true);
        setMessage(error.message);
        return Promise.reject(error);
      }
    );
  };

  React.useEffect(() => {
    handleAxiosErrors();
  });

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Ok',
          onPress: () => setVisible(false),
        },
      ]}
      icon={props => <Feather {...props} name="wifi-off" />}>
      {`There was a problem with internet connection:\n ${message}`}
    </Banner>
  );
};

export default NetworkErrorBanner;

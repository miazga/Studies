import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Banner } from 'react-native-paper';

import { axios } from '../../axios';

const NetworkErrorBanner = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');

  const interceptor = React.useRef(
    axios.interceptors.response.use(
      response => {
        setBody(response.data);
        return response;
      },
      error => {
        setVisible(true);
        setMessage(error.message);
        return Promise.reject(error);
      }
    )
  );

  React.useEffect(() => {
    return () => {
      axios.interceptors.response.eject(interceptor.current);
    };
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
      {`${message}\n${body}`}
    </Banner>
  );
};

export default NetworkErrorBanner;

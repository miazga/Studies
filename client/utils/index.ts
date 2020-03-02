import { AsyncStorage } from 'react-native';

const paginationKey = 'pageSize';

export const getPageSize = async () => {
  const result = await AsyncStorage.getItem(paginationKey);
  if (result) return +result;
  return 5;
};

export const setPageSize = (pageSize: number) =>
  AsyncStorage.setItem(paginationKey, pageSize.toString());

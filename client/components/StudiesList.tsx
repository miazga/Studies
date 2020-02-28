import * as React from 'react';
import { List } from 'react-native-paper';

import { getStudies } from '../data';
import { Study } from '../data/models/Study';
import StudiesListItem from './StudiesListItem';

const StudiesList = () => {
  const [items, setItems] = React.useState<Study[]>([]);
  //todo handle pagination
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getStudies({ page });
    setItems(result.items);
  };

  return (
    <List.Section title="Studies">
      {items.map(item => (
        <StudiesListItem key={item.created} study={item} onEditSubmit={loadData} />
      ))}
    </List.Section>
  );
};

export default StudiesList;

import { Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

const ListItem = ({ title, subtitle, poster, onPress, onLongPress }) => (
  <Pressable onPress={onPress} onLongPress={onLongPress}>
    <Card.Title
      title={title}
      subtitle={subtitle}
      left={(props) => (
        <Avatar.Image
          {...props}
          source={{ uri: poster }}
        />
      )}
    />
  </Pressable>
);

export default ListItem;
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [
        {index: 1, title: '原稿を書く', done: false},
        {index: 2, title: '犬の散歩をする', done: false},
      ],
      currentIndex: 2,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <Text>Filterがここに配置されます</Text>
        </View>
        <ScrollView style={styles.todolist}>
          <FlatList
            data={this.state.todo}
            renderItem={({item}) => <Text>{item.title}</Text>}
            keyExtractor={(item, index) => 'todo_' + item.index}
          />
        </ScrollView>
        <View style={styles.input}>
          <Text>テキスト入力がここに配置されます</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  filter: {
    paddingTop: 20,
    height: 50,
  },
  todolist: {
    flex: 1,
  },
  input: {
    height: 50,
  },
});

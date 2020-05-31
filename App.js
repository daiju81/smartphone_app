import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

// 実行するOSによってpaddingTopの値を調整
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const TODO_KEY = '@todoapp.todo';

// TODO表示用クラス
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      currentIndex: 0,
      inputText: '',
    };
  }

  componentDidMount() {
    this.fetchLocalStorageTodo();
  }

  fetchLocalStorageTodo = async () => {
    try {
      const todoString = await AsyncStorage.getItem(TODO_KEY);
      console.log(`todo文字列 ${todoString}`);
      if (todoString) {
        const todo = JSON.parse(todoString);
        const currentIndex = todo.length;
        this.setState({todo, currentIndex});
      }
    } catch (e) {
      console.log(e);
    }
  };

  storeLocalStorageTodoJson = async (todo) => {
    try {
      const todoString = JSON.stringify(todo);
      await AsyncStorage.setItem(TODO_KEY, todoString);
    } catch (e) {
      console.log(e);
    }
  };

  onAddItem = () => {
    const title = this.state.inputText;
    if (title === '') {
      return;
    }
    const index = this.state.currentIndex + 1;
    const newTodo = {index, title, done: false};
    const todo = [...this.state.todo, newTodo];
    this.setState({
      todo,
      currentIndex: index,
      inputText: '',
    });
    this.storeLocalStorageTodoJson(todo);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
          <TextInput
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
            placeholder="todo名"
            style={styles.inputText}
          />
          <Button
            onPress={this.onAddItem}
            title="Add"
            style={styles.inputButton}
          />
        </View>
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
  },
  inputText: {
    flex: 1,
  },
  inputButton: {
    width: 100,
    color: '#841584',
  },
});

import React from 'react';
import FilterTodo from './FilterTodo.js';
import {styles} from './Styles.js';
import {
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
  TouchableOpacity,
} from 'react-native';

const TODO_KEY = '@todoapp.todo';

const TodoItem = (props) => {
  let textStyle = styles.TodoItem;
  if (props.done === true) {
    textStyle = styles.todoItemDone;
  }
  return (
    <TouchableOpacity onPress={props.onTapTodoItem}>
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

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
      filterText: '',
    });
    this.storeLocalStorageTodoJson(todo);
  };

  onTapTodoItem = (todoItem) => {
    const todo = this.state.todo;
    const index = todo.indexOf(todoItem);
    todoItem.done = !todoItem.done;
    todo[index] = todoItem;
    this.setState({todo});
    this.saveTodo(todo);
  };

  setFilterText = (filterTextValue) => {
    this.setState({filterText: filterTextValue});
  };

  // HACK: コンポーネント分割するべき?
  render() {
    const filterText = this.state.filterText;
    let todo = this.state.todo;
    if (filterText !== '') {
      todo = todo.filter((todoItem) => todoItem.title.includes(filterText));
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <FilterTodo
          stylesFilter={styles.filter}
          stylesInputText={styles.inputText}
          ChangeText={this.setFilterText}
          value={this.state.filterText}
        />
        <ScrollView style={styles.todolist}>
          {/* NOTE: extraDataはsetStateした時に再描画されるようにするもの */}
          <FlatList
            data={todo}
            extraData={this.state}
            renderItem={({item}) => (
              <TodoItem
                title={item.title}
                done={item.done}
                onTapTodoItem={() => this.onTapTodoItem}
              />
            )}
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

// class FilterTodo extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <View style={styles.filter}>
//           <TextInput
//             onChangeText={(text) => this.props.ChangeText(text)}
//             value={this.props.value}
//             style={styles.inputText}
//             placeholder="Type filter text"
//           />
//         </View>
//       </React.Fragment>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: STATUSBAR_HEIGHT,
//   },
//   filter: {
//     paddingTop: 20,
//     height: 50,
//   },
//   todolist: {
//     flex: 1,
//   },
//   input: {
//     height: 50,
//     flexDirection: 'row',
//   },
//   inputText: {
//     flex: 1,
//   },
//   inputButton: {
//     width: 100,
//     color: '#841584',
//   },
// });

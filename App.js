import React from 'react';
import FilterTodo from './FilterTodo.js';
import InputTextComponent from './InputTextComponent.js';
import TodoLists from './TodoLists.js';
import {styles} from './Styles.js';
import {
  Text,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

// localStorage保存用のkey
const TODO_KEY = '@todoapp.todo';

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

  setChangeText = (text) => this.setState({inputText: text});

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
          <TodoLists
            dataArg={todo}
            extraDataArg={this.state}
            onTapTodoItemArg={this.onTapTodoItem}
            stylesArg={styles}
          />
          {/* NOTE: extraDataはsetStateした時に再描画されるようにするもの */}
          {/* <FlatList
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
          /> */}
        </ScrollView>
        <InputTextComponent
          styles={styles}
          inputText={this.state.inputText}
          setChangeText={this.setChangeText}
          onAddItem={this.onAddItem}
        />
      </KeyboardAvoidingView>
    );
  }
}

import React from 'react';
import {FlatList, TouchableOpacity, Text} from 'react-native';

const TodoItem = (props) => {
  let textStyle = props.stylesArg.TodoItem;
  if (props.done === true) {
    textStyle = props.stylesArg.todoItemDone;
  }
  return (
    <TouchableOpacity onPress={props.onTapTodoItem}>
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default class FilterTodo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FlatList
        data={this.props.dataArg}
        extraData={this.props.extraDataArg}
        renderItem={({item}) => (
          <TodoItem
            stylesArg={this.props.stylesArg}
            title={item.title}
            done={item.done}
            onTapTodoItem={() => this.props.onTapTodoItemArg}
          />
        )}
        keyExtractor={(item, index) => 'todo_' + item.index}
      />
    );
  }
}

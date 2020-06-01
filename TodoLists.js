import React from 'react';
import {FlatList, TodoItem} from 'react-native';

export default class FilterTodo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props.extraData}
        renderItem={({item}) => (
          <TodoItem
            title={item.title}
            done={item.done}
            onTapTodoItem={() => this.onTapTodoItem}
          />
        )}
        keyExtractor={(item, index) => 'todo_' + item.index}
      />
    );
  }
}

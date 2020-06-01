import React from 'react';
import {View, TextInput} from 'react-native';

export default class FilterTodo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <View style={this.props.stylesFilter}>
          <TextInput
            onChangeText={(text) => this.props.ChangeText(text)}
            value={this.props.value}
            style={this.props.stylesInputText}
            placeholder="Type filter text"
          />
        </View>
      </React.Fragment>
    );
  }
}

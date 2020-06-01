import React from 'react';
import {View, TextInput, Button} from 'react-native';

export default class InputTextComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={this.props.styles.input}>
        <TextInput
          onChangeText={(text) => this.props.setChangeText(text)}
          value={this.props.inputText}
          placeholder="todo名"
          style={this.props.styles.inputText}
        />
        <Button
          onPress={this.props.onAddItem}
          title="Add"
          style={this.props.styles.inputButton}
        />
      </View>
    );
  }
}

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <Text>Filterがここに配置されます</Text>
        </View>
        <ScrollView>
          <Text>Todoリスト</Text>
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

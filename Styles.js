import {StyleSheet, Platform, StatusBar} from 'react-native';

// 実行するOSによってpaddingTopの値を調整
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const styles = StyleSheet.create({
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

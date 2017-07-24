/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Notes from './app/components/Notes';

export default class todo extends Component {
  constructor(props ) {
    super(props);
    this.state = {
      notesArray: [],
      noteText: '',
    };
  }

  addNote(note) {
    let newNote = {
      'date': moment().format('DD/MM/YYYY'),
      'note': note,
    }

    this.state.notesArray.push(newNote);

    this.setState({
      notesArray: this.state.notesArray
    });
    this.setState({
      noteText: ''
    });
  }

  deleteNote(key) {
    this.state.notesArray.splice(key, 1);
    this.setState({
      notesArray: this.state.notesArray,
    })
  }

  render() {
    let notes = this.state.notesArray.map((val, key) => {
      return <Notes key={key} keyval={key} val={val} deleteNote={ () => this.deleteNote(key) } />
    })

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>NOTER</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>

        <View style={styles.footer}>

          <TouchableOpacity style={styles.addButton} onPress={() => this.addNote(this.state.noteText)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

          <TextInput
           style={styles.noteInput}
           placeholder="Add a Todo"
           placeholderTextColor='white'
           underlineColorAndroid='transparent'
           onChangeText={(text) => this.setState({noteText: text})}
           value={this.state.noteText}
          >
          </TextInput>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    marginBottom: -45,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  noteInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    paddingTop: 46,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
});

AppRegistry.registerComponent('todo', () => todo);

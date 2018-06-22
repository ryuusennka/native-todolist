import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native"

import moment from "moment"
import axios from "axios"
import Note from "./Note"
import { notesAPI } from "../config/mockAPI.js"

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.handleMethod = this.handleMethod.bind(this);
  }

  componentWillMount() {
    axios({
      url: `${notesAPI}/notes`,
      method: "get"
    }).then(
      r => {
        const data = r.data.sort(sortById);
        this.setState({
          noteArray: data
        })
      }
    ).catch(
      e => {
        throw e;
      }
    )
  }
  render() {
    let notes = this.state.noteArray.map((val, key) =>
      <Note
        key={key}
        keyval={val}
        val={val}
        deleteMethod={() => this.deleteNote(key)}
      ></Note>
    );
    return (
      <KeyboardAvoidingView style={styles.AvoidingView} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={styles.header}>
            <View><Text style={styles.headerText}>- NOTER -</Text></View>
          </View>
          <ScrollView style={styles.scrollContainer}>
            {this.state.noteArray.map((item) => <Note {...item} keyval={item.id} key={item.id} handleMethod={this.handleMethod}></Note>)}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              style={styles.textInput}
              placeholder="note"
              placeholderTextColor="#999"
              onChangeText={text => this.handleChange(text)}
              value={this.state.noteText}
            >
            </TextInput>
          </View>
          <TouchableOpacity style={styles.addButton}
            onPress={this.addNote}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  // method
  handleChange(Text) {
    this.setState({
      noteText: Text
    });
  }
  addNote() {
    if (!this.state.noteText) return;

    const note = {
      date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      note: this.state.noteText
    }
    axios({
      url: `${notesAPI}/notes`,
      method: "post",
      data: note
    }).then(
      r => {
        this.setState({
          noteArray: [
            r.data, ...this.state.noteArray
          ]
        });
      }
    )
    this.setState({
      noteText: ""
    })
  }
  handleMethod(keyval) {
    axios({
      url: `${notesAPI}/notes/${keyval}`,
      method: "delete"
    }).then(
      r => {
        const noteArray = this.state.noteArray.filter(item => {
          return item.id !== r.data.id;
        })
        this.setState({
          noteArray
        })
      }
    ).catch(
      e => {
        throw e
      }
    )
  }
  // auto-slide scroll view
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#09f',
  },
  header: {
    backgroundColor: "#e91e63",
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#ddd"
  },
  headerText: {
    color: "#fff"
  },
  scrollContainer: {
    flex: 1,
  },
  footer: {
    height: 44,
    backgroundColor: "#efeff5"
  },
  textInput: {
    alignSelf: "stretch", // ?
    color: "#fff",
    height: 44,
    paddingLeft: 10,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed"
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: "#e91e63",
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 8, // ?
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  AvoidingView: {
    flex: 1,
  }
});

function sortById(p, n) {
  return p.id < n.id;
}
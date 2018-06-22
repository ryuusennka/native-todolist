import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native"

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    return (
      <View style={styles.note}>
        <View style={styles.box}>
          <Text style={styles.noteText}>{this.props.date}</Text>
          <Text style={styles.noteText}>{this.props.note}</Text>
        </View>
        <TouchableOpacity style={styles.noteDelete} onPress={() => this.handleDelete(this.props.keyval)}>
          <Text style={styles.noteDeleteText}>D</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //
  handleDelete(keyval) {
    this.props.handleMethod(keyval);
  }
}

const styles = StyleSheet.create({
  box: {
    borderLeftWidth: 10,
    borderLeftColor: "#e91e63"
  },
  note: {
    position: "relative",
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: "#ededed"
  },
  noteText: {
    paddingLeft: 20,

  },
  noteDelete: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e980b9",
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
  },
  noteDeleteText: {
    color: "#fff"
  },
})
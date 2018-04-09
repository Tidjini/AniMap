/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions
} from "react-native";
import MapView from "react-native-map";

import state from "./data/states";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class App extends Component<Props> {
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  render() {
    const { container } = styles;
    // NOTE: map => (this.map = map) is ref so we can animate the map later (when region changes)
    return (
      <MapView
        ref={map => (this.map = map)}
        initialRegion={this.state.region}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

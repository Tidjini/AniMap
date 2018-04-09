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

export default class App extends Component {
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  renderMarkers() {
    const { markerWrap, ring, marker } = styles;
    this.state.markers.map((marker, index) => {
      return (
        <MapView.Marker key={index} coordinate={marker.coordinate}>
          <Animated.View style={[styles.markerWrap]}>
            <Animated.View style={[styles.ring]} />
            <View style={styles.marker} />
          </Animated.View>
        </MapView.Marker>
      );
    });
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
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});

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
    // NOTE: this custom Marker for the map cause we add some children, if not the map render the default marker
    this.state.markers.map((marker, index) => {
      return (
        <MapView.Marker key={index} coordinate={marker.coordinate}>
          <Animated.View style={[markerWrap]}>
            <Animated.View style={[ring]} />
            <View style={marker} />
          </Animated.View>
        </MapView.Marker>
      );
    });
  }
  renderCards() {
    const { card, cardImage, textContent, cardtitle, cardDescription } = styles;
    this.state.markers.map((marker, index) => {
      return (
        <View style={card} key={index}>
          <Image source={marker.image} style={cardImage} resizeMode="cover" />
          <View style={textContent}>
            <Text numberOfLines={1} style={cardtitle}>
              {marker.title}
            </Text>
            <Text numberOfLines={1} style={cardDescription}>
              {marker.description}
            </Text>
          </View>
        </View>
      );
    });
  }
  renderCardsScroll() {
    const { scrollView, endPadding } = styles;

    return (
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation
                }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        style={scrollView}
        contentContainerStyle={endPadding}
      >
        {this.renderCards()}
      </Animated.ScrollView>
    );
  }
  render() {
    const { container } = styles;
    // NOTE: map => (this.map = map) is ref so we can animate the map later (when region changes)
    return (
      <View style={container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={container}
        >
          {this.renderMarkers()}
        </MapView>
        {this.renderCardsScroll()}
      </View>
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
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },

  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  }
});

import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default class Button extends React.Component {
  render() {
    const { button } = this.props;
    if (button.double) {
      return (
        <TouchableOpacity
          activeOpacity={0.75}
          style={{ ...styles.button, ...styles.doubleButton }}
          onPress={this.props.onTouch}
        >
          <Text style={styles.buttonText}>{button.label}</Text>
        </TouchableOpacity>
      );
    } else if (button.operation) {
      return (
        <TouchableOpacity
          activeOpacity={0.75}
          style={{ ...styles.button, ...styles.operationButton }}
          onPress={this.props.onTouch}
        >
          <Text
            style={{
              ...styles.buttonText,
              ...styles.operationButtonText
            }}
          >
            {button.label}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.button}
        onPress={this.props.onTouch}
      >
        <Text style={styles.buttonText}>{button.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    width: "25%",
    height: "20%",
    backgroundColor: "rgb(192, 199, 202)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "black",
    fontSize: 22,
    width: "100%",
    textAlign: "center"
  },
  doubleButton: {
    width: "50%"
  },
  operationButton: {
    backgroundColor: "rgb(220, 123, 10)"
  },
  operationButtonText: {
    color: "white"
  }
};

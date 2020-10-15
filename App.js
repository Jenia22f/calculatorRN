import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import Button from "./button";
import {initializeAppsFlyer} from "./data";
import appsFlyer from "react-native-appsflyer";

export default class App extends Component {


  constructor(props) {
    super(props);

     appsFlyer.onInstallConversionData(
            (res) => {

                if (JSON.parse(res.data.is_first_launch) === true) {
                    if (res.data.af_status === 'Non-organic') {
                        var media_source = res.data.media_source;
                        var campaign = res.data.campaign;
                        console.log('This is first launch and a Non-Organic install. Media source: ' + media_source + ' Campaign: ' + campaign);
                    } else if (res.data.af_status === 'Organic') {
                        console.log('This is first launch and a Organic Install');
                    }
                } else {
                    console.log('This is not first launch');
                }
            }
        );
        let options = {
            devKey: '6tg9v7APozsR3Z7GENoDeE' };
        appsFlyer.initSdk(options)

    this.state = {
      value: 0,
      buttons: [
        {
          label: "C"
        },
        {
          label: "+/-"
        },
        {
          label: "←"
        },
        {
          label: "÷",
          operation: true
        },
        {
          label: "7"
        },
        {
          label: "8"
        },
        {
          label: "9"
        },
        {
          label: "x",
          operation: true
        },
        {
          label: "4"
        },
        {
          label: "5"
        },
        {
          label: "6"
        },
        {
          label: "-",
          operation: true
        },
        {
          label: "1"
        },
        {
          label: "2"
        },
        {
          label: "3"
        },
        {
          label: "+",
          operation: true
        },
        {
          label: "0",
          double: true
        },
        {
          label: "."
        },
        {
          label: "=",
          operation: true
        }
      ],
      operation: ""
    };

    this.onTouchButton = this.onTouchButton.bind(this);
  }

  onTouchButton(button) {
    if (
      parseInt(button.label) > -1 ||
      (button.operation && ["C", "+/-", "←", "="].indexOf(button.label) < 0) ||
      button.label === "."
    ) {
      this.setState({ operation: `${this.state.operation}${button.label}` });
    }

    if (button.label === "=") {
      try {
        let { operation } = this.state;

        operation = operation.replace("÷", "/");
        operation = operation.replace("x", "*");

        const conc = eval(operation);
        this.setState({ operation: `${conc}` });
      } catch (e) {
        alert("Unexpected Operation!");
        this.setState({ operation: "" });
      }
    }

    if (button.label === "+/-") {
      this.setState({ operation: `(${this.state.operation})x-1` });
    }

    if (button.label === "C") {
      this.setState({ operation: "" });
    }

    if (button.label === "←") {
      this.setState({
        operation: this.state.operation.substr(
          0,
          this.state.operation.length - 1
        )
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textField}>
          <Text style={styles.textInput} adjustsFontSizeToFit={true}>
            {this.state.operation}
          </Text>
        </View>
        <View style={styles.buttonsField}>
          {this.state.buttons.map((button, index) => (
            <Button
              onTouch={() => this.onTouchButton(button)}
              button={button}
              key={index}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  textField: {
    flex: 1,
    backgroundColor: "#333333",
    width: "100%",
    display: "flex"
  },
  buttonsField: {
    flex: 4,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "black"
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 50,
    color: "white",
    marginLeft: "10%",
    marginRight: "10%",
    textAlign: "right"
  }
};

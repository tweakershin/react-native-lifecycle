import React from "react";
import { Text, View, Button } from "react-native";

class Child1 extends React.Component {
  static defaultProps = {
    id: "1",
    name: "oldChild"
  };

  constructor(props) {
    super(props);
    console.log("Child1 - constructor");
    this.state = {
      id: this.props.id,
      name: this.props.name,
      shouldUpdate: true
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      `Child1 - getDerivedStateFromProps// (${nextProps}, ${prevState})`
    );
    if (nextProps.name !== prevState.name) {
      return { name: nextProps.name };
    }
    return null;
  }

  componentDidMount() {
    console.log("Child1 - ComponentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 성늘 최적화에 아주 중요 (rendering 비용이 가장 비쌈)
    console.log("Child1- shouldComponentUpdate");
    return nextState.shouldUpdate;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("Child1- getSnapshotBeforeUpdate");
    return this.state.name;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Child1- componentDidUpdate");
    if (snapshot) {
      console.log(`snapshot - ${this.state.name}`);
    }
    console.log("----------------");
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 40 }}>
          {this.state.id} - {this.state.name}
        </Text>
        <Text>Force Update를 할 경우 shouldComponentUpdate무시</Text>
        <Button title={"force update"} onPress={() => this.forceUpdate()} />
      </View>
    );
  }

  ComponentWillUnmount() {
    console.log("Child1- componentDidUpdate");
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldName: "oldChild",
      newName: "newChild",
      now: "oldChild"
    };
  }

  changeChildProps = () => {
    if (this.state.now == this.state.oldName) {
      this.setState({ now: this.state.newName });
    } else {
      this.setState({ now: this.state.oldName });
    }
  };

  render() {
    return (
      <View style={{ marginTop: 500 }}>
        <Child1 name={this.state.now}></Child1>
        <Button onPress={this.changeChildProps} title={"props 변경"} />
      </View>
    );
  }
}

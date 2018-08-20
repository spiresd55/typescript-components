import {Component} from "../../Component";

export class TestComponent extends Component {
  template = `test`;
  selector = `test`;

  connectedCallback() {
    console.log("Calling Connected Callback function");
  }

  render() {
    console.log("Calling Render Function");
  }
}

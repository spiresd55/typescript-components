import {Component} from "../../Component";

export class TestComponent extends Component {
  template: string = `<p>test component</p>`;

  constructor() {
    super();

    //const shadowRoot = this.attachShadow({mode: 'open'});
    //shadowRoot.innerHTML = "<h1>TEST COMPONENT</h1>";

    //setTimeout(() => {
    //  shadowRoot.innerHTML = "new value";
    //}, 5000);
  }

  connectedCallback() {
    console.log("Calling Connected Callback function");
  }

  render(): void {
    console.log("Calling Render Function");
  }
}

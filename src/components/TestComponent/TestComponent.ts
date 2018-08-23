//import {Component} from "../../Component";
import {CustomElement} from "../../ComponentDecorator";

@CustomElement({
  selector: 'test-component',
  template: '<p>Test Component is here </p>',
  useShadow: true
})
export class TestComponent extends HTMLElement {
  template: string = `<p>test component</p>`;

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Calling Connected Callback function");
  }
}

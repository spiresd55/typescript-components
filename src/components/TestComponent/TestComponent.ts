//import {Component} from "../../Component";
import {CustomComponent, ComponentAttribute} from "../../ComponentDecorator";
//import ko from 'ko';

import * as ko from "knockout";
//import * as ko from 'ko';

@CustomComponent({
  selector: 'test-component',
  template: `<p>Test Component is here <span data-bind="text: test"></span> </p>`,
  model: {
    test: ko.observable('test')
  }
})
export class TestComponent extends HTMLElement {
  template: string = `<p>test component <span></span></p>`;

  @ComponentAttribute
  data: string;

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Calling Connected Callback function");
    console.log("HERE IS THE MODEL");
    console.log((this as any).model);
    console.log(this.data);
    this.data = "12345678";
    //console.log((this as any).getData());
    console.log(this);
  }
}

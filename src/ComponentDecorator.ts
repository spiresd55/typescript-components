import * as ko from "knockout";

interface CustomComponentConfig {
  selector: string;
  template: string;
  style?: string;
  useShadow?: boolean;
  model?: any;
}

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const WatchAttribute = (name: any, handler: any) => {
  return (target: any) => {
    console.log(target);
    console.log(this);
    //Attribute Changed Callback(Called when custom element attr is changed)
    let attributeChangedCallback = target.prototype.attributeChangedCallback || function(){};
    let callback = (typeof handler === 'function') ? handler : target.prototype[handler];

    if(!callback) {
      throw new Error(`${handler} does not exist on ${name}`);
    }

    target.prototype.attributeChangedCallback = function(attr: any, oldValue: any, newValue: any) {
      console.log("ATTRIBUTE CHANGED");
      console.log(name);
      console.log(attr);
      if(name == attr) {
        callback.call(this, oldValue, newValue);
      }

      attributeChangedCallback.call(this, attr, oldValue, newValue);
    }
  }
}

export const ComponentAttribute = function (target: any, property: string): any {
  let val: any;
  return{
    set: function (value: any) {
      return this.setAttribute(property, value);
    },
    get: function() {
      return this.getAttribute(property);
    },
    enumerable: true,
    configurable: true
  }
}

export const KnockoutAttribute = function(target: any, property: string): any {
  let val: any;
  console.log(target);
  console.log(this);
  return {
    set: function(value: any) {
      if (!this.model) {
        throw new Error("No knockout model defined");
      };
      if (!this.model[property]) {
        throw new Error(`CustomComponent requires ${property} propery in model metadata`);
      }
      //TODO: HANDLE ARRAYS AND FUNCTIONS
      this.model[property](value);
      return this.setAttribute(property, value);
    },
    get: function() {
      return this.getAttribute(property);
    },
    enumerable: true,
    configurable: true
  }
}

export const CustomComponent = (config: CustomComponentConfig) => (cls: any) => {
  validateSelector(config.selector);

  console.log("Custom Component");
  console.log(cls.template);
  console.log(cls);
  console.log(this);
  if(!config.template) {
    throw new Error("You need to pass a template for the element");
  }

  const template = document.createElement('template');
  if(config.style) {
    config.template = `<style>${config.style}</style> ${config.template}`;
  }
  template.innerHTML = config.template;

  const connectedCallback = cls.prototype.connectedCallback || function () {};
  cls.prototype.connectedCallback = function() {
      const clone = document.importNode(template.content, true);
      if (config.useShadow) {
          this.attachShadow({mode: 'open'}).appendChild(clone);
      } else {
          this.appendChild(clone);
          if(config.model) {
              ko.applyBindings(config.model, this);
              this.model = config.model;
          }
      }
      connectedCallback.call(this);
  };

  //TODO: Create a way to attach to shadowdom

  //Register the custom element
  window.customElements.define(config.selector, cls)
}

//TODO: Write event binding decorator
export const EventBinding = () => (cls: any) => {

}

//TODO: Write event listener decorator
export const Listen = () => () => {

}

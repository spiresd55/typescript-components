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

export const CustomComponent = function(config: CustomComponentConfig) {
  console.log("first chain");
  console.log(this);
  return function (cls: any) {
    validateSelector(config.selector);

    console.log("Custom Component");
    //console.log(cls.template);
    //console.log(cls);
    console.log(cls.testFunction);
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
                cls.prototype.model = config.model;
            }
        }
        connectedCallback.call(this);
    };

    //TODO: Create a way to attach to shadowdom

    //Register the custom element
    window.customElements.define(config.selector, cls)
  }
}

//}

//TODO: Write event binding decorator
export const Event = function(cls: any, property: string, descriptor: any) {
  console.log("Here is the event binding");
  console.log(cls);
  console.log(property);
  console.log(descriptor);
  console.log(this);

  const originalEvent = descriptor.value;
  if(typeof originalEvent !== 'function') {
    throw new Error("Event descriptor requires function type");
  }

  descriptor.value = function(...args: any[]) {
    //https://gomakethings.com/custom-events-with-vanilla-javascript/
    console.log("Calling event function");
    console.log(this);

    //Creating custom event
    //let data = {data: [...args]};
    let data: any = {};
    for(let k in args) {
      data[k] = args[k];
    }

    console.log("HERE IS THE DATA");
    console.log(data);

    let event = new CustomEvent(property, {detail: data});

    console.log("Here are the args");
    console.log(...args);

    //Dispatch the custom event
    this.dispatchEvent(event);
  }
}

//TODO: Write event listener decorator
export const Listen = function(eventConfig: any) {
  console.log("first");
  console.log(this);
  return function(target: any, property: string, descriptor: any) {
    console.log("Listening for event")
    console.log(target.element);
    console.log(eventConfig);
    console.log(property);
    console.log(descriptor);

    window.onload = () => {
      document.querySelector(eventConfig.selector)
      .addEventListener(eventConfig.event, descriptor.value, true);
    }

    //target['on' + eventConfig.event]
    //target.register
    //(function() {
    console.log('doe it have?');
    console.log(target.currentTarget);
    console.log(target.dispatch);
    console.log(this);
    //})()
  }
}

export const Listen2 = function(eventConfig: any) {
  return function decorator(target: any, property: string, descriptor: any) {
    // Tap into the original function
    const originalFunc = descriptor.value || function () {};
    if(typeof originalFunc === 'function') {
      console.log("TARGET");
      console.log(target);
      console.log(target.listeners);
      console.log(target.listeners);
      target.listeners = target.listeners ? target.listeners: [];
      target.listeners.push(Math.random());
      descriptor.value = function() {
          if(!eventConfig.inShadow) {
            document.querySelector(eventConfig.selector)
            .addEventListener(eventConfig.event, originalFunc, true);
          } else if(eventConfig.inShadow && this.shadowRoot) {
              this.shadowRoot.querySelector(eventConfig.selector)
              .addEventListener(eventConfig.event, originalFunc, true);
          } else {
            throw new Error("InShadow property requires the custom element to be a shadowdom");
          }
      }
    }
    return descriptor;
  }
}

//HOW TO DEFINE A DECORATOR THAT RUNS ON INSTANCE NOT DESIGN
export const Listen = function(eventConfig: any) {
  return function(target: any,name: string ,descriptor: any) {
    const {value} = descriptor;
    delete descriptor.value;
    delete descriptor.writable;
    descriptor.get = function() {
      Object.defineProperty(this, name, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        value: value.bind(this),
      });

      //ADD EVENT LISTENERS
      console.log("HERE IS SHADOWROOT");
      console.log(this);
      console.log(this.shadowRoot);
      console.log(this.shadow);
      console.log(typeof value);
      //console.log(target.shadowRoot);
      /*if(!eventConfig.inShadow) {
        document.querySelector(eventConfig.selector)
        .addEventListener(eventConfig.event, descriptor.value, true);
      } else if(eventConfig.inShadow && this.shadowRoot) {
          this.shadowRoot.querySelector(eventConfig.selector)
          .addEventListener(eventConfig.event, descriptor.value, true);
      } else {
        throw new Error("InShadow property requires the custom element to be a shadowdom");
      }*/
      //this.listeners = ["one", "two", "three"];
      //this.listeners.push(descriptor);
      return this[name];
    }
    console.log(descriptor)
    console.log("D");
  }
}


//TODO: TRY This
/*function decorator(target, name, descriptor){
  const {value} = descriptor;
  delete descriptor.value;
  delete descriptor.writable;
  descriptor.get = function(){
    // Create an instance of the bound function for the instance.
    // And set an instance property to override the property
    // from the object prototype.
    Object.defineProperty(this, name, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      value: value.bind(this, 'a', 'b'),
    });

    return this[name];
  };
}*/

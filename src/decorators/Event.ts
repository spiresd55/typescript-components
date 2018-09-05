export default function(cls: any, property: string, descriptor: any) {

  const originalEvent = descriptor.value;
  if(typeof originalEvent !== 'function') {
    throw new Error("Event descriptor requires function type");
  }

  descriptor.value = function(...args: any[]) {
    //TODO: Parse the data better or extend custom event
    let data: any = {};
    for(let k in args) {
      data[k] = args[k];
    }

    let event = new CustomEvent(property, {detail: data});

    //Dispatch the custom event
    this.dispatchEvent(event);
  }
}

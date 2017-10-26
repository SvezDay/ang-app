  class Property {
    id: number;
    label: string;
    value: string;
    container_id?: number;
  }

  class Container extends Property{
    container_id?: number;
    title?: Property;
    main?: Property[];
  }


// export class LabelsData {
//   initialLabel: string;
//   list: string[];
//   tryLabel:string;
// }

export {Property, Container}

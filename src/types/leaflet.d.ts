declare module "leaflet" {
  export type Map = any;
  export type Icon = any;
  export function map(element: HTMLElement, options?: any): Map;
  export function tileLayer(urlTemplate: string, options?: any): any;
  export function marker(latlng: [number, number], options?: any): any;
  export function icon(options: any): Icon;
  const leaflet: {
    map: typeof map;
    tileLayer: typeof tileLayer;
    marker: typeof marker;
    icon: typeof icon;
  };
  export default leaflet;
}

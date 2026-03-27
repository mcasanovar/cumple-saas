declare module "leaflet" {
  export type Map = any;
  export type Icon = any;
  export type Marker = any;
  export function map(element: HTMLElement, options?: any): Map;
  export function tileLayer(urlTemplate: string, options?: any): any;
  export function marker(latlng: [number, number], options?: any): Marker;
  export function icon(options: any): Icon;
  export function divIcon(options: any): Icon;
  const leaflet: {
    map: typeof map;
    tileLayer: typeof tileLayer;
    marker: typeof marker;
    icon: typeof icon;
    divIcon: typeof divIcon;
  };
  export default leaflet;
}

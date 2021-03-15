export interface ListContainer {
  getItems: () => void;
  deleteItem: (id: string) => void;
}

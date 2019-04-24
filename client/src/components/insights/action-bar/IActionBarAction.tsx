export interface IActionBarAction {
  id: string;
  displayName: string;
  onClick: () => void;
  isDisabled?: boolean;
}

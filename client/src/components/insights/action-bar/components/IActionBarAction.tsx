export interface IActionBarAction {
  id: string;
  displayName: string;
  onClick: () => void;
  /**
   * @description Name of an icon found here https://material.io/tools/icons/?style=baseline
   * @type {string}
   * @memberof IActionBarAction
   */
  iconName?: string;
  isDisabled?: boolean;
}

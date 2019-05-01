// * Button Variants comes from https://material-ui.com/api/button/
/**
 * @description This is the interface passed to the grid display for each item that it knows how to display
 * @export
 * @interface ICardDisplay
 */
export interface ICardDisplay {
  /**
   * @description Text for the button to display.
   * @type {string}
   * @memberof ICardDisplay
   */
  buttonText: string;
  /**
   * @description Subheader text so you can have a big short text up top and then a little sub text below
   *
   * @type {string}
   * @memberof ICardDisplay
   */
  cardSubHeader?: string;
  /**
   * @description The title for the card
   *
   * @type {string}
   * @memberof ICardDisplay
   */
  cardTitle: string;
  /**
   * @description A unique identifier for the given card.
   *
   * @type {string}
   * @memberof ICardDisplay
   */
  id: string;
  /**
   *
   *
   * @type {string}
   * @memberof ICardDisplay
   */
  name?: string;
  /**
   *
   *
   * @memberof ICardDisplay
   */
  onClick?: () => void;
  /**
   *
   *
   * @memberof ICardDisplay
   */
  onAsyncClick?: () => Promise<any>;
  /**
   *
   *
   * @type {string[]}
   * @memberof ICardDisplay
   */
  subTitles?: string[];
  /**
   *
   *
   * @type {('text' | 'outlined' | 'contained' | 'fab' | 'extendedFab' | 'flat' | 'raised')}
   * @memberof ICardDisplay
   */
  buttonVariant?: 'text' | 'outlined' | 'contained' | 'fab' | 'extendedFab' | 'flat' | 'raised';
}

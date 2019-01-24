// * Button Variants comes from https://material-ui.com/api/button/
export interface ICardDisplay {
  buttonText: string;
  cardSubHeader?: string;
  cardTitle: string;
  id: string;
  isDisabled?: boolean;
  name?: string;
  onClick: () => void;
  subTitles?: string[];
  buttonVariant?: 'text' | 'outlined' | 'contained' | 'fab' | 'extendedFab' | 'flat' | 'raised';
}

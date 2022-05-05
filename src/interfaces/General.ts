// Define Interface Data

export interface ICountry {
  name: string;
  alpha2Code: string;
  capital: string;
  flags: {
    svg: string;
    png: string;
  };
  independent: boolean;
}

export interface ICountry {
  code: string
  name: string
  emoji: string
  currency?: string
  phone?: string
  continent: { name: string }
  languages: {
    code: string
    name: string
    native: string
  }[]
}

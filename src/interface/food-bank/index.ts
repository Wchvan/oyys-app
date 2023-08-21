export type setListType = {
  description: string
  flavor: string
  id: number
  image: string[]
  name: string
  onSale: boolean
  supplierName: string
  today: boolean
  weight: string
}[]

export type supplierListType = {
  avg: number
  id: number
  name: string
  num: number
}[]

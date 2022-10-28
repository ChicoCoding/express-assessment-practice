interface FullName {
  firstName: string;
  lastName: string;
}
export default interface Contact {
  fullname: FullName;
  phoneNumber: number;
  isFavorite: boolean;
  id?: number;
}

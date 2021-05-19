export default interface CredentialsModel {
  token: string;
  refreshToken: string;
  expiryDate: Date;
}

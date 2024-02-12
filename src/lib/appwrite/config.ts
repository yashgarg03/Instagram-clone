import { Client, Storage, Account, Databases, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APWRITE_URL,
  projectId: import.meta.env.VITE_APWRITE_PROJECT_ID,
  databaseId: '65c8fa17c5915c77db2e',
  storageId: '65c8f9caade24ed57d2c',
  userCollectionId: '65c8fa9507af81db237c',
  postCollectionId: '65c8fa4f8d3eaf6c5f1d',
  savesCollectionId: '65c8fac0adf020e96e73'
}

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65c8d4500c7cf523e70d');

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
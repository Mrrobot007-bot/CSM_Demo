import AsyncStorage from '@react-native-community/async-storage';

export default class StorageHandler {

  //to get item with key
  static async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  //to set item with key in local storage
  static async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }

  //remove all data from local storage
  static async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }
}

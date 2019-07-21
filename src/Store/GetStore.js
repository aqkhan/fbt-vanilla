import AsyncStorage from '@react-native-community/async-storage';

export async function storeData (keyValData) {
    // Data sent to component should be in the following format:
    // {
    //     key: "Key<String>",
    //     value: {} or []
    // }

    // Embed APP uuid with key
    
    try {
      await AsyncStorage.setItem(keyValData.key, JSON.stringify(keyValData.value))
    } catch (e) {
        console.log('Error persisting data to localStorage: ', e);
    }
    return true;
}

export async function getData(key, returnType = 'p') {
    // Key should be a sting value
    // Return type can either be String(s) or Premitive(p)
    // Append APP uuid to key for proper retrieval
    try {
        const value = await AsyncStorage.getItem(key)
        //console.log('localStorage Value here: ', value);
        return ( returnType === 's' ) ? value : JSON.parse(value)
        //console.log('Value from local storage BC: ', value)
      } catch(e) {
        // error reading value
        return {
          status: 'Error reading data from localStorage: ',
          errorMessage:  e
        };
      }
}
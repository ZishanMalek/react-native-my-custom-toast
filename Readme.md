# React Native custom show toast messages

## Usage

To use My Package, simply do the following:

1. First You Have To Install `npm i react-native-reanimated`

2. Add Reanimated's Babel plugin to your babel.config.js:

3. Like That plugins: [ `react-native-reanimated/plugin`],

4. Install the package using `npm i react-native-my-custom-toast`.

5. Import App.js Add `import Toast from 'react-native-my-custom-toast/src/Toast'`

6. And Then You have to Put The Main Toast File in App.js Like Thats:`<Toast />` Provide Main App.js

7. Once You have Install Once Again reload Your App Than work 👍

7.LIke That

// in your render function

```js
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-my-custom-toast/src/Toast";

const App = () => {
  return (
    <App>
      <Toast />
    </App>
  );
};

export default App;

const styles = StyleSheet.create({});
```

---

##### **Using a Component**

**NOTE:**
Showing a toast by using a Component inside render, The toast will be automatically disappeared when the `<Toast />` is unmounted.

```js


import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import toast from 'react-native-my-custom-toast/src/DeviceEvent';
import Images from './res/CustomData/Images';
import Toast from 'react-native-my-custom-toast/src/Toast';
const CustomToast = () => {
 const ShowError = () => {
   console.log('ShowError');
   toast.info({
     Fonts: Put Yours Fonts

     icon: Put Yours Image Icon
     message: 'This is a info toast',
     duration: 1000,
   });
 };

 const ShowSuccess = () => {
   toast.success({
     Fonts: Put Yours Fonts
     icon: Put Yours Image Icon
     message: 'This is a success toast',
     duration: 1000,
   });
 };
 return (
   <View
     style={{
       flex: 1,

       paddingHorizontal: 20,
       backgroundColor: 'white',
       justifyContent: 'center',
       alignItems: 'center',
     }}>
     <Toast />
     <Button
       title="Show The Info Toast"
       color={'#C47165'}
       onPress={() => {
         ShowError();
       }}
     />
     <View
       style={{
         marginTop: 40,
       }}>
       <Button
         title="Show The Info Success Toast"
         color={'#9DDBBF'}
         onPress={() => {
           ShowSuccess();
         }}
       />
     </View>
   </View>
 );
};


```

---

## License

My Package is released under the MIT License.

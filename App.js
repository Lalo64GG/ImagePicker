import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity, 
} from 'react-native';

import * as ImagePicker from "expo-image-picker"
import * as Sharing from "expo-sharing"

export default function App() {

  const [ selectedImage, setselectedImage] = useState(null)
 
  let openImagePickerAsync = async() => {
    //? Primero píde permiso al usuario para poder acceder a la galeria de imagenes
    let persmissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(persmissionResult.granted === false){
      alert("Permission to acces camera is required")
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    if(pickerResult.cancelled === true){
      return;
    }

    console.log(pickerResult.assets[0].uri);

    setselectedImage({ localuri: pickerResult.assets[0].uri })
  }

  const openShareDialog = async() => {
    if(!(await Sharing.isAvailableAsync())){
      alert("Sharing, is not available on your plataform")
      return;
    }

    await Sharing.shareAsync(selectedImage.localuri)

  }
 
  return (
    <View style={styles.container}>
      <Text style={ styles.title }>Pick an Image!!</Text>

      <TouchableOpacity onPress={ openImagePickerAsync }>
        <Image
          source={{ uri: 
            selectedImage !== null ? 
            selectedImage.localuri :
            "https://fastly.picsum.photos/id/397/200/200.jpg?hmac=3VBYe8NBAUuvEizTQB0-d8wp2jgqMblJK8vH3h8cslE" }} 
          style= {styles.image }
        />
      </TouchableOpacity>

      {
        selectedImage ? (
      <TouchableOpacity onPress={ openShareDialog } style = { styles.buton } >
        <Text style={ styles.buttonText }>Share this image</Text>
      </TouchableOpacity>
        )
      : 
        (
          <View />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'contain'
  },
  buton:{
    marginTop: 10,
    backgroundColor: "deepskyblue",
    padding:10,
    marginTop: 10,
    borderRadius:10,
    width: "80%"
  },
  buttonText: {
    textAlign: "center",
    color:"#fff",
    fontSize: 20,
  }
 
});

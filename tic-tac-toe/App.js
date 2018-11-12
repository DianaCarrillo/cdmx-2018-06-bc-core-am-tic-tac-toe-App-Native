import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection: "row"}} >
          <View style={styles.tile} >
            <Icon name="close" style={styles.tileX} />
          </View>
          <View style={styles.tile} >
            <Icon name="cicle-outline"/>
          </View>
          <View style={styles.tile} />   
        </View>
       
        <View style={{flexDirection: "row"}} >
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />   
        </View> 
        <View style={{flexDirection: "row"}} >
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />   
        </View> 


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 3,
    width: 100,
    height:100,
  },
  tileX: {
    color: "pink",
    fontSize:60,
    
  },
  tileO: {
    color: "gray",
    fontSize:60,
   
  }
  // con borderWith podemos manejar la visibilidad de los bordes y el grueso
});

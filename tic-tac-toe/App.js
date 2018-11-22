import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import { Font } from 'expo'
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      gameState: [[0,0,0],
                  [0,0,0],
                  [0,0,0]],
      currentPlayer : 1
    }
  }

  componentDidMount(){
    this.initializeGame();
    Font.loadAsync({
      'comfortaa-bold' : require('./assets/fonts/Comfortaa-Bold.ttf')
    })
  }

  initializeGame=()=>{
    this.setState({
      gameState:
       [
          [0,0,0],
          [0,0,0],
          [0,0,0]
                  ],
      currentPlayer: 1
    })
  }

  gameWinner = () =>{
    const numTiles = 3;
    let arr = this.state.gameState
    let sum;

    // check rows
    for (let i = 0; i< numTiles; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3){
        return 1;
      } else if(sum == -3){
        return -1;
      }
    }
    // check cols
    for(let i = 0; i < numTiles; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3 ){
        return 1;
      } else if(sum == -3){
        return -1;
      }
    }
    // Check diagonals
    sum = arr[0][0] + arr[1][1]  + arr[2][2];
    if(sum == 3){
      return 1;
    } else if (sum == -3 ){
      return -1;
    }

    sum = arr[2][0] + arr[1][1]  + arr[0][2];
    if(sum == 3){
      return 1;
    } else if (sum == -3 ){
      return -1;
    }

    // there are no winners
    return 0;
  }

  onNewGame = () =>{
    this.initializeGame();
  }

  onTilePress = (row , col) => {
    //  dont' allow tales to change
    let value = this.state.gameState[row][col];
    if( value != 0 ){ return; }
// va a setear el estado dependiendo de quién es el turno
    let currentPlayer = this.state.currentPlayer;
    // establece la casilla correcta
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});
    //  switch to other player
    let nextplayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextplayer});

    // check for winners
    let winner = this.gameWinner();
    if(winner == 1 ){
        Alert.alert('Player 1 is the winner')
        this.initializeGame();
    } else if (winner == -1){
      Alert.alert('Player 2 is the winner')
      this.initializeGame();
    }
  }

  renderIcon =(row, col)=>{
      const value = this.state.gameState[row][col]
      switch(value)
      {
        case 1: return <Icon name="close" style={styles.tileX} />
        case -1: return <Icon name="checkbox-blank-circle-outline" style={styles.tileO}/> 
        default: return <View/>
      }
  }
  
  render() {  
    return (
      <View style={styles.container}>
          <View>
            <Text style = {{fontFamily:'comfortaa-bold', fontSize:50, }} >Tic-tac-toe</Text>
          </View>

        <View style={{flexDirection: "row"}} >
          <TouchableOpacity onPress={()=>{ this.onTilePress(0,0)}} style = {styles.tile} >
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ this.onTilePress(0,1)}} style = {styles.tile} >
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ this.onTilePress(0,2)}} style = {styles.tile} >
            {this.renderIcon(0,2)}          
          </TouchableOpacity>
        </View>
       
        <View style={{flexDirection: "row"}} >
          <TouchableOpacity onPress={()=>{ this.onTilePress(1,0)}} style={styles.tile}> 
            {this.renderIcon(1,0)}          
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ this.onTilePress(1,1)}} style={styles.tile}>
            {this.renderIcon(1,1)}                    
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ this.onTilePress(1,2)}} style={styles.tile}>
            {this.renderIcon(1,2)}                                 
          </TouchableOpacity>          
        </View> 

       <View style={{flexDirection: "row"}} >
          <TouchableOpacity onPress={()=>{ this.onTilePress(2,0)}} style={styles.tile}> 
            {this.renderIcon(2,0)}          
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ this.onTilePress(2,1)}} style={styles.tile}>
            {this.renderIcon(2,1)}                    
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ this.onTilePress(2,2)}} style={styles.tile}>
            {this.renderIcon(2,2)}                                 
          </TouchableOpacity>          
        </View>

        <Button style ={styles.newGbtn} title="New game" onPress={this.onNewGame}></Button> 

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
    alignItems: "center",
    justifyContent: "center"
  },
  tileX: {
    color: "#bc097d",
    fontSize:60,
    
  },
  tileO: {
    color: "black",
    fontSize:60,
   
  },
  newGbtn: {
    paddingTop:50
  }
  // con borderWith podemos manejar la visibilidad de los bordes y el grueso
});

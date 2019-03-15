import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  } 

  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, {context: this});
    // 2. Claim it if there is no owner
    if(!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        // identificador unico
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect the current user 
    // Cuando entra por primera vez el store.owner esta vacio entonces hace el set por authData.user.uid, cuando la cabecera ya esta creada en firebase ya lo setea con store.owner
    this.setState({
      uid: authData.user.uid, 
      owner: store.owner || authData.user.uid
    });
    
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    }) 
  }
  render() {
    // Log out button
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // 1. Check if they are logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // 2. Check if they are not the owner of the store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>sorry you are not the owner!</p>
          {logout}
        </div>
      )
    }
    // 3. They must be the owner , just render the inventory
    return (
      <div className="inventory">
        
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            fish={this.props.fishes[key]}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}

        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;

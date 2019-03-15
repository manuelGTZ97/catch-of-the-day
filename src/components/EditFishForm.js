import React from "react";

class EditFishForm extends React.Component {
  handleChange = event => {
      // 1. Take a copy of the current fish
      // name recupera el nombre para ponerselo en el key y con el spread operator lo sobreescribe
      // lo sobreescribe con el spread operator
      const updatedFish = {
        ...this.props.fish,
        [event.currentTarget.name] : event.currentTarget.value
      }
      this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input 
            type="text" 
            name="name" 
            onChange={this.handleChange} 
            value={this.props.fish.name} 
        />
        <input 
            type="text" 
            name="price" 
            onChange={this.handleChange} 
            value={this.props.fish.price} 
        />
        <select onChange={this.handleChange} type="text" name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea 
            name="desc" 
            onChange={this.handleChange} 
            value={this.props.fish.desc} 
        />
        <input 
            type="text" 
            onChange={this.handleChange} 
            value={this.props.fish.text} 
            name="image" 
        />
        {/* RECUERDA EL BINDING DE LOS BOTONES */}
        <button onClick={ () => this.props.deleteFish(this.props.index) } >Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;

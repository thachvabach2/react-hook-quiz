import React from "react";

class AddUserInfor extends React.Component {
    state = {
        name: "HarryPhamDev",
        address: "Hoi Dan IT",
        age: 26,
    };

    handleClick(event) {
        console.log(">> click my button");

        //merge state => react class
        this.setState({
            name: "Eric",
            ag: Math.floor(Math.random() * 100 + 1),
            // address: 'Hoi Dan IT',
            // age: 26
        });
    }

    handleOnMoverOver(event) {
        //console.log(event.pageX)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value,
        });
    };

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.handleAddNewUser({
            id: Math.floor(Math.random() * 100 + 1) + "-random",
            name: this.state.name,
            age: this.state.age,
        });
    };
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input
                        // value={this.state.name}
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <label>Your age: </label>
                    <input
                        // value={this.state.age}
                        type="text"
                        onChange={(event) => this.handleOnChangeAge(event)}
                    />
                    <button>Submit</button>
                </form>{" "}
            </div>
        );
    }
}

export default AddUserInfor;

import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: "Tran Duc Sang", age: "16" },
            { id: 2, name: "Steven", age: "24" },
            { id: 3, name: "HoidanIT", age: "69" },
        ],
    };

    handleAddNewUser = (userObj) => {
        console.log(">>>> check data from parent: ", userObj);
        this.setState({
            listUsers: [userObj, ...this.state.listUsers],
        });
        this.setState({
            listUsers: [userObj, ...this.state.listUsers],
            // listUsers: [...this.state.listUsers, userObj]
        });
    };
    handleDeleteUser = (userId) => {
        let listUsersClone = [...this.state.listUsers];
        listUsersClone = listUsersClone.filter((item) => item.id !== userId);
        this.setState({
            listUsers: listUsersClone,
        });
    };

    //JSX
    render() {
        //DRY: don't repeat yourself
        const test = true;
        return (
            <>
                {test}
                <div className="a">
                    <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
                    <br></br>
                </div>
                <div>
                    <DisplayInfor
                        listUsers={this.state.listUsers}
                        handleDeleteUser={this.handleDeleteUser}
                    />
                </div>
            </>
        );
    }
}
export default MyComponent;

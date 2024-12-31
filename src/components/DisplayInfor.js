import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
// class DisplayInfor extends React.Component {
//     render() {
//         console.log(">>> call me render: ");
//         //destructuring array/object
//         const { listUsers } = this.props; //object
//         // console.log(listUsers);
//         // console.table(listUsers);
//         //props => viet tat cua properties
//         return (
//             <div className="display-infor-container">
//                 {true && (
//                     <>
//                         {listUsers.map((user, index) => {
//                             console.log(user);
//                             return (
//                                 <div
//                                     key={user.id}
//                                     className={+user.age > 18 ? "green" : "red"}
//                                 >
//                                     <div>My name's {user.name} </div>
//                                     <div>My age' {user.age} </div>
//                                     <div>
//                                         <button
//                                             onClick={() =>
//                                                 this.props.handleDeleteUser(
//                                                     user.id
//                                                 )
//                                             }
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                     <hr />
//                                 </div>
//                             );
//                         })}
//                     </>
//                 )}
//             </div>
//         );
//     }
// }
const DisplayInfor = (props) => {
    const { listUsers } = props; //object
    return (
        <div className="display-infor-container">
            {true && (
                <>
                    {listUsers.map((user, index) => {
                        console.log(user);
                        return (
                            <div
                                key={user.id}
                                className={+user.age > 18 ? "green" : "red"}
                            >
                                <div>My name's {user.name} </div>
                                <div>My age' {user.age} </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            props.handleDeleteUser(user.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default DisplayInfor;

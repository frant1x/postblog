import React from "react";

class AddUser extends React.Component {
    userAdd = {}
    constructor (props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            description: "",
            age: "",
            isHappy: false,
        }
    }

    render () {
        return (
            <form ref={(el) => this.myForm = el}>
                <input placeholder="Ім'я" onChange={(e) => this.setState({ firstname: e.target.value })}/>
                <input placeholder="Прізвище" onChange={(e) => this.setState({ lastname: e.target.value })}/>
                <textarea placeholder="Біографія" onChange={(e) => this.setState({ description: e.target.value })}></textarea>
                <input placeholder="Вік" onChange={(e) => this.setState({ age: e.target.value })}/>
                <label htmlFor="isHappy">Щасливий?</label>
                <input type="checkbox" id="isHappy" onChange={(e) => this.setState({ isHappy: e.target.checked })}/>
                <button type="button" onClick={() => {
                    this.myForm.reset()
                    this.userAdd = {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        description: this.state.description,
                        age: this.state.age,
                        isHappy: this.state.isHappy,
                    }
                    if (this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                }
                }>Добавити</button>
            </form>
        )
    }
}

export default AddUser;
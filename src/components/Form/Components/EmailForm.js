import React from "react";
import BaseInput from "Components/Form/Components/BaseInput";
import "./styles.css";
import {connect} from "react-redux";
import {setParticipants} from "Actions/index";

class EmailForm extends React.Component {
    constructor(props) {
        super(props);
        const {
            classes,
            value,
            handleChange,
            placeholder,
            disabled,
            required,
            label,
            selectValues,
            target,
            keys,
            helperText,
            ...others
        } = this.props;
          const newValue = typeof value =='string'?value.split(' '):value
        this.state = {
            items:newValue,
            value: "",
            error: null,
        };
    }

    handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: ""
                },()=>{
                   this.props.handleChange(this.props.target,this.state.items)
                });

            }
        }
    };

    handleValue = evt => {
        this.setState({
            value: evt.target.value,
            error: null
        });
    };

    handleDelete = item => {
        this.setState({
            items: this.state.items.filter(i => i !== item)
        },()=>{
            this.props.handleChange(this.props.target,this.state.items)
        });

    };

    isValid(email) {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (!this.isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (error) {
            this.setState({ error });

            return false;
        }

        return true;
    }

    isInList(email) {
        return this.state.items.includes(email);
    }

    isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    render() {
        return (
            <div style={{marginTop: '1em'}}>
                {this.state.items.map(item => (
                    <div className="tag-item" key={item}>
                        {item}
                        <button
                            type="button"
                            className="button"
                            onClick={() => this.handleDelete(item)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <BaseInput
                    className="input"
                    placeholder="Email Address"
                    value={this.state.value}
                    onChange={this.handleValue}
                    onKeyDown={this.handleKeyDown}
                />
                {this.state.error && <p className="error">{this.state.error}</p>}
            </div>
        );
    }
}

 const mapStateToProps = ({ calendarState }) => {
    const { participants} = calendarState;
    return { participants };
};

export default connect(
    mapStateToProps,
    { setParticipants }
)(EmailForm);

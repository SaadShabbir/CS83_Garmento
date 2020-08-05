import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validate from '../validation';

class EditableCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inEditing: false,
      value: this.props.value,
      validationRules: this.props.validation,
      valid: true
    };
  }

  onEdit = () => {
    this.setState({ inEditing: true });
  };

  onEditSave = (itemId, value, name) => {
    this.props.onEdit(itemId, value, name);
    this.setState({ inEditing: false });
  };

  handleOnChange(e) {
    const updatedCell = { ...this.state };
    const value = e.target.value;

    updatedCell.value = value;
    updatedCell.valid = validate(value, updatedCell.validationRules);
    this.setState({ valid: updatedCell.valid });

    if (updatedCell.valid) {
      this.setState({ value: updatedCell.value });
    }
  }

  handleOnKeyUp(e, itemId, value, name) {
    const enterKey = 13;
    if (e.keyCode === enterKey) {
      this.onEditSave(itemId, value, name);
    }
  }

  render() {
    const { item, value, name, className } = this.props;
    return this.state.inEditing ? (
      <div className="editable-cell__input-wrapper">
        <input
          defaultValue={value}
          onChange={e => this.handleOnChange(e)}
          onKeyUp={e => this.handleOnKeyUp(e, item.id, this.state.value, name)}
          // valid={this.state.valid}
          // touched={true}
          className="editable-cell__input"
        />

        <FontAwesomeIcon
          icon="check-circle"
          className={`icon ${className}`}
          onClick={() => this.onEditSave(item.id, this.state.value, name)}
        />
      </div>
    ) : (
      <div className="editable-cell__input-wrapper">
        <span>{value}</span>

        <FontAwesomeIcon
          icon="edit"
          className={`icon ${className}`}
          onClick={this.onEdit}
        />
      </div>
    );
  }
}

export default EditableCell;

import React, { Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Card } from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class TrelloActionButton extends Component {
  state = {
    formOpen: false,
    text: "",
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({ formOpen: false });
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      dispatch(addList(text));
      this.setState({ text: "" });
    }
    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      dispatch(addCard(listID, text));
      this.setState({ text: "" });
    }
    return;
  };

  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextBackground = list ? "rgba(0,0,0,.25)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
        }}
      >
        <AddIcon style={{ fontSize: 14 }}></AddIcon> <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add Card";

    return (
      <div>
        <Card
          style={{
            minHeight: "auto",
            minWidth: "auto",
            padding: "3px 5px 2px",
          }}
        >
          <TextareaAutosize
            autoFocus
            placeholder={placeholder}
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style={{
              resize: "none",
              width: "100%",
              outline: "none",
              border: "none",
              overflow: "hidden",
              fontSize: 12,
              minWidth: "260px",
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            disableElevation
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "#5aac44",
              fontSize: "10px",
              padding: "7px",
            }}
          >
            {buttonTitle}
          </Button>
          <CloseIcon
            style={{ marginLeft: 8, cursor: "pointer", fontSize: 16 }}
          />
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openFormButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    fontSize: 14,
    textDecoration: "underline",
    width: "260px",
  },
  formButtonGroup: {
    marginTop: 4,
    display: "flex",
    alignItems: "center",
  },
};

export default connect()(TrelloActionButton);

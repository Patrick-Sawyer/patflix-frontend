import React, { Component } from "react";
import axios from "axios";

class Upload extends Component {
  state = {
    title: "",
    description: "",
    loggedInStatus: this.props.loggedInStatus,
    user: this.props.user,
    video: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedInStatus !== prevState.loggedInStatus) {
      return { loggedInStatus: nextProps.loggedInStatus };
    } else if (nextProps.user !== prevState.user) {
      return { user: nextProps.user };
    } else return null;
  }

  handleChange = (event) => {
    event.preventDefault();

    if (event.target.id === "video") {
      this.setState({ video: event.target.files[0] });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("video", this.state.video);
    data.append("title", this.state.title);
    data.append("description", this.state.description);
    axios
      .post("http://localhost:3001/upload", data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <input
              className="form-control"
              autoFocus="autofocus"
              type="text"
              placeholder="Title"
              autofill="none"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Description"
              autofill="none"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              onChange={this.handleChange}
              className="form-control"
              type="file"
              id="video"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-lg custom-button" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;

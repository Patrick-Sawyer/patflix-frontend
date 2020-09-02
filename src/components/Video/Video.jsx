import React, { Component } from "react";
import axios from "axios";

class Video extends Component {
  state = {
    url:
      "https://patflix-bucket.s3.eu-west-1.amazonaws.com/" +
      this.props.match.params.uuid +
      "/" +
      this.props.match.params.filename,
    title: "",
    description: "",
    video_id: this.props.match.params.video_id,
  };

  componentDidMount = () => {
    axios
      .post(
        "http://localhost:3001/video",
        {
          video_id: this.state.video_id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="form-container">
        <h4>{this.state.title}</h4>
        <p>{this.state.description}</p>
        <video controls>
          <source src={this.state.url} />
        </video>
      </div>
    );
  }
}

export default Video;

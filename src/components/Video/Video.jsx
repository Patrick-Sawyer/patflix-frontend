import React, { Component } from "react";
import axios from "axios";
import ShakaPlayer from "shaka-player-react";

class Video extends Component {
  state = {
    title: "",
    description: "",
    video_id: this.props.match.params.video_id,
    directory: "dash/" + this.props.match.params.video_id + "/index.mpd",
    mimeType: "application/dash+xml",
  };

  componentDidMount = () => {
    this.getTitleAndDescription();
    this.checkIfIOS();
  };

  //this needs testing with apple device / safari etc

  checkIfIOS = () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      this.setState({
        manifest: "hls/" + this.props.match.params.video_id + "index.m3u8",
        mimeType: "application/x-mpegURL",
      });
    }
  };

  getTitleAndDescription = () => {
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
        <ShakaPlayer
          autoPlay
          src={
            "https://patflix-bucket.s3.eu-west-1.amazonaws.com/dash/" +
            this.state.video_id +
            "/index.mpd"
          }
        />
      </div>
    );
  }
}

export default Video;

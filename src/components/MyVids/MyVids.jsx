import React, { Component } from "react";
import axios from "axios";
import "./MyVids.css";

class MyVids extends Component {
  state = {
    videos: [],
  };

  componentDidMount = () => {
    axios
      .post(
        "http://localhost:3001/uservideos",
        {
          user_id: this.props.user.id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          videos: response.data.videos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  linkToVideo = (url, id) => {
    this.props.history.push("/video/" + id + "/" + url);
  };

  render() {
    return (
      <div>
        {this.state.videos.map((video, index) => (
          <div
            onClick={() => this.linkToVideo(video.url, video.id)}
            className="video"
            key={index}
          >
            <p>Title: {video.title}</p>
            <p>Description: {video.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default MyVids;

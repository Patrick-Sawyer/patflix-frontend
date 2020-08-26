import React, { Component } from "react";
import axios from "axios";

class Browse extends Component {
  state = {
    videos: [],
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:3001/videos", { withCredentials: true })
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

export default Browse;

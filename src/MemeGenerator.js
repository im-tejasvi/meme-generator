import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImages: [],
    };
    this.changeTextHandler = this.changeTextHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        console.log(memes[0]);
        this.setState({ allMemeImages: memes });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    //this is to avoid page from refreshing
    const num = Math.floor(Math.random() * this.state.allMemeImages.length);
    const randomImgM = this.state.allMemeImages[num].url;
    this.setState({ randomImg: randomImgM });
  }

  changeTextHandler(event) {
    console.log(event.target.name);
    //console.log(event.type)
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="meme-form">
          <input
            name="topText"
            type="text"
            placeholder="Top Text"
            onChange={this.changeTextHandler}
            value={this.state.topText}
          ></input>{" "}
          <br />
          <input
            name="bottomText"
            type="text"
            placeholder="Bottom Text"
            onChange={this.changeTextHandler}
            value={this.state.bottomText}
          ></input>{" "}
          <br />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;

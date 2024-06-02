import { Component } from "react";
import "./App.css";
import ResultContainer from "./result-container";
import CommentsContainer from "./comments-container";
import Navbar from "./navbar";
import Footer from "./footer";
import Header from "./header";
import "./global.css"

class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <>
        <Header />
        <Navbar />

        <div id="container">
          <aside></aside>
          <div id="main">
            <video controls autoPlay>
              <source type="video/youtube" src="https://www.youtube.com/watch?v=boO4QDHnn_w"/>
            </video>
            <ResultContainer />
            <CommentsContainer />
          </div>
          <aside></aside>
        </div>

        <Footer />
      </>
    )
  }
}

export default App;

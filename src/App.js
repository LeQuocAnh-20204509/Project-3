import { Component } from "react";
// import "./global.css";
import "./App.css";
import ResultContainer from "./components/result-container";
import CommentsContainer from "./components/comments-container";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Header from "./components/header";
import Introduction from "./components/introduction";
import YoutubeEmbeder from "./components/youtube-embeder";

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
            <Introduction />
            <YoutubeEmbeder youtubeId="boO4QDHnn_w" />
            <div
              style={{
                padding: "0 5%"
              }}
            >
              <h2>Hệ thống</h2>
              <ResultContainer />
            </div>
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

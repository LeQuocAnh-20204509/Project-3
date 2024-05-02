import { Component } from "react";
import "./App.css";
import ResultContainer from "./result-container";
import CommentsContainer from "./comments-container";

class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <>
        <header>
          OCR<br/>
          Hệ thống sinh câu hỏi trắc nghiệm từ hình ảnh
        </header>

        <div id="body">
          <div id="container">
            <aside>Phần aside left</aside>
            <div id="main">
              <video controls autoPlay>
                <source type="video/youtube" src="https://www.youtube.com/watch?v=boO4QDHnn_w"/>
              </video>
              <ResultContainer />
              <CommentsContainer />
            </div>
            <aside>
              Phần aside right
            </aside>
          </div>
        </div>

        <footer>
          Phần footer
        </footer>
      </>
    )
  }
}

export default App;

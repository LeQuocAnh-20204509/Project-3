import { Component } from "react";

const RatingStar = function(props) {
    function mouseEnterHandler(event) {
        props.onMouseEnter(props.index);
    }

    function mouseLeaveHandler(event) {
        props.onMouseLeave(props.index);
    }

    function clickHandler(event) {
        props.onClick(props.index);
    }

    var element = props.isSelected ?
                    <i className="fa fa-star" aria-hidden onClick={clickHandler}
                        style={{
                            color: "yellow",
                            fontSize: "1.2rem"
                        }}
                    ></i> :
                    (
                        props.isActive ?
                        <i className="fa fa-star" aria-hidden onMouseLeave={mouseLeaveHandler}  onClick={clickHandler}
                            style={{
                                color: "yellow",
                                fontSize: "1.2rem"
                            }}
                        ></i> :
                        <i className="fa fa-star-o" aria-hidden onMouseEnter={mouseEnterHandler}
                            style={{
                                fontSize: "1.2rem"
                            }}
                        ></i>
                    )
    return (
        <>{element}</>
    )
}

class RatingStarsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: [false, false, false, false, false, false],
            isSelected: [false, false, false, false, false, false]
        }
        this.changeToActive = this.changeToActive.bind(this);
        this.changeToUnactive = this.changeToUnactive.bind(this);
        this.setToSelected = this.setToSelected.bind(this);
    };

    changeToActive(index) {
        var newIsActive = [...this.state.isActive];
        newIsActive.forEach((e, i, arr) => {
            if (i <= index) arr[i] = true
        });
        this.setState({
            isActive: newIsActive
        });
    };

    changeToUnactive(index) {
        var newIsActive = [false, false, false, false, false, false];
        this.setState({
            isActive: newIsActive
        });
    }

    setToSelected(index) {
        if (!this.props.isImageUploaded) {
            alert("Bạn chưa upload ảnh!");
        } else if (!this.props.isTypingFinished) {
            alert("Bạn không thể đánh giá vì câu hỏi chưa được sinh ra!");
        } else {
            var newIsSelected = [...this.state.isSelected];
            newIsSelected.forEach((e, i, arr) => {
                if (i <= index) arr[i] = true;
                else arr[i] = false;
            });
            this.setState({
                isSelected: newIsSelected,
                isActive: newIsSelected
            })
        }
    }

    render() {
        return (
            <div>
                <RatingStar index={1} isActive={this.state.isActive[1]} isSelected={this.state.isSelected[1]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={2} isActive={this.state.isActive[2]} isSelected={this.state.isSelected[2]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={3} isActive={this.state.isActive[3]} isSelected={this.state.isSelected[3]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={4} isActive={this.state.isActive[4]} isSelected={this.state.isSelected[4]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={5} isActive={this.state.isActive[5]} isSelected={this.state.isSelected[5]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
            </div>
        )
    }
}

export default RatingStarsContainer;

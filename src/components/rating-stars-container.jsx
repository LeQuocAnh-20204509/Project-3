import { Component } from "react";
import { setRateHoveredOrNot, setRateSelectedOrNot } from "../react-redux/rate-share-comment-slice";
import { connect } from "react-redux";

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
        
        }
        this.changeToActive = this.changeToActive.bind(this);
        this.changeToUnactive = this.changeToUnactive.bind(this);
        this.setToSelected = this.setToSelected.bind(this);
    };

    changeToActive(index) {
        this.props.submitRateHoveredOrNot(index, true);
    };

    changeToUnactive(index) {
        this.props.submitRateHoveredOrNot(index, false);
    }

    setToSelected(index) {
        if (!this.props.isImageUploaded) {
            alert("Bạn chưa upload ảnh!");
        } else if (!this.props.isFunctionalitiesActive) {
            alert("Bạn không thể đánh giá vì câu hỏi chưa được sinh ra hoặc đang được sinh ra!");
        } else {
            this.props.submitRateSelectedOrNot(index, true);
            this.changeToActive(index);
        }
    }

    render() {
        return (
            <div>
                <RatingStar index={0} isActive={this.props.isHovered[0]} isSelected={this.props.isSelected[0]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={1} isActive={this.props.isHovered[1]} isSelected={this.props.isSelected[1]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={2} isActive={this.props.isHovered[2]} isSelected={this.props.isSelected[2]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={3} isActive={this.props.isHovered[3]} isSelected={this.props.isSelected[3]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
                &nbsp;
                <RatingStar index={4} isActive={this.props.isHovered[4]} isSelected={this.props.isSelected[4]}
                    onMouseEnter={this.changeToActive} onMouseLeave={this.changeToUnactive} onClick={this.setToSelected}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isHovered: state.rateShareComment.rate.isHovered,
        isSelected: state.rateShareComment.rate.isSelected,
        isImageUploaded: state.imageUpload.isUploaded,
        isFunctionalitiesActive: state.rateShareComment.isActive
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitRateHoveredOrNot: (index, isHovered) => {
            dispatch(setRateHoveredOrNot({
                index: index,
                isHovered: isHovered
            }))
        },
        submitRateSelectedOrNot: (index, isSelected) => {
            dispatch(setRateSelectedOrNot({
                index: index,
                isSelected: isSelected
            }))
        }
    }
}

const connectedRatingStarsContainer = connect(mapStateToProps, mapDispatchToProps)(RatingStarsContainer);

export default connectedRatingStarsContainer;

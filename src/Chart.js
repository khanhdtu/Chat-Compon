import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import './index.css';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  flex-flow: row wrap;
  position: relative;
`

const Card = styled.div`
  flex: 0 1 calc(${props => props.width}% - 1px);
  background-color: ${props => props.color}
`

Card.Head = styled.div`
  min-height: 51px;
  width: 100%;
  display: inline-block;
`
// Card.Header = styled.div`
//   width: 100%;
//   display: inline-block;
// `

Card.Row = styled.div`
  width: 100%;
  display: inline-block;
`

Card.HeaderTextSmall = styled.span`
  font-size: small;
  font-weight: lighter;
  opacity: 0.5;
`
Card.HeaderTextLarge = styled.span`
  color: ${props => props.color}
  font-size: x-large;
  font-weight: 400;
`
Card.FooterTextSmall = styled.span`
  color: ${props => props.color};
  font-size: small;
  font-weight: 500;
  opacity: 0.5;
`

Card.FooterTextLarge = styled.span`
  color: ${props => props.color}
  font-size: medium;
  font-weight: 500;
`

Card.Body = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center; 
`
const Pipe = {};

Pipe.Head = styled.div`
  height: 10px;
`
Pipe.Body = styled.div`
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  position: relative;
`

Pipe.BodyEnd = styled.div`
  height: ${props => props.height}px;
  background-color: ${props => props.ltrColor};
  position: relative;
  border-right: 2px solid ${props => props.rtlColor};
`

Pipe.BodyChildContainer = styled.div`
  width: 100%;
  height: auto;
`

Pipe.BodyChild = styled.div`
  width: 99%;
  height: 5px;
  bottom: 0;
  right: 0;
  position: absolute;
`
Pipe.BodyChildValue = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background-color: ${props => props.color};
  float: right;
`

Pipe.Foot = styled.div`
  height: 10px;
`
Card.Foot = styled.div`
  height: 35px;
  width: 100%;
`
const Edge = {};

Edge.Right = styled.div`
  width: 100% - 3px;
  height: 100%;
  border-right: 3px solid ${props => props.color}
`
Edge.Left = styled.div`
  width: 100% - 3px;
  height: 100%;
  border-left: 3px solid ${props => props.color}
`

export class ComponChart extends Component {

  theHeadCard(title, subtitle) {
    return(
      <Card.Head className="card-header">
        <Card.Row className="card-header-title">
          <Card.HeaderTextSmall className="right">{title}</Card.HeaderTextSmall>
        </Card.Row>
        <Card.Row className="card-header-title">
          <Card.HeaderTextLarge className="right">{subtitle}</Card.HeaderTextLarge>
        </Card.Row>
      </Card.Head>
    )
  }

  theBodyCard(index, ltrColor, rtlData, length) {
    let head = {};
    let body = {};
    let foot = {};
    const rows = [];
    if (index !== (length - 1)) {
      if (index === 0) {
        head = <Pipe.Head className="pipe-head" key={'head-' + index}><Edge.Right color={ltrColor}/></Pipe.Head>
        foot = <Pipe.Foot key={'foot-' + index}/>;
      } else {
        head = <Pipe.Head className="pipe-head" key={'head-' + index}/>;
        foot = <Pipe.Foot key={'foot-' + index}><Edge.Left color={ltrColor}/></Pipe.Foot>;
      }
      body = <Pipe.Body key={'body-' + index} color={ltrColor} height={55 - index*10}/>;
    } else {
      head = <Pipe.Head className="pipe-head" key={'head-' + index}><Edge.Right color={rtlData.color}/></Pipe.Head>
      body = (
        <Pipe.BodyEnd key={'body-' + index} ltrColor={ltrColor} rtlColor={rtlData.color} height={55 - index*10}>
          <Pipe.BodyChild color={rtlData.color}>
            <Pipe.BodyChildValue width={rtlData.width * 100} color={rtlData.color} />
          </Pipe.BodyChild>
        </Pipe.BodyEnd>
      );
      foot = <Pipe.Foot key={'foot-' + index}><Edge.Left color={ltrColor}/></Pipe.Foot>;
    }
    rows.push(head);
    rows.push(body);
    rows.push(foot);
    return <Card.Body className="pipe-wrapper">{rows}</Card.Body>;
  }

  theFootCard(index, ltrData, rtlData, length) {
    if (index === 0) return (
      <Card.Foot>
        <Card.Row className="card-header-title">
          <Card.FooterTextLarge className="left">{ltrData.label}</Card.FooterTextLarge>
        </Card.Row>
      </Card.Foot>
    )
    if (index !== (length - 1)) {
      return (
        <Card.Foot>
          <Card.Row className="card-foot-sub-title">
            <Card.FooterTextSmall color={ltrData.color} className="left">
              {ltrData.label}
            </Card.FooterTextSmall>
          </Card.Row>
          <Card.Row className="card-foot-title">
            <Card.FooterTextLarge className="left">{ltrData.sublabel}</Card.FooterTextLarge>
          </Card.Row>
        </Card.Foot>
      )
    }
    return (
      <Card.Foot>
        <Card.Row className="card-foot-sub-title">
          <Card.FooterTextSmall color={ltrData.color} className="left">{ltrData.label}</Card.FooterTextSmall>
          <Card.FooterTextSmall color={rtlData.color} className="right">{rtlData.label}</Card.FooterTextSmall>
        </Card.Row>
        <Card.Row className="card-foot-title">
          <Card.FooterTextLarge className="left">{ltrData.sublabel}</Card.FooterTextLarge>
          <Card.FooterTextLarge className="right">{rtlData.sublabel}</Card.FooterTextLarge>
        </Card.Row>
      </Card.Foot>
    )
  }

  render() {
    const cards = [];
    const ltrData = this.props.data["ltr-data"];
    const rtlData = this.props.data["rtl-data"];
    const length = ltrData.length;
    for (let i = 0; i < length; i++) {
      cards.push(
        <Card key={i} width={ltrData[i].width*100}>
          {this.theHeadCard(ltrData[i].title,ltrData[i].subtitle)}
          {this.theBodyCard(i,ltrData[i].color,rtlData[0],length)}
          {this.theFootCard(i,ltrData[i],rtlData[0],length)}
        </Card>
      )
    }
    return (
      <React.Fragment>
        <Wrapper>
          {cards}
        </Wrapper>
      </React.Fragment>
    );
  }
}

ComponChart.propTypes = {
  data: PropTypes.any
}
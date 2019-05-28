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
// Pipe.Body = styled.div`
//   height: ${props => props.height}px;
//   background-color: ${props => props.color};
//   position: relative;
// `

Pipe.Body = styled.div`
  height: ${props => props.height}px;
  background-color: ${props => props.ltrColor};
  position: relative;
  border-right: ${props =>('2px solid ' + props.rtlColor)};
`

Pipe.BodyChildContainer = styled.div`
  width: 100%;
  height: auto;
`

Pipe.BodyChild = styled.div`
  width: 100%;
  height: ${props => props.height}px;
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
  height: ${props => props.height}px;
  position: absolute;
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
        <Card.Row className="card-header-sub-title">
          <Card.HeaderTextSmall className="right">{title}</Card.HeaderTextSmall>
        </Card.Row>
        <Card.Row className="card-header-title">
          <Card.HeaderTextLarge className="right">{subtitle}</Card.HeaderTextLarge>
        </Card.Row>
      </Card.Head>
    )
  }

  theBodyCard(index, ltrColor, rtlData, length, _rtl) {
    let head = {};
    let body = {};
    const rows = [];
    if (index !== (length - 1)) {
      if (index === 0) {
        head = <Pipe.Head className="pipe-header" key={'head-' + index}><Edge.Right color={ltrColor}/></Pipe.Head>
        body = (
          <Pipe.Body className="pipe-body" key={'body-' + index} ltrColor={ltrColor} height={55 - index*10}>
            <Pipe.BodyChild color={rtlData.color} height={25 - index*5 }>
              <Pipe.BodyChildValue width={_rtl.width * 100} color={rtlData.color} />
            </Pipe.BodyChild>
            <Pipe.Foot className="pipe-footer" key={'foot-' + index} height={55 + index*5}/>
          </Pipe.Body>
        )
      } else {
        head = <Pipe.Head className="pipe-header" key={'head-' + index}/>;
        body = (
          <Pipe.Body className="pipe-body" key={'body-' + index} ltrColor={ltrColor} height={55 - index*10}>
            <Pipe.BodyChild color={rtlData.color} height={25 - index*5 }>
              <Pipe.BodyChildValue width={_rtl.width * 100} color={rtlData.color} />
            </Pipe.BodyChild>
            <Pipe.Foot className="pipe-footer" key={'foot-' + index} height={65 - index*10}>
              <Edge.Left color={ltrColor}/>
            </Pipe.Foot>
          </Pipe.Body>
        );
      }
    } else {
      head = <Pipe.Head className="pipe-header" key={'head-' + index}><Edge.Right color={rtlData.color}/></Pipe.Head>
      body = (
        <Pipe.Body className="pipe-body" key={'body-' + index} ltrColor={ltrColor} rtlColor={rtlData.color} height={55 - index*10}>
          <Pipe.BodyChild color={rtlData.color} height={25 - index*5 }>
            <Pipe.BodyChildValue width={_rtl.width * 100} color={rtlData.color} />
          </Pipe.BodyChild>
          <Pipe.Foot className="pipe-footer" key={'foot-' + index} height={65 - index*10}><Edge.Left color={ltrColor}/></Pipe.Foot>
        </Pipe.Body>
      );
    }
    rows.push(head);
    rows.push(body);
    return <Card.Body className="card-body">{rows}</Card.Body>;
  }

  theFootCard(index, ltrData, rtlData, length) {
    if (index === 0) return (
      <Card.Foot className="card-footer">
        <Card.Row className="card-footer-title">
          <Card.FooterTextLarge className="left">{ltrData.label}</Card.FooterTextLarge>
        </Card.Row>
      </Card.Foot>
    )
    if (index !== (length - 1)) {
      return (
        <Card.Foot className="card-footer">
          <Card.Row className="card-footer-sub-title">
            <Card.FooterTextSmall className="left" color={ltrData.color} >
              {ltrData.label}
            </Card.FooterTextSmall>
          </Card.Row>
          <Card.Row className="card-footer-title">
            <Card.FooterTextLarge className="left">{ltrData.sublabel}</Card.FooterTextLarge>
          </Card.Row>
        </Card.Foot>
      )
    }
    return (
      <Card.Foot className="card-footer">
        <Card.Row className="card-footer-sub-title">
          <Card.FooterTextSmall className="left" color={ltrData.color}>{ltrData.label}</Card.FooterTextSmall>
          <Card.FooterTextSmall className="right" color={rtlData.color}>{rtlData.label}</Card.FooterTextSmall>
        </Card.Row>
        <Card.Row className="card-footer-title">
          <Card.FooterTextLarge className="left">{ltrData.sublabel}</Card.FooterTextLarge>
          <Card.FooterTextLarge className="right">{rtlData.sublabel}</Card.FooterTextLarge>
        </Card.Row>
      </Card.Foot>
    )
  }

  render() {
    const cards = [], array_tmp = [];
    let rtlWidth = 0;
    const ltrData = this.props.data["ltr-data"];
    const rtlData = this.props.data["rtl-data"];
    const length = ltrData.length;

    this.getRtlItemWidth(rtlWidth, ltrData, rtlData, array_tmp);

    for (let i = 0; i < length; i++) {
      cards.push(
        <Card className="card" key={i} width={ltrData[i].width*100}>
          {this.theHeadCard(ltrData[i].title,ltrData[i].subtitle)}
          {this.theBodyCard(i,ltrData[i].color,rtlData[0],length, this.findItem(array_tmp,i))}
          {this.theFootCard(i,ltrData[i],rtlData[0],length)}
        </Card>
      )
    }
    return (
      <React.Fragment>
        <Wrapper className="wrapper">
          {cards}
        </Wrapper>
      </React.Fragment>
    );
  }

  findItem(items, index) {
    return items.find(item => {
      return item.index === index;
    })
  }

  getRtlItemWidth(rtlWidth, ltrData, rtlData, array_tmp) {
    for (let i = ltrData.length - 1; i >= 0; i--) {
      rtlWidth += ltrData[i].width;
      if (rtlWidth <= ltrData[i].width) {
        if (rtlWidth >= rtlData[0].width) {
          array_tmp.push({
            index: i,
            width: rtlData[0].width / ltrData[i].width
          })
        } else {
          array_tmp.push({
            index: i,
            width: 1
          })
        }
      }
      else {
        let numb  = 0;
        const rtlItemWidth = rtlData[0].width - (rtlWidth - ltrData[i].width);
        if (rtlItemWidth >= ltrData[0].width) {
          numb = 1;
        } else if (rtlItemWidth < 0) {
          numb = 0;
        } else {
          numb = rtlItemWidth / ltrData[i].width;
        }
        array_tmp.push({
          index: i,
          width: numb
        })
      }
    }
    return array_tmp;
  }
}

ComponChart.propTypes = {
  data: PropTypes.any
}
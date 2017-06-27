import React, { Component } from 'react';
import Flight, { Rect, Oval } from 'react-flight/dom'

class TestComp extends Component {
  




  render() {
    return (
      <Flight interactive>
  <Flight.Frame duration={300} source>
    <div className="keyframe">
      <Rect
        name="line1"
        radius={5}
        style={{
          backgroundColor: '#95A2AA',
          left: 120,
          top: 100,
          width: 130,
          height: 10,
        }} />

      <Oval
        name="circ1"
        size={16}
        style={{
          backgroundColor: '#79CD15',
          left: 110,
          top: 130,
        }} />
    </div>
  </Flight.Frame>

  <Flight.Frame duration={300}>
    <div className="keyframe">
      <Rect
        name="line1"
        radius={5}
        style={{
          backgroundColor: '#95A2AA',
          left: 120,
          top: -10,
          width: 130,
          height: 10,
        }} />

      <Oval
        name="circ1"
        size={220}
        style={{
          backgroundColor: '#79CD15',
          left: 50,
          top: 70,
        }} />
    </div>
  </Flight.Frame>
</Flight>
    );
  }
}

export default TestComp;

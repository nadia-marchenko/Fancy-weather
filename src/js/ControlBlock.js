import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';



class ControlBlock extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    let celsiumTypeDegree = 'celsium';
    let farengeitTypeDegree = 'farengeit';

    return (
    <>
      <div className="control-block">
        <Container>
          <Row>
            <Col lg={4} xs={12} md={6}>
              <div className="main-buttons">
                <Button variant="outline-secondary" onClick={() => { this.props.updateBackground()}}>Update</Button>{' '}
                <DropdownButton as={ButtonGroup} title="LAN" id="dropdown-variants-Secondary" variant="outline-secondary">
                  <Dropdown.Item eventKey="1">EN</Dropdown.Item>
                  <Dropdown.Item eventKey="2">RU</Dropdown.Item>
                  <Dropdown.Item eventKey="2">BE</Dropdown.Item>
                </DropdownButton>
                <Dropdown as={ButtonGroup} variant="outline-secondary" className="temperature-change-buttons">
                  <Button variant="outline-secondary" onClick={() => { this.props.toCelsium(celsiumTypeDegree)}}>°C</Button>
                  <Button variant="outline-secondary" onClick={() => { 
                    this.props.toCelsium(farengeitTypeDegree)
                    }}>°F</Button>
                </Dropdown>
              </div>
            </Col>
            <Col lg={{ span: 4, offset: 4 }} xs={12} md={6}>
              <div className="search-block">
                <InputGroup className="mb-3" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}>
                  <FormControl
                    placeholder="Search"
                    type="search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button variant="outline-secondary" type='submit' onClick={() => { this.props.updateInputValue(this.state.inputValue)}}>Search</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
    );
  }
}

export default ControlBlock;

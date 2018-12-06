import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header.js';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: "",
      myEvents: "",
      createPopup: "",
      currentUser: this.props.currentUser,
      newEvent: {
        title:"",
        start: "",
        end: "",
        eventUser: this.props.user.uid
      },
      rendered: false
    };
  }

  componentDidUpdate() {
    // this.getEvents();
  }

  componentDidMount() {
    // this.getEvents();
  }

  getEvents() {
    if(this.state.rendered === false) {
      this.setState({
        newEvent: {
          title: "",
          start: "",
          end: "",
          eventUser: this.props.user.uid
        }
      });
      this.setState({events: this.props.events});

      let myEvents = [];
      let events = this.props.events;
      events.map((event, i) => {
        if (this.props.user.uid === event.eventUser) {
          myEvents.push(event);
        }
      });
      console.log(myEvents);
      this.setState({myEvents: myEvents});
      this.setState({rendered: true});
    }
  }

  getEventData(title) {
    let newEvent = this.state.newEvent;
    newEvent.title = title;
    this.setState({
      newEvent: newEvent
    });
    let events = this.props.events;
    // let myEvents = this.state.myEvents;
    events.push(this.state.newEvent);
    // myEvents.push(this.state.newEvent);
    // this.setState({
    //   myEvents: myEvents
    // });
    console.log(events);
    this.props.setEvents(events);
    this.setState({
      newEvent: {
        title: "",
        start: "",
        end: "",
        eventUser: this.props.currentUser.userId
      },
      createPopup: ""
    });
  }

  // addEvents(newEvent) {
  //   let events = this.state.events;
  //   events.push(newEvent);
  //   this.props.setEvents(events);
  // }

  showCreatePopup(slotInfo) {

    var newEvent = this.state.newEvent;
    newEvent.start = slotInfo.start;
    newEvent.end = slotInfo.end;
    console.log(newEvent);
    this.setState({
      createPopup: <CalendarCreateEvent getEventData={(title) => this.getEventData(title)} closeModal={(e) => this.closeModal(e)} />,
      newEvent: newEvent
    });

  }

  closeModal() {
    this.setState({createPopup: ""});
  }

  logEvent(event, e) {
    console.log(event);
    console.log(e);
  }

  render () {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
    // let events = this.state.myEvents;
    let events = this.props.events;
    // this.setState({events: events});
    let myEvents = [];
    events.map((event, i) => {
      if (this.props.user.uid === event.eventUser) {
        myEvents.push(event);
      }
    });
    if (this.props.events === "") {
      return (
        <div className="loading">Loading</div>
      );
    } else {
      return (
          <div className="calendar-container">
            {this.state.createPopup}
            <BigCalendar className="calendar"
              style={{height: '420px'}}
              selectable={true}
              popup={true}
              events={events}
              onSelectSlot={(slotInfo) => this.showCreatePopup(slotInfo)}
              onSelectEvent={(event, e) => this.logEvent(event, e)}
            />
          </div>
      );
    }
  }
}

class CalendarCreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        title: ""
      }
    };
  }

  getEventTitle(e) {
    e.preventDefault();
    let eventTitle = document.getElementById("eventTitle").value;
    console.log(eventTitle);
    this.props.getEventData(eventTitle);
  }


  render () {


    return (
        <div className="calendar__modal">
          <i className="fa fa-times calendar__modal__close" onClick={() => this.props.closeModal()}></i>
          <form className="calendar__modal__form" onSubmit={(e) => this.getEventTitle(e)}>
            <fieldset className="calendar__modal__form__field">
              <label className="calendar__modal__form__field__label">Title</label>
              <input id="eventTitle" className="calendar__modal__form__field__input" type="text" />
            </fieldset>
            <fieldset className="calendar__modal__form__field">
              <label className="calendar__modal__form__field__label">Description</label>
              <input id="eventDescription" className="calendar__modal__form__field__textarea" type="textarea" />
            </fieldset>
            <input type="submit" />
          </form>
        </div>
    );
  }
}


// LeagueStatStatic.propTypes = {
//   rank: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   isEditing: PropTypes.boolean
// };

export default withRouter(Calendar);

import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
// import * as actions from './actions/stats';
import { connect } from 'react-redux';
import { getStatsThunk, watchStatUpdatedEvent } from './index';
import unirest from 'unirest';
import firebase, { auth, provider, database, updateFirebase } from './firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from './logo.svg';
import Login from './components/login/login.js';
import Search from  './components/search.js';
import Header from  './components/header.js';
import Container from './components/container.js';
import Dashboard from './components/dashboard/dashboard.js';
import LeagueDashboard from './components/league/dashboard.js';
import LeagueProfile from './components/league/profile.js';
import TeamDashboard from './components/team/dashboard.js';
import PlayerDashboard from './components/player/dashboard.js';
import LoginForm from './components/login/loginform.js';
import SignupForm from './components/login/signupform.js';
import ResetPasswordEmail from './components/login/resetpasswordemail.js';
import ResetPasswordConfirm from './components/login/resetpasswordconfirm.js';
import UserProfile from './components/user/profile.js';
import CalendarContainer from './components/calendar/calendar.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';

import $ from 'jquery';
import './stylesheets/App.css';

library.add(faBowlingBall);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // stats: this.props.stats,
      // leagues: this.props.stats.leagues,
      scorers: [],
      results: [],
      // events: [{
      //   title: "Flint League Tourney",
      //   start: new Date('October 26, 2018'),
      //   end: new Date('October 27, 2018 10:24:00'),
      //   eventUser: "DabvcWn4jiSoVonf6sjkeIIEU0p2",
      // },
      // {
      //   title: "Wombats: Practice",
      //   start: new Date('October 17, 2018'),
      //   end: new Date('October 17, 2018 10:24:00'),
      //   eventUser: "DabvcWn4jiSoVonf6sjkeIIEU0p2",
      // },
      // {
      //   title: "Bombs: Team Dinner",
      //   start: new Date('October 29, 2018'),
      //   end: new Date('October 29, 2018 10:24:00'),
      //   eventUser: "OCrRIeH9bATA5Tf4GgCdKrnT5wy2",
      // }],
      user: null,
      currentUser: {
        username: '',
        email: '',
        photoUrl: '',
        userId: '',
        role: ''
      },
      events: [],
      eventsRendered: false
    };
  }

  componentDidMount()  {
    firebase.database().ref('events').on('value',(snapshot) => {
      let events = snapshot.val();
      this.setState({events:events});
      this.setState({eventsRendered: true});
      console.log(this.state.events);
    });
    // const dataBase = firebase.database().ref('data');
    // dataBase.on('value', (snapshot) => {
    //   let stats = snapshot.val();
    //   this.setState({stats:stats});
    // });
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        firebase.database().ref('users').on('value',(snapshot) => {
          let users = snapshot.val();
          users.map((userData, i) => {
            if(userData.userId === this.state.user.uid) {
              this.setState({currentUser: userData});
            }
          });
        });
        // this.setState({
        //   userData: {
        //       username: user.displayName,
        //       email: user.email,
        //       photoUrl: user.photoUrl,
        //       userId: user.uid
        //   }
        // });
      }
    });
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.clickOutside, false);

  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutside, false);
  }

  // setWrapperRef(node) {
  //   this.wrapperRef = node;
  // }

  clickOutside(e) {
    let searchWrapper = document.querySelector(".search__wrapper");
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      $("#search-results").hide();
    }
  }

  // componentWillMount() {
  //   this.removeAuthListener = auth.onAuthStateChanged((user) => {
  //     console.log(user);
  //     if (user) {
  //       this.setState({ user: user });
  //     } else {
  //       this.setState({ user: null });
  //     }
  //   });
  // }
  //
  // componentWillUnmount() {
  //   this.removeAuthListener();
  // }

  searchData(e) {
    if(e.type === "click" || e.type === "keydown" && e.keyCode === 13) {
      e.preventDefault();
      let results = [];
      let leagues = this.props.stats.leagues;
      let toTitleCase = function(str) {
          return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

      function getSearchValue() {
        var searchValue = document.querySelector(".search__input").value;
        searchValue = searchValue.toLowerCase();
        return searchValue;
      }

      let inputVal = getSearchValue();

      leagues.map((league, i) => {
        let leagueIndex = i;
        if (league.name.toLowerCase().indexOf(inputVal) > -1) {
          results.push(
            {
              path: "leagues",
              category: "League",
              name: league.name,
              leagueName: league.name,
              leagueId: leagueIndex
            }
          );
        }

        league.teams.map((team, i) => {
          let teamIndex = i;
          if (team.name.toLowerCase().indexOf(inputVal) > -1) {
            results.push(
              {
                path: "teams",
                category: "Team",
                name: team.name,
                teamName: team.name,
                teamId: teamIndex,
                leagueName: league.name,
                leagueId: leagueIndex
              }
            );
          }

          team.players.map((player, i) => {
            let playerIndex = i;
            if (player.name.toLowerCase().indexOf(inputVal) > -1) {
              results.push(
                {
                  path: "players",
                  category: "Player",
                  name: player.name,
                  playerName: player.name,
                  playerId: playerIndex,
                  teamName: team.name,
                  teamId: teamIndex,
                  leagueName: league.name,
                  leagueId: leagueIndex
                }
              );
            }
          });

        });

      });

      this.setState({
        results: results
      });

      $("#search-results").show();
    }

  }

  onStatChange (stats) {
      // this.setState({
      //   stats: stats
      // });
      // let data = this.state.stats;
      // firebase.database().ref().set({data});
      updateFirebase(stats);
  }


  login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      console.log(user);
      this.setState({user:user});
      firebase.database().ref('users').on('value',(snapshot) => {
        let users = snapshot.val();
        users.map((userData, i) => {
          if(userData.userId === this.state.user.uid) {
            this.setState({currentUser: userData});
          }
        });
      });
      // this.setState({
      //   userData: {
      //       username: user.displayName,
      //       email: user.email,
      //       photoUrl: user.photoUrl,
      //       userId: user.uid
      //   }
      // });
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
  }

  logout(e) {
    // e.preventDefault();
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
      });
  }

  setUsers() {
    let events = [{
      title: "Flint League Tourney",
      start: new Date('October 26, 2018'),
      end: new Date('October 27, 2018 10:24:00'),
      eventUser: "DabvcWn4jiSoVonf6sjkeIIEU0p2",
    },
    {
      title: "Wombats: Practice",
      start: new Date('October 17, 2018'),
      end: new Date('October 17, 2018 10:24:00'),
      eventUser: "DabvcWn4jiSoVonf6sjkeIIEU0p2",
    },
    {
      title: "Bombs: Team Dinner",
      start: new Date('October 29, 2018'),
      end: new Date('October 29, 2018 10:24:00'),
      eventUser: "OCrRIeH9bATA5Tf4GgCdKrnT5wy2",
    }];
    // let users = [
    //   {
    //     firstName: "Henry",
    //     lastName: "Morrow",
    //     userId: "DabvcWn4jiSoVonf6sjkeIIEU0p2",
    //     email: "hj.morrow@hotmail.com",
    //     photoUrl: "",
    //     role: "admin"
    //   },
    //   {
    //     firstName: "Henry",
    //     lastName: "Morrow",
    //     userId: "R81IIAMWKcap951Sj8b6W3JWsJw1",
    //     email: "hjmorrow23@gmail.com",
    //     photoUrl: "",
    //     role: "admin"
    //   },
    //   {
    //     firstName: "Axel",
    //     lastName: "Damon",
    //     userId: "Z5nGJosjlDNCzZCjk0aDzGHPnpw1",
    //     email: "axelthedamon@gmail.com",
    //     photoUrl: "",
    //     role: "leagueAdmin",
    //     userLeagues:[
    //       {
    //         leagueId: "1a1",
    //         leagueName: "Ex Flint Adult Soccer"
    //       }
    //     ],
    //   },
    //   {
    //     firstName: "Alyssa",
    //     lastName: "Morrow",
    //     userId: "OCrRIeH9bATA5Tf4GgCdKrnT5wy2",
    //     email: "ammorrow18@gmail.com",
    //     photoUrl: "",
    //     role: "coach",
    //     userLeagues:[
    //       {
    //         leagueId: "1a2",
    //         leagueName: "Rochester Kids Basketball"
    //       }
    //     ],
    //     userTeams: [
    //       {
    //         teamId: "2b4",
    //         teamName: "Bombs"
    //       }
    //     ]
    //   },
    //   {
    //     firstName: "Guest",
    //     lastName: "Guest",
    //     userId: "TVBV3ifeAZOtZHLhcVXE8ZpIsb52",
    //     email: "guest@gmail.com",
    //     photoUrl: "",
    //     role: "player",
    //     userLeagues:[
    //       {
    //         leagueId: "1a1",
    //         leagueName: "Ex Flint Adult Soccer"
    //       }
    //     ],
    //     userTeams: [
    //       {
    //         teamId: "2b1",
    //         teamName: "Wombats"
    //       }
    //     ]
    //   },
    // ];
    firebase.database().ref('events').set(events);
  }

  addUser(email, username, role, password1, password2) {
    auth.createUserWithEmailAndPassword(email, password2).
    then((result) => {
      // var actionCodeSettings = {
      //   url: 'https://www.example.com/cart?email=user@example.com&cartId=123',
      //   iOS: {
      //     bundleId: 'com.example.ios'
      //   },
      //   android: {
      //     packageName: 'com.example.android',
      //     installApp: true,
      //     minimumVersion: '12'
      //   },
      //   handleCodeInApp: true
      // };
      firebase.auth().currentUser.sendEmailVerification()
        .then(function() {
          console.log("Verification Email Sent")
        })
        .catch(function(error) {
          console.log(error);
        });
      firebase.auth().currentUser.updateProfile({
          displayName: username
        }).then(function(){
          console.log("User successfully created");
        }).catch(function(error) {
          console.log(error);
        });
      const user = result.user;
      this.setState({user});
      this.setState({
        userData: {
            username: user.displayName,
            email: user.email,
            role: role,
            photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
            userId: user.uid
        }
      });
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
  }

  onUpdateUser(currentUser) {
    console.log(currentUser);
    this.setState({currentUser: currentUser});
    firebase.database().ref('users').on('value',(snapshot) => {
      let users = snapshot.val();
      let updatedUsers = [];
      users.map((userData, i) => {
        if(userData.userId === this.state.user.uid) {
          userData.email = currentUser.email;
          userData.firstName = currentUser.firstName;
          userData.lastName = currentUser.lastName;
          userData.photoUrl = currentUser.photoUrl;
          console.log(currentUser.photoUrl);
          console.log(userData.photoUrl);
        }
        updatedUsers.push(userData);
      });
      firebase.database().ref('users').set(updatedUsers);
    });
  }

  setEvents(events) {
    // console.log(events);
    // let finalEvents = [];
    // events.map((event, i) => {
    //   console.log(event.start.getTime());
    // });
    // this.setState({events:events});
    let data = events;
    let newEvents = [];
    data.map((event, i) => {
      event.start = new Date(event.start).getTime();
      event.end = new Date(event.end).getTime();
      newEvents.push(event);
    });
    console.log(newEvents);
    firebase.database().ref('events').set(data);
    this.setState({events:newEvents});
  }

  render() {
    console.log(this.props);
    sessionStorage.setItem('sessionData', JSON.stringify(this.props.stats));
    let cachedData = JSON.parse(sessionStorage.getItem('sessionData'));

    console.log(cachedData);

    return (
      <BrowserRouter>
        <Route render={({location, history, match}) => (
        <div className="App">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
          {this.state.user ?
            <div className="container">
              <Header currentUser={this.state.currentUser} handleLogout={(e) => this.logout(e)}/>
              <section className="content">
                <div className="search__wrapper">
                  <input type="text" className="search__input" onKeyDown={(e) => this.searchData(e)} />
                  <a href="" className="search__submit" onClick={(e) => this.searchData(e) }><span>Search</span></a>
                  <Search stats={this.props.stats} results={this.state.results}/>
                </div>
                  <Route exact path="/" render={ () => <Redirect to="/home" />} />
                  <ReactCSSTransitionGroup
                    component="div"
                    transitionName="slide"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                    <Switch key={location.key} location={location}>
                      <Route path="/home" render={ () => <Dashboard currentUser={this.state.currentUser} stats={this.props.stats} scorers={this.state.scorers} onStatChange={(stats) => this.onStatChange(stats)} handleLogout={(e) => this.logout(e) } />} />
                      <Route path="/leagues" render={ ({match}) => <LeagueDashboard key="/leagues" currentUser={this.state.currentUser} stats={this.props.stats} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/teams" render={ ({match}) => <TeamDashboard currentUser={this.state.currentUser} stats={this.props.stats} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/players" render={ () => <PlayerDashboard currentUser={this.state.currentUser} stats={this.props.stats} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/schedule" render={ ({match}) => <CalendarContainer user={this.state.user} currentUser={this.state.currentUser} user={this.state.user} stats={this.props.stats} events={this.state.events} setEvents={(events) => this.setEvents(events)} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/user/profile" render={ () => <UserProfile currentUser={this.state.currentUser} user={this.state.user} stats={this.props.stats} onUpdateUser={(currentUser) => this.onUpdateUser(currentUser)} />} />
                    </Switch>
                  </ReactCSSTransitionGroup>
                </section>
            </div>
            :
            <div className="container">
              <div className="login__background">
                <Route exact path="/home" render={ () => <Redirect to="/" />} />
                <ReactCSSTransitionGroup
                  component="div"
                  transitionName="slide"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                  transitionAppear={true}
                  transitionAppearTimeout={500}>
                  <Switch key={location.key} location={location}>
                    <Route exact path="/" render={ () => <LoginForm user={this.state.user} handleLogin={(email, password) => this.login(email, password) }/>} />
                    <Route path="/signup" render={() => <SignupForm handleSignup={(email, username, role, password1, password2) => this.addUser(email, username, role, password1, password2) } />} />
                    <Route path="/resetpassword" render={() => <ResetPasswordEmail />} />
                    <Route path="/resetconfirm" render={() => <ResetPasswordConfirm />} />
                  </Switch>
                </ReactCSSTransitionGroup>
              </div>
            </div>
          }

        </div>
      )}/>
      </BrowserRouter>
    );
  }
}

const mapState = state => ({
  stats: state
 })

const mapDispatch = dispatch => {
 dispatch(getStatsThunk())
 watchStatUpdatedEvent(dispatch)
 return {
 }
}
export default connect(mapState, mapDispatch)(App);
// export default App;

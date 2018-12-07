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
import LeagueSetup from './components/login/leaguesetup.js';
import LeagueAdd from './components/login/leagueadd.js';
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
  withRouter,
  NavLink,
  Link
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
            console.log(userData);
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
        this.setState({userData: ""});
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

  getGeneralUserInfo(email, name, username) {
    this.setState({
      userData: {
          username: username,
          email: email,
          name: name,
          role: "league-admin",
          photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
          userId: "",
          userLeagues: [],
          userTeams: []
      }
    });
  }

  addUser(password, creating, stats, leagueName, leagueId, teamName, teamId, leagueIndex, teamIndex) {
    console.log({password, creating, stats, leagueName, leagueId});
    auth.createUserWithEmailAndPassword(this.state.userData.email, password).
    then((result) => {
      firebase.auth().currentUser.sendEmailVerification()
        .then(function() {
          console.log("Verification Email Sent")
        })
        .catch(function(error) {
          console.log(error);
        });
      firebase.auth().currentUser.updateProfile({
          displayName: this.state.userData.username
        }).then(function(){
          console.log("User successfully created");
        }).catch(function(error) {
          console.log(error);
        });
      const user = result.user;
      console.log(user);
      this.setState({user});
      this.setState({
        userData: {
            username: user.displayName,
            email: user.email,
            role: this.state.userData.role,
            photoUrl: "https://res.cloudinary.com/hjmorrow23/image/upload/v1541617700/rostered/profiles/default.jpg",
            userId: user.uid,
            userLeagues: [
              {
                leagueName: leagueName,
                leagueId: leagueId
              }
            ],
            userTeams: [
              {
                teamName: teamName,
                teamId: teamId
              }
            ]
        }
      });
      if(creating) {
        console.log(stats.leagues[stats.leagues.length - 1]);
        stats.leagues[stats.leagues.length - 1].leagueAdmin = {
          id: user.uid,
          email: user.email
        };
        console.log(stats);
        this.onStatChange(stats);
        this.setState({currentUser: this.state.userData});
      } else {
        stats.leagues[leagueIndex].teams[teamIndex].coach = {
          id: user.uid,
          email: user.email
        };
        this.onStatChange(stats);
      }
      firebase.database().ref('users').once('value',(snapshot) => {
        let users = snapshot.val();
        users.push(this.state.userData);
        firebase.database().ref('users').set(users);
      });

    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
  }

  handleSignupLeagueCreation() {

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

  openMobileNav(e) {
    e.preventDefault();
    $('.Mobile-nav').addClass('visible');
  }

  closeMobileNav(e) {
    e.preventDefault();
    $('.Mobile-nav').removeClass('visible');
  }

  hideMobileNav(e) {
    $('.Mobile-nav').removeClass('visible');
  }

  render() {
    console.log(this.props);

    let stats;
    let currentUser;
//     if (this.state.currentUser.email !== '') {
      currentUser = this.state.currentUser;
      sessionStorage.setItem('sessionUser', JSON.stringify(currentUser));
      console.log(currentUser);
/*
    } else {
      currentUser = JSON.parse(sessionStorage.getItem('sessionUser'));
      console.log(currentUser);
    }
*/

    return (
      <BrowserRouter>
        <Route render={({location, history, match}) => (
        <div className="App">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
          {this.state.user ?
            <div className="container">
              <Header currentUser={currentUser} openMobileNav={(e) => this.openMobileNav(e) } handleLogout={(e) => this.logout(e)}/>
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
                      <Route path="/home" render={ () => <Dashboard currentUser={currentUser} stats={this.props.stats} scorers={this.state.scorers} onStatChange={(stats) => this.onStatChange(stats)} handleLogout={(e) => this.logout(e) } />} />
                      <Route path="/leagues" render={ ({match}) => <LeagueDashboard key="/leagues" currentUser={currentUser} stats={this.props.stats} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/teams" render={ ({match}) => <TeamDashboard currentUser={currentUser} stats={this.props.stats} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/players" render={ () => <PlayerDashboard currentUser={currentUser} stats={this.props.stats} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/schedule" render={ ({match}) => <CalendarContainer user={this.state.user} currentUser={currentUser} user={this.state.user} stats={this.props.stats} events={this.state.events} setEvents={(events) => this.setEvents(events)} match={match} onStatChange={(stats) => this.onStatChange(stats)} />} />
                      <Route path="/user/profile" render={ () => <UserProfile currentUser={currentUser} user={this.state.user} stats={this.props.stats} onUpdateUser={(currentUser) => this.onUpdateUser(currentUser)} />} />
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
                    <Route path="/signup" render={({match}) => <SignupForm match={match} handleSignup={(email, name, username) => this.getGeneralUserInfo(email, name, username) } />} />
                    <Route path="/leaguesetup" render={({match}) => <LeagueSetup match={match} />} />
                    <Route path="/leagueadd" render={({match}) => <LeagueAdd match={match} stats={this.props.stats} handleSignup={(password, creating, stats, leagueName, leagueId, teamName, teamId, leagueIndex, teamIndex) => this.addUser(password, creating, stats, leagueName, leagueId, teamName, teamId, leagueIndex, teamIndex) }/>} />
                    <Route path="/resetpassword" render={() => <ResetPasswordEmail />} />
                    <Route path="/resetconfirm" render={() => <ResetPasswordConfirm />} />
                  </Switch>
                </ReactCSSTransitionGroup>
              </div>
            </div>
          }
          <nav className="Mobile-nav">
            <a href="" className="Mobile-nav--close" onClick={(e) => this.closeMobileNav(e) }>
              <i className="fa fa-times"></i>
            </a>
            <ul className="Mobile-nav__list">
              <li className="Mobile-nav__list__item"><NavLink exact to="/home" onClick={(e) => this.hideMobileNav(e) } className="Mobile-nav__list__item__link">Home</NavLink></li>
              <li className="Mobile-nav__list__item"><NavLink exact to="/leagues" onClick={(e) => this.hideMobileNav(e) } className="Mobile-nav__list__item__link">Leagues</NavLink></li>
              <li className="Mobile-nav__list__item"><NavLink exact to="/teams" onClick={(e) => this.hideMobileNav(e) } className="Mobile-nav__list__item__link">Teams</NavLink></li>
              {
                this.state.currentUser.role === "admin" || this.state.currentUser.role === "league-admin" || this.state.currentUser.role === "coach" ?
                  <li className="Mobile-nav__list__item"><NavLink exact to="/players" onClick={(e) => this.hideMobileNav(e) } className="Mobile-nav__list__item__link">Players</NavLink></li>
                : ""
              }
              <li className="Mobile-nav__list__item"><NavLink exact to="/schedule" onClick={(e) => this.hideMobileNav(e) } className="Mobile-nav__list__item__link">Schedule</NavLink></li>
            </ul>
          </nav>
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

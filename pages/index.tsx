import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';

import Bounce from 'react-reveal/Bounce';
import Stepper from "react-reveal/Stepper";

import { updateUser } from '../store/user/user.action';
import { updateAbout } from '../store/about/about.action'

import MovieService from '../services/movie-service';
import { AppLayout } from '../components/layout';

interface IHomeProps {
  shows: any;
  updateUser: any;
}

interface IHomeState {
  step: any;
}

class IndexPage extends React.Component<IHomeProps, IHomeState> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    const step = new Stepper()
      .step('element1', 100)
      .step('element2', 1000)
      .step('element3', 800)
      .step('element4', 600)
      .step('element5', 1500)
      .step('content', 200);

    this.state = { step: step };
  }

  static async getInitialProps() {
    const res = await MovieService.getShows()
    const dataProps = await res.data
    return { shows: dataProps }
  }

  handleClick(e) {
    e.preventDefault()
    const { updateUser } = this.props
    updateUser('Update user...')
    console.log(this.props)

    // Passing setState a Function
    // this.setState({ expanded: !this.state.expanded }) chang to below
    // this.setState(prevState => ({ expanded: !prevState.expanded }))
  }

  render() {
    /*
    * Components with many props should have each prop on a newline
    const { 
      shows, 
      userMessage 
    } = this.props
    */

    const { shows } = this.props

    return (
      <AppLayout>
        <div className="home-page">
          <Bounce bottom cascade>
            <div>
              {
                shows ? shows.map(m => {
                  return (
                    <div
                      className="movies__item"
                      key={m.show.id}>
                      <Link
                        href={`/post/${m.show.id}`}>
                        <a className="movies__link">
                          <h4>{m.show.name}</h4>
                        </a>
                      </Link>
                    </div>
                  )
                })
                  : ''
              }
            </div>
          </Bounce>
        </div>

        <div className="animation">Animation</div>
        {
          // on one condition
          // isTrue
          // ? <p>True!</p>
          // : <none/>

          // or
          // isTrue &&
          // <p>True!</p>
        }
      </AppLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  userMessage: state.user.message, // this.props.userMessage
  aboutName: state.about.name, // this.props.aboutName
})

const mapDispatchToProps = (dispatch) => ({
  updateUser: bindActionCreators(updateUser, dispatch), // this.props.updateUser
  updateAbout: bindActionCreators(updateAbout, dispatch) // this.props.updateAbout
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)

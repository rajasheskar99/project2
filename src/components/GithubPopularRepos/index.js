import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN-PROCESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.getRepoItems()
  }

  getRepoItems = async () => {
    this.setState({apiStatus: constants.inProcess})

    const {activeTab} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()

    if (response.ok === true) {
      const dataRepo = data.popular_repos.map(item => ({
        name: item.name,
        id: item.id,
        avatarUrl: item.avatar_url,
        issuesCount: item.issues_count,
        forksCount: item.forks_count,
        starsCount: item.stars_count,
      }))
      this.setState({repositoryList: dataRepo, apiStatus: constants.success})
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  getActiveTab = tabId => {
    this.setState({activeTab: tabId}, this.getRepoItems)
  }

  renderRepoList = () => {
    const {repositoryList} = this.state
    return (
      <ul className="item-list">
        {repositoryList.map(eachItem => (
          <RepositoryItem repositoryItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="fail-sec">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.renderRepoList()
      case constants.failure:
        return this.renderFailure()
      case constants.inProcess:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {activeTab} = this.state

    return (
      <div className="main-bg">
        <h1 className="title">Popular</h1>
        <ul className="tab-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              filterItem={each}
              activeTab={activeTab}
              key={each.id}
              getActiveTab={this.getActiveTab}
            />
          ))}
        </ul>
        <div>{this.getRender()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos

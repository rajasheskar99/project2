import './index.css'

const RepositoryItem = props => {
  const {repositoryItem} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = repositoryItem

  return (
    <li className="item-card">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="item-head">{name}</h1>

      <div className="disc-sec">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p className="item-desc">{starsCount} stars</p>
      </div>
      <div className="disc-sec">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p className="item-desc">{forksCount} forks</p>
      </div>
      <div className="disc-sec">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="star"
        />
        <p className="item-desc">{issuesCount} forks</p>
      </div>
    </li>
  )
}

export default RepositoryItem

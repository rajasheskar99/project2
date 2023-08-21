import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, activeTab, getActiveTab} = props
  const {id, language} = filterItem
  const isActive = activeTab === id
  const active = isActive ? 'active-tab-item' : 'tab-item'
  const getId = () => {
    getActiveTab(id)
  }
  return (
    <li>
      <button className={active} type="button" onClick={getId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

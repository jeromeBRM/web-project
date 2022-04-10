import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="app__header">
      <ul className="app__header__column">
        <div className="app__header__top">
          <li><div className="app__header__top__home--icon" /><Link to="todo" className="app__header__link"><h1 className="app__header__link">{ props.userCredentials.email }</h1></Link></li>
          <div className="app__header__p"><div className="app__header_label--dashed">Mes listes</div><div className="app__header__dash" /></div>
          <div className="app__header__link__list">
            { props.lists.map(list => {
              return <li key={ "list-"+list.id }><Link to={ "todo/"+list.id } className="app__header__link1 li__list">{ list.description }</Link></li>
            })}
            <li><button onClick={ () => props.addNewList() } className="app__header__top__createlist--icon" /><input type="text" name="new-list-name" id ="new-list-name" placeholder="Nouvelle liste" defaultValue="" className="app__header__top__newlist--input" onChange={ (e) => props.setNewListName(e.target.value) } /></li>
          </div>
        </div>
        <div className="app__header__footer">
          <li><div className="app__header__footer__settings--icon" /><Link to="settings" className="app__header__link2">Paramètres</Link></li>
          <li><div className="app__header__footer__disconnect--icon" /><Link to="../signin" onClick={ () => { props.logoutCallback() } } className="app__header__link2">Déconnexion</Link></li>
        </div>
      </ul>
    </div>
  );
}

export default Header;
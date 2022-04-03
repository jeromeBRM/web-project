import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="app__header">
      <ul>
        <li><Link to="todo" className="app__header__link"><h1>{ props.userCredentials.email }</h1></Link></li>
        { props.lists.map(list => {
          return <li key={ "list-"+list.id }><Link to={ "todo/"+list.id }>{ list.description }</Link></li>
        })}
        <li><button onClick={ () => props.addNewList() }>Créer liste</button><input type="text" name="new-list-name" id ="new-list-name" defaultValue="Nouvelle liste" onChange={ (e) => props.setNewListName(e.target.value) } /></li>
        <li><Link to="settings" className="app__header__link">Paramètres</Link></li>
        <li><Link to="../signin" onClick={ () => { props.logoutCallback() } } className="app__header__link">Déconnexion</Link></li>
      </ul>
    </div>
  );
}

export default Header;
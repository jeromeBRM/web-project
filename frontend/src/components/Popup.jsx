function Popup(props) {
    return (
        <div className="app__popup">
            <div className="app__popup__wrapper">
                <h2 className="no-margin app__popup__title">Supprimer la liste ?</h2>
                <p className="no-margin app__popup__message">
                    Après avoir été supprimée, une liste ne peut pas être récupérée. Êtes-vous certain(e) de vouloir supprimer la liste “{ props.title }” ?
                </p>
                <div className="app__popup__controls">
                    <button onClick={ () => { props.deleteForever(); } } className="app__popup__controls--delete"><div className="app__popup__controls--delete--icon"/>Supprimer la liste</button>
                    <button onClick={ () => { props.cancel(); } } className="app__popup__controls--cancel"><div className="app__popup__controls--cancel--icon" />Annuler</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
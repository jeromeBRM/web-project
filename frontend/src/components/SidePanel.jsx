import Input from "./Input";

function SidePanel() {
    return (
        <div className="app__sidepanel">
        <label for="start">Echéance</label>
        <input type="date" id="start" name="trip-start" min="2022-01-01" max="2050-12-31"></input>
      </div>
    );
}

export default SidePanel;
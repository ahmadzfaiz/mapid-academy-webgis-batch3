export class LocationButtonControl {
    constructor(id, buttonClass) {
        this._id = id;
        this._buttonClass = buttonClass
    };

    onAdd(map) {
        this._container = document.createElement("div");
        this._container.className = "maplibregl-ctrl";
        this._container.innerHTML = `
            <button 
                id="${this._id}"
                type="button" 
                class="btn ${this._buttonClass}"
            >📍</button>
        `;

        return this._container;
    };

    onRemove() {
        this._container.parentNode.removeChild(this._container);
    };
};
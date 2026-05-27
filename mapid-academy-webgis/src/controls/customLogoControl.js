import jakartaLogoUrl from "../assets/logo-dki.png"

export class JakartaLogoControl {
    onAdd(map) {
        this._container = document.createElement("div");
        this._container.className = "maplibregl-ctrl";
        this._container.innerHTML = `
            <img
                src="${jakartaLogoUrl}"
                alt="Logo DKI Jakarta"
                style="width: 50px"
            >`;

        return this._container;
    };

    onRemove() {
        this._container.parentNode.removeChild(this._container);
    };
};
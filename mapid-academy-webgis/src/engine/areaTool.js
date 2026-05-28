export function createAreaTool() {
    const container = document.createElement("div");
    container.className = "card m-3";
    container.style.width = "12rem";
    container.innerHTML = `
        <div class="card-body">
            <h5 class="luas">Hitung luas</h5>
            <div class="form-group">
                <label for="polygon1">Polygon</label>
                <input class="form-control" id="polygon1" placeholder="Geometri polygon">
                <button type="submit" class="btn btn-secondary">Hitung</button>
                <p id="hasil-luas"></p>
            </div>
        </div>
    `;
    return container;
}



export function addSpongebobImage(map){

    map.addSource("spongebob", {
      type: "image",
      url: "https://static.wikia.nocookie.net/cartoons/images/e/ed/Profile_-_SpongeBob_SquarePants.png",
      coordinates: [
        [79.16, -0.40], // top-left
        [94.18, -1.66], // top-right
        [94.65, -14.73], // bottom-right
        [72.97, -13.74] // bottom-left
      ]
    }) 
  
    map.addLayer({
      id: "spongebob-image",
      type: "raster",
      source: "spongebob",
    })
}
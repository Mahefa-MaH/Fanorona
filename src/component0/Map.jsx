import Piece from "./Piece";

var Map = {
    tiles: [
        "images/dirtHigh.png", 		// 0
        "images/grass.png",			// 1
        "images/water.png",			// 2
        "images/waterBeachCornerEast.png",	// 3
        "images/waterBeachCornerNorth.png",	// 4
        "images/waterBeachCornerSouth.png",	// 5
        "images/roadTWest.png"		// 6
    ],
    
    map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 1, 2, 0, 1, 2, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],

    mapPObj:[]
}

export default Map;
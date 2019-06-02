let randomColor = () => {
	let string = "#"
    let validArray = ['a','b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    for(let i = 0; i < 6; i++){
        string += validArray[Math.floor(Math.random() * validArray.length)]
    }

	return string
}

export { randomColor }
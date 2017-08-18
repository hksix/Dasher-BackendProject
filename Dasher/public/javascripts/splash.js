var granimInstance = new Granim({
    element: '#canvas-image',
    direction: 'top-bottom',
    opacity: [1, .5, 0],
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#485563', '#29323c', '#29323c'],
                ['#004d4d', '#003333', '#003333']
            ],
            transitionSpeed: 7000
            
        }
    }
});
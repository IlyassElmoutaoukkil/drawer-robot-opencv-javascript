serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = serial.readString()
    let dataLetter = data.substr(0,1)
    if (dataLetter == "S") {
        movments = []
        basic.showLeds(`
            . . # . .
            . . # # .
            . . # # #
            . . # # .
            . . # . .
            `)
        startRecievingStatus = "StartSaving"
        // music.playMelody("C C - - - - - - ", 999)
    } else if (dataLetter == "E") {
        basic.showNumber(movments.length)
        startRecievingStatus = "END"
        // music.playMelody("C5 C5 - - - - - - ", 999)
    } else {
        // music.playMelody("- - - - F F F F ", 999)
        dataSplit = data.split("|")
        if(dataSplit.length==3){
            movments.push([parseFloat(dataSplit[0]), parseFloat(dataSplit[1]), parseFloat(dataSplit[2])])
        }else{
            movments.push([dataSplit[0]])
        }
    }
})
let dataSplit: string[] = []
let startRecievingStatus2 = ""
let data2: number[] = []
let movments: any[][] = []
let index: number = 0
let data = ""
let penIsDown = false
let startRecievingStatus = ""
serial.redirectToUSB()
let startRecievingStatus3 = "initial"
function controllPen(move: any) {
    if (move == 'open') {
        return SuperBit.Servo(SuperBit.enServo.S1, 20)
        penIsDown = true
    }
    penIsDown = false
    return SuperBit.Servo(SuperBit.enServo.S1, 80)
}
basic.forever(function () {
if (movments.length > 0 && startRecievingStatus == "END") {
        if(index==0){
            basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
            pause(5000)
        }
    
        if (index < movments.length) {
            if (movments[index].length!=3){
                let upOrDown : string = movments[index][0]
                let upOrDown_FL : string = upOrDown.substr(0, 1)
                if (upOrDown_FL=='U'){
                    controllPen('open')
                    basic.showLeds(`
                    . . # . .
                    . . # . .
                    # # # # #
                    . # # # .
                    . . # . .
                    `)
                }else{
                    controllPen('close')
                    basic.showLeds(`
                    . . # . .
                    . # # # .
                    # # # # #
                    . . # . .
                    . . # . .
                    `)
                    pause(1000)
                }

                index += 1
            }else{
                SuperBit.MotorRunDual(
                SuperBit.enMotors.M2,
                movments[index][0],
                SuperBit.enMotors.M4,
                movments[index][1]
                )

                pause(movments[index][2])
                
                SuperBit.MotorRunDual(
                SuperBit.enMotors.M2,
                0,
                SuperBit.enMotors.M4,
                0
                )
                pause(500)
                index += 1
            }
        } else {
            index = 0
            startRecievingStatus = "Start"
            music.playMelody("A - A - A - A - ", 500)
        }
    }
})


input.onButtonPressed(Button.A, function() {
    startRecievingStatus = "END"
})

input.onButtonPressed(Button.B, function() {
    controllPen('')
})
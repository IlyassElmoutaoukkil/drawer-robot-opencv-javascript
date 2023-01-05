serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = serial.readString()
    let dataLetter = data.substr(0,1)
    if (dataLetter == "S") {
        basic.showLeds(`
            . . # . .
            . . # # .
            . . # # #
            . . # # .
            . . # . .
            `)
        startRecievingStatus = "StartSaving"
        console.log('Start saving...')
music.playMelody("C C - - - - - - ", 999)
    } else if (dataLetter == "E") {
        basic.showLeds(`
            # # . # #
            # # . # #
            # # . # #
            # # . # #
            # # . # #
            `)
        startRecievingStatus = "END"
        console.log('End saving...')
music.playMelody("C5 C5 - - - - - - ", 999)
    } else {
        music.playMelody("- - - - F F F F ", 999)
        console.log(data + ' saved.')
dataSplit = data.split("|")
        movments.push([parseFloat(dataSplit[0]), parseFloat(dataSplit[1]), parseFloat(dataSplit[2])])
    }
})
let dataSplit: string[] = []
let startRecievingStatus2 = ""
let data2: number[] = []
let movments: any[][] = []
let index: number = 0
let data = ""
let startRecievingStatus = ""
serial.redirectToUSB()
let startRecievingStatus3 = "initial"
function controllPen(move: any) {
    if (move == 'open') {
        return SuperBit.Servo(SuperBit.enServo.S1, 38)
    }
    return SuperBit.Servo(SuperBit.enServo.S1, 50)
}
controllPen('close')
controllPen('open')
basic.forever(function () {
if (movments.length > 0 && startRecievingStatus == "END") {
        if(index==0){
            pause(5000)
            basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        }
    

        if (index < movments.length) {
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
            index += 1
        } else {
            index += 0
            movments = []
            music.playMelody("A - A - A - A - ", 500)
        }
    }
})

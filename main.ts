let index:number = 0
let movments = [[60, 58, 2000]]
function controllPen(move: any) {
    if (move == 'open') {
        return SuperBit.Servo(SuperBit.enServo.S1, 38)
    }
    return SuperBit.Servo(SuperBit.enServo.S1, 50)
}
radio.onReceivedString(function(receivedString: string) {
    let data:any[] = receivedString.split('|')
    movments.push([parseFloat(data[0]), parseFloat(data[1]),parseFloat(data[2])])
})

controllPen('close')
controllPen('open')
radio.setGroup(1)
basic.forever(function () {
    if (movments.length > 0) {
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
            console.log(movments[index])
index += 1
        } else {
            index += 0
            movments = []
            music.playMelody("A - A - A - A - ", 500)
        }
    }
})

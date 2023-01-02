function controllPen(move:any){
    if(move == 'open'){
        return SuperBit.Servo(SuperBit.enServo.S1, 38)
    }
    return SuperBit.Servo(SuperBit.enServo.S1, 50)
}
controllPen('close')
controllPen('open')
SuperBit.MotorRunDual(
SuperBit.enMotors.M2,
-50,
SuperBit.enMotors.M4,
-25
)
basic.pause(20000)

controllPen('close')
SuperBit.MotorRunDual(
    SuperBit.enMotors.M2,
    0,
    SuperBit.enMotors.M4,
    0
)

basic.forever(function () {
})

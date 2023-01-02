function controllPen(move:any){
    if(move == 'open'){
        return SuperBit.Servo(SuperBit.enServo.S1, 30)
    }

    return SuperBit.Servo(SuperBit.enServo.S1, 50)
}
controllPen('close')
controllPen('open')
SuperBit.MotorRunDual(
SuperBit.enMotors.M2,
-50,
SuperBit.enMotors.M4,
-50
)
basic.pause(2000)
SuperBit.MotorRunDual(
    SuperBit.enMotors.M2,
    0,
    SuperBit.enMotors.M4,
    -50
)
basic.pause(2000)
controllPen('close')
basic.forever(function () {
	
})

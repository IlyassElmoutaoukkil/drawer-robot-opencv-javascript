import math
import serial
import numpy
import time


path = [[0,0],[1,3],[1,1],[10,1],[40,104],[59,79]]
validData = []
i=0
speed = 10  # 10cm/1s m1=100 m2=102
angleSpeed = 0.119 # 90degrees in 753ms

# print(math.pow(math.cos(0.23),-1))
# print(math.acos(0.23))


def MesureDistance(a,b):
    return math.dist(a,b)

for p in path:
    if(i!=0):
        distance = MesureDistance(path[i],path[i-1])
        # here we clculate the duration the motors should work
        duration = distance/speed
        t_G=math.floor(duration) # <- t is here
        Go_move = {'m1':100,'m2':100,'t':t_G}
        validData.append(Go_move)

        # here we clculate the angle the motors should work
        if((i+1)<=(len(path)-1)):
            c_distance = MesureDistance(path[i-1],path[i+1])
            a_distance = distance
            b_distance = MesureDistance(path[i],path[i+1])

            #here is the angle
            base = 2*a_distance*b_distance

            top = int(math.pow(a_distance,2)) + int(math.pow(b_distance,2)) - int(math.pow(c_distance,2))

            angle = top/base

            angle = math.degrees(numpy.arccos(angle))

            t_T = angle/angleSpeed
            Turn_move = {'m1':100,'m2':-102,'t':t_T}
            validData.append(Turn_move)
            print('a_distance: ',a_distance)
            print('b_distance: ',b_distance)
            print('c_distance: ',c_distance)
            print('angle: ',t_T)



            '''
                now convert the angle to be a conbenition of two numbers, m1,m2 speed
                m1 m2 will fixed the only change will be the t (time of turn)
            '''
        
    i= i+1


# here we get the valid data and send it command by command,


ser = serial.Serial(
    port='COM25',
    baudrate=115200)
ser.close()
ser.open()


out = 'STARTofData' + "\n"
out2 = out.encode('utf_8')
ser.write(out2)

for data in validData:
    out = str(data['m1'])+'|'+str(data['m2'])+'|'+str(data['t']) + "\n"
    # print(out)
    out2 = out.encode('utf_8')
    ser.write(out2)
    time.sleep(1)

out = 'ENDofData' + "\n"
out2 = out.encode('utf_8')
ser.write(out2)
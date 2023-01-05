import math

path = [[0,0],[87,23],[49,17],[80,25],[100,90]]
validData = []
i=0
speed = 10  # 10cm/1s m1=100 m2=102
angleSpeed = 0.119 # 90degrees in 753ms



def MesureDistance(a,b):
    return math.dist(a,b)

for p in path:
    if(i!=0):
        distance = MesureDistance(p,path[i-1])
        # here we clculate the duration the motors should work
        duration = distance/speed
        t_G=math.floor(duration) # <- t is here
        Go_move = {'m1':100,'m2':102,'t':t_G}
        validData.append(Go_move)

        # here we clculate the angle the motors should work
        if((i+1)<=(len(path)-1)):
            c_distance = MesureDistance(path[i-1],path[i+1])
            a_distance = distance
            b_distance = MesureDistance(path[i],path[i+1])

            #here is the angle
            angle = math.acos((math.pow(a_distance,2) + math.pow(b_distance,2) - math.pow(c_distance,2))/(2*a_distance*b_distance))
            t_T = angle/angleSpeed
            Turn_move = {'m1':100,'m2':-102,'t':t_T}
            validData.append(Turn_move)

            '''
                now convert the angle to be a conbenition of two numbers, m1,m2 speed
                m1 m2 will fixed the only change will be the t (time of turn)
            '''
        
    i= i+1



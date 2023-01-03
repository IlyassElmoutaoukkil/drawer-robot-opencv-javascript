# import the opencv library
import cv2
import numpy as np
  
  
# define a video capture object
vid = cv2.VideoCapture(0)
PointsArray = []
def print_coord(event,x,y,flags,param):
    if event == cv2.EVENT_MOUSEMOVE:
        print(f'{x, y}\r', end="")
    elif event == cv2.EVENT_LBUTTONUP:
        PointsArray.append([x,y])



  
while(True):
      
    # Capture the video frame
    # by frame
    ret, frame = vid.read()
  
    # Display the resulting frame
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    lower = np.array([0, 0, 0], dtype="uint8")
    upper = np.array([200, 200, 200], dtype="uint8")
    mask = cv2.inRange(frame, lower, upper)

    circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, 1.2, 100)
    pts = np.array(PointsArray, np.int32)
    pts = pts.reshape((-1,1,2))
    cv2.polylines(frame,[pts],True,(255,255,255))
    # ensure at least some circles were found
    if circles is not None:
        # convert the (x, y) coordinates and radius of the circles to integers
        circles = np.round(circles[0]).astype("int")
        # loop over the (x, y) coordinates and radius of the circles
        for (x, y, r) in circles:
            # draw the circle in the output image, then draw a rectangle
            # corresponding to the center of the circle
            cv2.circle(frame, (x, y), r, (0, 255, 0), 4)
            cv2.rectangle(frame, (x - 5, y - 5), (x + 5, y + 5), (0, 128, 255), -1)


    cv2.imshow('frame', frame)
    cv2.setMouseCallback('frame',print_coord)

    # the 'q' button is set as the
    # quitting button you may use any
    # desired button of your choice
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
  
# After the loop release the cap object
vid.release()
# Destroy all the windows
cv2.destroyAllWindows()
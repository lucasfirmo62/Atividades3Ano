from OpenGL.GL import *
from OpenGL.GLU import *
import pygame
from pygame.locals import *

def main():
    pygame.init()
    display = (800, 600)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
    gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)

    # Posiciona o cubo mais longe
    glTranslatef(-1.0, -1.0, -10)

    # ROTACIONA o cubo (aqui: 30 graus no eixo X e 45 no eixo Y)
    glRotatef(30, 1, 0, 0)  # inclina para cima
    glRotatef(45, 0, 1, 0)  # gira de lado

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return

        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        draw_wireframe_cube()
        pygame.display.flip()
        pygame.time.wait(10)

vertices = [
    (2, 0, 0),  # 0
    (2, 2, 0),  # 1
    (0, 2, 0),  # 2
    (0, 0, 0),  # 3
    (2, 0, 2),  # 4
    (2, 2, 2),  # 5
    (0, 0, 2),  # 6
    (0, 2, 2)   # 7
]

edges = [
    (0, 1), (1, 2), (2, 3), (3, 0),
    (4, 5), (5, 7), (7, 6), (6, 4),
    (0, 4), (1, 5), (2, 7), (3, 6)
]

def draw_wireframe_cube():
    glColor3f(1, 1, 1)
    glBegin(GL_LINES)
    for edge in edges:
        for vertex in edge:
            glVertex3fv(vertices[vertex])
    glEnd()

main()

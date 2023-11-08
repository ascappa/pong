"use client";
import kaboom from "kaboom";
import { useEffect, useRef, useState } from "react";

export function Pong() {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0)
  useEffect(() => {
    const {
      easings,
      area,
      body,
      tween,
      add,
      rect,
      pos,
      color,
      onKeyDown,
      onClick,
      circle,
      onUpdate,
      width,
      height,
      mousePos,
      onTouchMove,
      dt,
      onMouseMove,
      loadJSON,
      sprite,
      loadSprite,
      scale
    } = kaboom({
      canvas: canvasRef.current!,
      background: [0, 0, 255],
      width: 700,
      height: 500,
      global: true,
    });
    const playerBar = add([
      rect(100, 10, { radius: 3 }),
      pos(40, height() - 30),
      color(0, 255, 0),
      area(),
      "playerBar"
    ]);
    const opponentBar = add([
      rect(100, 10, { radius: 3 }),
      pos(50, 20),
      color(0, 255, 0),
    ]);
    loadSprite("infinityTrain", "/sprite.png")
    add([sprite("infinityTrain"), pos(50, 50), scale(0.1)])
    const ball = add([circle(10), pos(145, 295), color(255, 255, 255), area()]);
    let ballXDirection = -1;
    let ballYDirection = 1;
    const ballSpeed = 250
    onKeyDown("right", () => {
      playerBar.moveBy(2, 0);
    });
    onKeyDown("left", () => {
      playerBar.moveBy(-2, 0);
    });
    
    onUpdate(() => {  
      ball.moveBy(ballXDirection * ballSpeed * dt(), ballYDirection * ballSpeed * dt());
      if (
        ball.pos.x - ball.radius <= 0 ||
        ball.pos.x + ball.radius >= width()
      ) {
        ballXDirection *= -1;
      }
      if (
        ball.pos.y - ball.radius <= 0 ||
        ball.pos.y + ball.radius >= height()
      ) {
        ballYDirection *= -1;
      }
    });
    onClick(() => {
      const { x } = mousePos();
      tween(
        playerBar.pos.x,
        x - 50,
        0.3,
        (p) => (playerBar.pos.x = p),
        easings.easeOutSine,
      );
    });
    onTouchMove(() => {
      const { x } = mousePos();
      tween(
        playerBar.pos.x,
        x - 50,
        0.1,
        (p) => (playerBar.pos.x = p),
        easings.easeOutSine,
      );
    })
    ball.onCollide(() => {
      ballYDirection *= -1
    })
    onMouseMove(() => {
      playerBar.moveTo(mousePos().x - playerBar.width / 2, playerBar.pos.y)
    })
  }, []);
  return <><div onClick={() => setCount(count + 1)}>{count}</div><canvas ref={canvasRef}></canvas></>;
}

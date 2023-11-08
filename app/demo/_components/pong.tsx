"use client";
import kaboom from "kaboom";
import { useEffect, useRef, useState } from "react";

export function Pong() {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0)
  useEffect(() => {
    const k = kaboom({
      canvas: canvasRef.current!,
      background: [0, 0, 255],
      width: 500,
      height: 700,
      stretch: true,
      global: true,
    });
    const playerBar = k.add([
      k.rect(100, 10, { radius: 3 }),
      k.pos(40, k.height() - 30),
      k.color(0, 255, 0),
      k.area(),
      "playerBar"
    ]);
    console.log(k.height())
    const opponentBar = k.add([
      k.rect(100, 10, { radius: 3 }),
      k.pos(50, 20),
      k.color(0, 255, 0),
      k.area()
    ]);
    k.loadSprite("infinityTrain", "/sprite.png")
    k.add([k.sprite("infinityTrain"), k.pos(50, 50), k.scale(0.1)])
    const ball = k.add([k.circle(10), k.pos(145, 295), k.color(255, 255, 255), k.area()]);
    let ballXDirection = -1;
    let ballYDirection = 1;
    const ballSpeed = 250
    k.onKeyDown("right", () => {
      playerBar.moveBy(2, 0);
    });
    k.onKeyDown("left", () => {
      playerBar.moveBy(-2, 0);
    });
    
    k.onUpdate(() => {  
      ball.moveBy(ballXDirection * ballSpeed * k.dt(), ballYDirection * ballSpeed * k.dt());
      if (
        ball.pos.x - ball.radius <= 0 ||
        ball.pos.x + ball.radius >= k.width()
      ) {
        ballXDirection *= -1;
      }
      if (
        ball.pos.y - ball.radius <= 0 ||
        ball.pos.y + ball.radius >= k.height()
      ) {
        ballYDirection *= -1;
      }
    });
    k.onClick(() => {
      const { x } = k.mousePos();
      k.tween(
        playerBar.pos.x,
        x - 50,
        0.3,
        (p) => (playerBar.pos.x = p),
        k.easings.easeOutSine,
      );
    });
    k.onTouchMove(() => {
      const { x } = k.mousePos();
      k.tween(
        playerBar.pos.x,
        x - 50,
        0.1,
        (p) => (playerBar.pos.x = p),
        k.easings.easeOutSine,
      );
    })
    ball.onCollide(() => {
      ballYDirection *= -1
    })
    k.onMouseMove(() => {
      playerBar.moveTo(k.mousePos().x - playerBar.width / 2, playerBar.pos.y)
    })
  }, []);
  return <><div onClick={() => setCount(count + 1)}>{count}</div><div><canvas ref={canvasRef}></canvas></div></>;
}

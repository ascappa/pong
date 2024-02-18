"use client";
import kaboom from "kaboom";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";

export function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    startGame(canvasRef);
  }, []);
  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
async function startGame(canvasRef: RefObject<HTMLCanvasElement>) {
  kaboom({
    canvas: canvasRef.current!,
    background: [0, 0, 0],
    width: window.innerWidth < 700 ? window.innerWidth : 700,
    height: window.innerHeight < 500 ? window.innerHeight : 500,
    global: true,
  });

  const font = "Rajdhani"
  loadFont(font, "/Rajdhani-Regular.ttf")
  
  // const counter = add([text("3"), pos(center()), {value: 3, font:"__Rajdhani_78e6cd" }])
  // await wait(1)
  // const loopId = loop(1, () => {
  //   counter.value -= 1
  //   counter.text = counter.value.toString()
  // })
  // await wait(1.9)
  // loopId.cancel()
  // counter.destroy()
  const playerBar = add([
    rect(100, 10, { radius: 3 }),
    pos(40, height() - 30),
    color(255, 255, 255),
    area(),
    "playerBar",
  ]);
  const opponentBar = add([
    rect(100, 10, { radius: 3 }),
    pos(50, 20),
    color(255, 255, 255),
    area(),
  ]);
  let ball = add([circle(10), pos(center()), color(255, 255, 255), area()]);
  let ballXDirection = -1;
  let ballYDirection = 1;
  const ballSpeed = 220;

  onKeyDown("right", () => {
    playerBar.moveBy(4.5, 0);
  });

  onKeyDown("left", () => {
    playerBar.moveBy(-4.5, 0);
  });

  const playerScore = add([
    text("0"),
    pos(20, center().y),
    { value: 0, font },
  ]);
  const opponentScore = add([
    text("0"),
    pos(width() - 20, center().y),
    anchor("topright"),
    { value: 0, font },
  ]);

  onUpdate(() => {
    ball.moveBy(
      ballXDirection * ballSpeed * dt(),
      ballYDirection * ballSpeed * 1.5 * dt()
    );
    if (ball.pos.x - ball.radius <= 0 ||
      ball.pos.x + ball.radius >= width()) {
      ballXDirection *= -1;
    }
    if (ball.pos.y - ball.radius <= 0 ||
      ball.pos.y + ball.radius >= height()) {
      ballYDirection *= -1;
    }
  })


  onUpdate(async () => {
    if (ball.pos.y < height() * (2 / 3) && ball.exists()) {
      opponentBar.moveTo(
        ball.pos.x - opponentBar.width / 2,
        opponentBar.pos.y,
        width() / 3 + 50
      );
    }

    if (ball.pos.y > playerBar.pos.y + 5 && ball.exists()) {
      console.log(ball.pos);
      ball.destroy();
      opponentScore.value += 1;
      opponentScore.text = opponentScore.value.toString();
      const countdown = add([
        text("3"),
        pos(center()),
        { value: 3, font },
      ]);
      await wait(1);
      const loopId = loop(1, () => {
        countdown.value -= 1;
        countdown.text = `${countdown.value}`;
      });
      await wait(1.9);
      countdown.destroy();
      loopId.cancel();
      ball.moveTo(center());
      add(ball);
    }

    if (ball.pos.y < opponentBar.pos.y + 5 && ball.exists()) {
      console.log(ball.pos);
      ball.destroy();
      playerScore.value += 1;
      playerScore.text = `${playerScore.value}`;
      const countdown = add([
        text("3"),
        pos(center()),
        { value: 3, font },
      ]);
      await wait(1);
      const loopId = loop(1, () => {
        countdown.value -= 1;
        countdown.text = `${countdown.value}`;
      });
      await wait(1.9);
      countdown.destroy();
      loopId.cancel();
      ball.moveTo(center());
      add(ball);
    }
  });

  onClick(() => {
    const { x } = mousePos();
    tween(
      playerBar.pos.x,
      x - 50,
      0.3,
      (p) => (playerBar.pos.x = p),
      easings.easeOutSine
    );
  });

  onTouchMove(() => {
    const { x } = mousePos();
    tween(
      playerBar.pos.x,
      x - 50,
      0.1,
      (p) => (playerBar.pos.x = p),
      easings.easeOutSine
    );
  });
  ball.onCollide(() => {
    ballYDirection *= -1;
  });
  onMouseMove(() => {
    playerBar.pos.x = mousePos().x - playerBar.width / 2;
  });
}


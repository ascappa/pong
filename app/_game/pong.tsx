"use client";
import kaboom from "kaboom";
import { useEffect, useRef, useState } from "react";
import { insertCoin } from "playroomkit";

export function Pong({ roomId }: { roomId: string }) {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function startGame() {
      await  insertCoin({ skipLobby: true, roomCode: roomId });
      kaboom({
        canvas: canvasRef.current!,
        background: [0, 0, 255],
        width: window.innerWidth < 700 ? window.innerWidth : 700,
        height: window.innerHeight < 500 ? window.innerHeight : 500,
        global: true,
      });
      const playerBar = add([
        rect(100, 10, { radius: 3 }),
        pos(40, height() - 30),
        color(0, 255, 0),
        area(),
        "playerBar",
      ]);
      const opponentBar = add([
        rect(100, 10, { radius: 3 }),
        pos(50, 20),
        color(0, 255, 0),
        area(),
      ]);
      let ball = add([circle(10), pos(center()), color(255, 255, 255), area()]);
      let ballXDirection = -1;
      let ballYDirection = 1;
      const ballSpeed = 270;
      onKeyDown("right", () => {
        playerBar.moveBy(2, 0);
      });
      onKeyDown("left", () => {
        playerBar.moveBy(-2, 0);
      });

      const playerScore = add([text("0"), pos(20, center().y), { value: 0 }]);
      const opponentScore = add([
        text("0"),
        pos(width() - 20, center().y),
        anchor("topright"),
        { value: 0 },
      ]);

      onUpdate(() => {
        ball.moveBy(
          ballXDirection * ballSpeed * dt(),
          ballYDirection * ballSpeed * dt(),
        );
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
      onUpdate(async () => {
        if (ball.pos.y < (height() * 2) / 3 && ball.exists()) {
          opponentBar.moveTo(
            ball.pos.x - opponentBar.width / 2,
            opponentBar.pos.y,
            width() / 2 + 50,
          );
        }
        if (ball.pos.y > playerBar.pos.y + 5 && ball.exists()) {
          ball.destroy();
          opponentScore.value += 1;
          opponentScore.text = opponentScore.value.toString();
          const countdown = add([text("3"), pos(center()), { value: 3 }]);
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
          ball.destroy();
          playerScore.value += 1;
          playerScore.text = `${playerScore.value}`;
          const countdown = add([text("3"), pos(center()), { value: 3 }]);
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
      });
      ball.onCollide(() => {
        ballYDirection *= -1;
      });
      onMouseMove(() => {
        playerBar.pos.x = mousePos().x - playerBar.width / 2;
      });
    }
  }, []);
  return (
    <>
      <div onClick={() => setCount(count + 1)}>{count}</div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

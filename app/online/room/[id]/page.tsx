"use client"
import { useEffect } from "react";
import { RoomMenu } from "./_components/room-menu";
import { insertCoin, onPlayerJoin, useIsHost } from "playroomkit";

export default function Room({ params }: { params: { id: string } }) {
  const isHost = useIsHost()
  useEffect(() => {
    insertCoin({skipLobby: true, roomCode: params.id}).then(() => {
      onPlayerJoin((player) => {
        console.log(player.id)
      })
    })
  })
  return <>{isHost ? <RoomMenu roomId={params.id} /> : <p>you're not the host!</p>}</>;
}
